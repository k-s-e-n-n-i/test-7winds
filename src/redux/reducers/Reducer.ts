import { ProjectState } from '../initState/InitState';

const reducer = (state: any = ProjectState, action: { type: string; payload: object }) => {
  switch (action.type) {
    case 'ALERT_LOADED':
      return { ...state, alert: action.payload };
    case 'LIST_INFO_LOADED':
      return { ...state, listInfo: action.payload };

    default:
      return state;
  }
};

export default reducer;
