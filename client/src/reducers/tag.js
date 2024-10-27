const tagsReducer = (state = { data: null }, action) => {
    switch (action.type) {
      
      case "FETCH_ALL_TAGS":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  export default tagsReducer;
  