import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import articlesReducer from "./articlesReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  articles: articlesReducer
});