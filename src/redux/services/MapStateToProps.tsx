import { IFProjectState } from '../initState/InterfacesState';

export const MapStateToProps = ({ alert }: IFProjectState) => {
  return {
    alert,
  };
};
