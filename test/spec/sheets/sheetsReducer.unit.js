
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
    expect(stateAfter).to.eql({
      loading: false,
      entities: {}
    });
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

});
