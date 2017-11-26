
import { connect } from 'react-redux'
import { view, tweet, tweetBatchStart, tweetBatchStop } from '../../state/sheetsActionCreators';

const mapStateToProps = state => {
  return {
    authorized: state.session.data.authorized,
    authorizationUrl: state.session.data.authorizationUrl,
    batch: state.sheets.batch,
    loading: state.sheets.loading,
    userSheet: state.sheets.entities[state.sheets.selectedSheetId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMount: sheetId => {
      dispatch(view(sheetId));
    },
    onBatchStart: (time) => {
      dispatch(tweetBatchStart(time));
    },
    onBatchStop: () => {
      dispatch(tweetBatchStop());
    },
    onTweet: sheetId => {
      dispatch(tweet(sheetId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
