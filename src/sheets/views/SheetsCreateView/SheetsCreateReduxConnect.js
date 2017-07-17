
import { connect } from 'react-redux'
import { create } from '../../state/sheetsActionCreators';

const mapStateToProps = state => {
  return {
    loading: state.sheets.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreate: (sheet) => {
      dispatch(create(sheet));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
