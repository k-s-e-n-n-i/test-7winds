import React from 'react';
import { connect, WithStore, MapStateToProps, MapDispatchToProps } from '../../redux/services/Imports';
import { TextSnippet as TextSnippetIcon, Delete as DeleteIcon } from '@mui/icons-material/';
import { Props } from './Options.interfaces';
import { ServiceData } from '../../redux/services/ServiceRedux';
import { ITable } from '../ContentProject/ContentProject.interfaces';

const Options = ({
  level,
  firstChild,
  id,
  addState,
  parent,
  listInfo,
  listInfoLoaded,
  alertLoaded,
}: Props) => {
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
    <div className="content-project__icon" style={{ marginLeft: `${level * 20}px` }}>
      <div
        onClick={addState(id)}
        className={`${level ? 'content-project__add_has-parent' : ''}${
          firstChild ? ' content-project__add_first-child' : ''
        }`}
      >
        <TextSnippetIcon />
      </div>
      <div onClick={DeleteLine(id)}>
        <DeleteIcon color="error" className="content-project__icon-delete" />
      </div>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(Options));
