
import { connect } from 'react-redux'
import { view, tweetAll } from '../../state/sheetsActionCreators';

const mapStateToProps = state => {
  return {
    loading: state.sheets.loading,
    userSheet: state.sheets.entities[state.sheets.selectedSheetId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMount: sheetId => {
      dispatch(view(sheetId));
    },
    onTweetAll: sheetId => {
      dispatch(tweetAll(sheetId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
