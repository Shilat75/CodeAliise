
import * as api from "../api/index";

export const getAllMessages = (from, to) => async (dispatch) => {
  try {
    const { data } = await api.getMessages(from, to);
    dispatch({ type: "FETCH_ALL_MESSAGES", payload: data });
  } catch (error) {
    console.log(error);
  }
};