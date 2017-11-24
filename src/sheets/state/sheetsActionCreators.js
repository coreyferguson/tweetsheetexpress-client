
import actions from './sheetsActions';
import service from '../service/sheetsService';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export function createRequest() {
  return {
    type: actions.CREATE_REQUEST
  };
}

export function createResponse() {
  return {
    type: actions.CREATE_RESPONSE
  }
}

export function create(sheet) {
  return dispatch => {
    dispatch(createRequest());
    return service.save(sheet).then(res => {
      dispatch(createResponse());
      dispatch(push(`/sheets/${res.data.id}/share`));
    });
  };
}

export function viewRequest() {
  return {
    type: actions.VIEW_REQUEST
  };
}

export function viewResponse(userSheet) {
  return {
    type: actions.VIEW_RESPONSE,
    userSheet
  };
}

export function view(sheetId) {
  return dispatch => {
    dispatch(viewRequest());
    return service.findOne(sheetId).then(res => {
      dispatch(viewResponse(res.data));
    })
  };
}

export function tick(waitTime) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function tweetBatchStart() {
  return {
    type: actions.TWEET_BATCH_START
  };
}

export function tweetBatchStop() {
  return {
    type: actions.TWEET_BATCH_STOP
  };
}

export function tweetBatch(working) {
  return dispatch => {
    if (working) dispatch(tweetBatchStart());
    else dispatch(tweetBatchStop());
  };
}

export function tweetRequest() {
  return {
    type: actions.TWEET_REQUEST
  };
}

export function tweetResponse(userSheet) {
  return {
    type: actions.TWEET_RESPONSE,
    userSheet
  };
}

export function tweet(sheetId) {
  return dispatch => {
    dispatch(tweetAllRequest());
    return service.tweetAll(sheetId).then(res => {
      dispatch(tweetAllResponse(res.data));
    });
  };
}
