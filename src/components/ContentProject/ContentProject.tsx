import React, { useEffect, useState } from 'react';
import './ContentProject.styles.scss';
import { connect, WithStore, MapStateToProps, MapDispatchToProps } from '../../redux/services/Imports';
import { Button } from '@mui/material';
import { Props } from './ContentProject.interfaces';
import { HeadList } from './ContentProject.constants';
import { ServiceData } from '../../redux/services/ServiceRedux';
import RowEdit from '../RowEdit/RowEdit';
import LineInfo from '../LineInfo/LineInfo';

const ContentProject = ({ listInfo, listInfoLoaded, alertLoaded }: Props) => {
  useEffect(() => {
    ServiceData.getList({ listInfoLoaded, alertLoaded });
  }, []);

  const [idEditLine, setIdEditLine] = useState(-1);
  const EditState = (id: number) => () => {
    setIdEditLine(id);
    setIdAddLine(-2);
  };

  const [idAddLine, setIdAddLine] = useState(-2);
  const AddState = (id: number) => () => {
    setIdEditLine(-1);
    setIdAddLine(id);
  };

  const CleanEdit = () => {
    setIdEditLine(Math.floor(Math.random() * 100));
    setIdAddLine(Math.floor(Math.random() * 100));
    setAddNewParentLine(false);
  };

  const [addNewParentLine, setAddNewParentLine] = useState(false);
  const ShowNewLine = () => setAddNewParentLine(true);

  return (
    <div className="content-project">
      <form>
        <div>
          <div className="content-project__table-row">
            {HeadList.map((name, i) => (
              <div key={i}>{name}</div>
            ))}
          </div>
        </div>
        <ul className="content-project__list">
          {listInfo.length ? (
            listInfo.map((item, i) => (
              <LineInfo
                linePrint={item}
                numChild={i}
                level={0}
                key={i}
                editState={EditState}
                addState={AddState}
                idEditLine={idEditLine}
                idAddLine={idAddLine}
                clean={CleanEdit}
                parent={null}
              />
            ))
          ) : (
            <RowEdit onSubmit={CleanEdit} level={0} add />
          )}

          <li>{addNewParentLine && <RowEdit onSubmit={CleanEdit} level={0} add />}</li>
        </ul>

        <div className="content-project__add-button">
          {!addNewParentLine && <Button onClick={ShowNewLine}>Добавить новую запись</Button>}
        </div>
      </form>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(ContentProject));
