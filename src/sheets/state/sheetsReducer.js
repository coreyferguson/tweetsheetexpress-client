
import actions from './sheetsActions';

export default (
  state = {
    loading: false,
    entities: {}
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
      const entities = Object.assign({}, state.sheets);
      entities[action.sheet.id] = action.sheet;
      return Object.assign({}, state, {
        loading: false,
        selectedSheetId: action.sheet.id,
        entities
      });
    default:
      return state;
  }
};
