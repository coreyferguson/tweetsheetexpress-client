
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
      console.log('A');
      dispatch(createResponse());
      console.log('B');
      console.log('res', res);
      console.log('res.data', res.data);
      console.log('res.data.id', res.data.id);
      debugger;
      dispatch(push(`/sheets/${res.data.id}/share`));
      console.log('C');
    });
  };
}

export function viewRequest() {
  return {
    type: actions.VIEW_REQUEST
  };
}

export function viewResponse(sheet) {
  return {
    type: actions.VIEW_RESPONSE,
    sheet
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

export function tweetAllRequest() {
  return {
    type: actions.TWEET_ALL_REQUEST
  };
}

export function tweetAllResponse(sheet) {
  return {
    type: actions.TWEET_ALL_RESPONSE
  };
}

export function tweetAll(sheetId) {
  return dispatch => {
    dispatch(tweetAllRequest());
    return service.tweetAll(sheetId).then(res => {
      dispatch(tweetAllResponse(res.data));
    });
  };
}
