import { ProjectState } from '../initState/InitState';

const reducer = (state: any = ProjectState, action: { type: string; payload: object }) => {
  switch (action.type) {
    case 'ALERT_LOADED':
      return { ...state, alert: action.payload };

    default:
      return state;
  }
};

export default reducer;
