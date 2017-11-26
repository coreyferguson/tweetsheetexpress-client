
import { connect } from 'react-redux'
import { getSession, signOut } from '../../../session/state/sessionActionCreators';

const mapStateToProps = ({ session }) => session;

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
      dispatch(getSession());
    },
    onSignOut: () => {
      dispatch(signOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
