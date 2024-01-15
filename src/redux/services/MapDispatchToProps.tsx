import { bindActionCreators } from 'redux';
import { AlertLoaded, ListInfoLoaded } from '../actions/Actions';

export const MapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      alertLoaded: AlertLoaded,
      listInfoLoaded: ListInfoLoaded,
    },
    dispatch
  );
};
