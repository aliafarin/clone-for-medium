const INITIAL_STATE = { isSignedIn: null, userId: "", userName: "", userImage: "" }

export default (state=INITIAL_STATE , action) => {

  switch(action.type) {
    
    case "SIGN_IN":
      return { ...state, isSignedIn: true, userId: action.payload.userId, userName: action.payload.userName, userImage: action.payload.userImage }
    
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: "", userName: "" };
      
    default:
      return state;  
  }

}