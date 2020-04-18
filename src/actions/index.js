import history from "../history";

import JsonApi from "../JsonApi";
import { formValues } from "redux-form";

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

export const createArticle = (article) => {
  
  //not sure this is the place for it
  let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  let date = new Date();
  let year = date.getFullYear();
  let month = monthNames[date.getMonth()];
  let day = date.getDate();
  
  return async function(dispatch, getState) {
    let { userId, userName } = getState().auth;
    let response = await JsonApi.post("/articles", { 
       authorId: userId,
       authorName: userName,
       date: `${day} ${month}, ${year}`,
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

//change this one's name
export const displayArticle = (articleId) => {
  return async(dispatch) => {
    let response = await JsonApi.get(`/articles/${articleId}`);

    dispatch({
      type: "DISPLAY_ARTICLE",
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