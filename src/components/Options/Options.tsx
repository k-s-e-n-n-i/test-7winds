import React from 'react';
import { connect, WithStore, MapStateToProps, MapDispatchToProps } from '../../redux/services/Imports';
import { TextSnippet as TextSnippetIcon, Delete as DeleteIcon } from '@mui/icons-material/';
import { Props } from './Options.interfaces';
import './Options.styles.scss';
import { ServiceData } from '../../redux/services/ServiceRedux';

const Options = ({ id, addState, parent, listInfo, listInfoLoaded, alertLoaded }: Props) => {
  const DeleteLine = (id: number) => () => {
    if (parent) {
      parent.child = parent?.child.filter((x) => x.id !== id);
    } else {
      listInfo = listInfo.filter((x) => x.id !== id);
    }

    ServiceData.deleteLine({
      id,
      alertLoaded,
      success: () => {
        listInfoLoaded([...listInfo]);
      },
    });
  };

  return (
    <div className="options">
      <TextSnippetIcon onClick={addState(id)} />
      <DeleteIcon color="error" className="options__delete" onClick={DeleteLine(id)} />
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(Options));
