import stream from "../apis/stream";

import history from "../history";

export const signIn = (userId, userName, avatar) => {
    return {
        type: "SIGN_IN",
        payload: { userId, userName, avatar }
    };
};

export const signOut = () => {
    return {
        type: "SIGN_OUT"
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    const { userId, userName, avatar } = getState().auth;
    let date = new Date();
    date = await date.toLocaleString("en-US", {
        day: "2-digit",
        month: "long",
        hour: "numeric",
        minute: "numeric"
    });

    const response = await stream.post("/stream", {
        ...formValues,
        userId,
        userName,
        avatar,
        date
    });
    dispatch({ type: "CREATE_STREAM", payload: response.data });

    //navigate to home if success
    history.push("/");
};

export const fetchStreams = () => async dispatch => {
    const response = await stream.get("/stream");

    dispatch({ type: "FETCH_STREAMS", payload: response.data });
};

export const fetchStream = id => async dispatch => {
    const response = await stream.get(`/stream/${id}`);
    dispatch({ type: "FETCH_STREAM", payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await stream.patch(`/stream/${id}`, formValues);
    dispatch({ type: "EDIT_STREAM", payload: response.data });

    history.push("/");
};

export const deleteStream = id => async dispatch => {
    await stream.delete(`/stream/${id}`);

    dispatch({ type: "DELETE_STREAM", payload: id });

    history.push("/");
};
