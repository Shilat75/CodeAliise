const  messagesReducer = (state = { data: null }, action) => {
    switch (action.type) {
      
      case "FETCH_ALL_MESSAGES":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  export default messagesReducer;
  