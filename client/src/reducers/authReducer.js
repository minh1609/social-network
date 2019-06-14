const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                isSignedIn: true,
                userId: action.payload.userId,
                userName: action.payload.userName,
                avatar: action.payload.avatar
            };
        case "SIGN_OUT":
            return { isSignedIn: false, userId: null };
        default:
            return state;
    }
};
