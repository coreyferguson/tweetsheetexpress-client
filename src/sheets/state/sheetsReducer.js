
import actions from './sheetsActions';

export default (
  state = {
    loading: false,
    entities: {},
    batch: {
      working: false,
      startTime: undefined
    }
  },
  action
) => {
  switch (action.type) {
    case actions.CREATE_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.CREATE_RESPONSE:
      return Object.assign({}, state, {
        loading: false
      });
    case actions.VIEW_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.VIEW_RESPONSE:
    case actions.TWEET_RESPONSE:
      const entities = Object.assign({}, state.sheets);
      entities[action.userSheet.sheetId] = action.userSheet;
      return Object.assign({}, state, {
        loading: false,
        selectedSheetId: action.userSheet.sheetId,
        entities
      });
    case actions.TWEET_BATCH_START:
      return Object.assign({}, state, {
        batch: Object.assign({}, state.batch, {
          working: true,
          nextTweetTime: action.time
        })
      });
    case actions.TWEET_BATCH_STOP:
      return Object.assign({}, state, {
        batch: Object.assign({}, state.batch, {
          working: false,
          nextTweetTime: undefined
        })
      });
    default:
      return state;
  }
};
