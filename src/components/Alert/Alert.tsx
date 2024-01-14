import React from 'react';
import { connect, WithStore, MapStateToProps, MapDispatchToProps } from '../../redux/services/Imports';
import './Alert.scss';

const Alert = ({ alert, alertLoaded }: { alert: string[]; alertLoaded: any }) => {
  if (alert.length) {
    return (
      <div className="alert">
        {alert.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
        <div className="alert__close" onClick={() => alertLoaded([])}></div>
      </div>
    );
  }

  return null;
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(Alert));
