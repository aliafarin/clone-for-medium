import history from "../history";
import JsonApi from "../JsonApi";

export const signIn = (userProfile) => {
  const userId = userProfile.getId();
  const userName = userProfile.getName();
  const userImage = userProfile.getImageUrl();
  return {
    type: "SIGN_IN",
    payload: { userId, userName, userImage }
  }

}

export const signOut = () => {

  return {
    type: "SIGN_OUT"
  }
  
}

export const createArticle = (article, publishedAt) => {
  
  return async function(dispatch, getState) {
    let { userId, userName, userImage } = getState().auth;
    let response = await JsonApi.post("/articles", { 
       authorId: userId,
       authorName: userName,
       authorImage: userImage,
       publishedAt: publishedAt,
       ...article }); 

    dispatch({
      type: "CREATE_ARTICLE",
      payload: response.data
    });
    history.push("/articles");
  }

}

export const listArticles = () => {
  return async(dispatch) => {
    let response = await JsonApi.get("/articles");

    dispatch({
      type: "LIST_ARTICLES",
      payload: response.data
    });
  }

}

export const fetchArticle = (articleId) => {
  return async(dispatch) => {
    let response = await JsonApi.get(`/articles/${articleId}`);

    dispatch({
      type: "FETCH_ARTICLE",
      payload: response.data
    });
  }
}

export const updateArticle = (articleId, formValues) => {
  return async(dispatch) => {
    let response = await JsonApi.put(`/articles/${articleId}`, formValues);

    dispatch({
      type: "UPDATE_ARTICLE",
      payload: response.data
    });

    history.push(`/articles/${articleId}`);
  }
}

export const deleteArticle = (articleId) => {
  return async(dispatch) => {
    await JsonApi.delete(`/articles/${articleId}`);

    dispatch({
      type: "DELETE_ARTICLE",
      payload: articleId
    });

    history.push("/articles");
  }
}