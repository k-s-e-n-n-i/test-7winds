import { bindActionCreators } from 'redux';
import { AlertLoaded } from '../actions/Actions';

export const MapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      alertLoaded: AlertLoaded,
    },
    dispatch
  );
};
