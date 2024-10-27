import * as api from '../api/index'

export const fetchFAQs = () => async (dispatch) => {
    dispatch({ type: 'FETCH_FAQS_REQUEST' });

    try {
        const response = await api.getFAQs();
        dispatch({ type: "FETCH_FAQS_SUCCESS", payload: response });
    } catch (error) {
        console.error("Error fetching FAQs:", error);
    }
};

// Action to update the FAQs
export const UPDATE_FAQS_REQUEST = 'UPDATE_FAQS_REQUEST';
export const UPDATE_FAQS_SUCCESS = 'UPDATE_FAQS_SUCCESS';
export const UPDATE_FAQS_FAILURE = 'UPDATE_FAQS_FAILURE';

export const updateFaqs = () => async (dispatch) => {
    dispatch({ type: UPDATE_FAQS_REQUEST });

    try {
        const data = await api.updateFAQs();
        dispatch({ type: UPDATE_FAQS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_FAQS_FAILURE, payload: error.message });
    }
}