import _ from "lodash";

export default (state={}, action) => {
  switch(action.type) {

    case "CREATE_ARTICLE":
      return { ...state, [action.payload.id]: action.payload };

    case "LIST_ARTICLES":
      return { ...state, ..._.mapKeys(action.payload, "id") };
      
    case "DISPLAY_ARTICLE":
      return { ...state, [action.payload.id]: action.payload };
    
    case "UPDATE_ARTICLE":
      return { ...state, [action.payload.id]: action.payload };  
      
    case "DELETE_ARTICLE":
      return { ...state, [action.payload]: undefined }  

    default: 
      return state;  
  }
}