function createAction(type, req, res) {
  return {
    type,
    payload: {
      req,
      res
    }
  }
}

export default function createAsyncAction(actionTypes, apiCall) {
  const [requestActionType, successActionType, failureActionType] = actionTypes;

  return apiCallParams => dispatch => {
    dispatch(createAction(requestActionType, apiCallParams, {}));

    return apiCall(apiCallParams).then(
      response =>
        Promise.resolve(
          dispatch(
            createAction(successActionType, apiCallParams, response)
          )
        ),
      error =>
        Promise.reject(
          dispatch(
            createAction(failureActionType, apiCallParams, error)
          )
        )
    )
  };
}