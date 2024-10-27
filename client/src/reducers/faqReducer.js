// Defining the default State of the FAQ's
const initialState = {
    faqs: [],
    loading: false,
    error: null,
    updating: false
};

const faQReducer = (state = initialState, action) => {
    switch (action.type) {
        // FETCH STATE
        case 'FETCH_FAQS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_FAQS_SUCCESS':
            return { ...state, loading: false, faqs: action.payload };
        case 'FETCH_FAQS_FAILURE':
            return { ...state, loading: false, error: action.payload };

        // UPDATE STATE
        case 'UPDATE_FAQS_REQUEST':
            return { ...state, updating: true };
        case 'UPDATE_FAQS_SUCCESS':
            return { ...state, updating: false };
        case 'UPDATE_FAQS_FAILURE':
            return { ...state, updating: false, error: action.payload };
        default:
            return state;
    }
};

export default faQReducer;
