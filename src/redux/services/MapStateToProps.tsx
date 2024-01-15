import { IFProjectState } from '../initState/InterfacesState';

export const MapStateToProps = ({ alert, listInfo }: IFProjectState) => {
  return {
    alert,
    listInfo,
  };
};
