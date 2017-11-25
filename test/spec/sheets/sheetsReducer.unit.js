
import { expect } from '../../support/TestUtils';
import freeze from 'deep-freeze';
import actions from '../../../src/sheets/state/sheetsActions';
import reducer from '../../../src/sheets/state/sheetsReducer';

describe('sheets/state/sheetsReducer unit tests', () => {

  let initialState;

  before(() => {
    initialState = reducer(undefined, { type: 'INITIALIZE' });
    freeze(initialState);
  });

  it('initialize state', () => {
    const stateAfter = reducer(undefined, { type: 'INITIALIZE' });
    expect(stateAfter.loading).to.be.false;
    expect(stateAfter.entities).to.not.be.undefined;
    expect(stateAfter.batch.working).to.be.false;
    expect(stateAfter.batch.nextTweetTime).to.be.undefined;
  });

  it('unknown action type', () => {
    const stateAfter = reducer(initialState, { type: 'UNKNOWN_TYPE' });
    expect(stateAfter).to.eql(initialState);
  });

  it('create request + response', () => {
    // request
    const stateAfterCreateRequest =
      reducer(initialState, { type: actions.CREATE_REQUEST });
    expect(stateAfterCreateRequest).to.have.property('loading', true);
    // response
    const stateAfterCreateResponse =
      reducer(stateAfterCreateRequest, { type: actions.CREATE_RESPONSE });
    expect(stateAfterCreateResponse).to.have.property('loading', false);
  });

  it('view request + response', () => {
    // request
    const stateAfterViewRequest =
      reducer(initialState, { type: actions.VIEW_REQUEST });
    expect(stateAfterViewRequest.loading).to.be.true;
    // response
    const stateAfterViewResponse =
      reducer(stateAfterViewRequest, {
        type: actions.VIEW_RESPONSE,
        userSheet: { sheetId: '1234', label: 'value' }
      });
    expect(stateAfterViewResponse.loading).to.be.false;
    expect(stateAfterViewResponse.selectedSheetId).to.equal('1234');
    expect(stateAfterViewResponse.entities).to.eql({
      '1234': { sheetId: '1234', label: 'value' }
    });
  });

  it('tweet response', () => {
    const stateAfterTweetResponse =
      reducer(stateAfterTweetResponse, {
        type: actions.TWEET_RESPONSE,
        userSheet: { sheetId: '1234', label: 'value' }
      });
    expect(stateAfterTweetResponse.loading).to.be.false;
    expect(stateAfterTweetResponse.selectedSheetId).to.equal('1234');
    expect(stateAfterTweetResponse.entities).to.eql({
      '1234': { sheetId: '1234', label: 'value' }
    });
  });

  it('tweet batch, start and stop', () => {
    const stateAfterStart =
      reducer(initialState, { type: actions.TWEET_BATCH_START });
    expect(stateAfterStart.batch.working).to.be.true;
    const stateAfterStop =
      reducer(stateAfterStart, { type: actions.TWEET_BATCH_STOP });
    expect(stateAfterStop.batch.working).to.be.false;
  });

});
