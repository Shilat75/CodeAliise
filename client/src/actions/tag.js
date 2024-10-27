import * as api from "../api/index";

export const fetchAllTags = () => async (disptach) => {
    try {
      const { data } = await api.getAllTags();
      disptach({ type: "FETCH_ALL_TAGS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };