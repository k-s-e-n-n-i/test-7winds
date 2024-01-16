import React, { useEffect, useState } from 'react';
import './ContentProject.styles.scss';
import { connect, WithStore, MapStateToProps, MapDispatchToProps } from '../../redux/services/Imports';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
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
  };

  const [idAddLine, setIdAddLine] = useState(-2);
  const AddState = (id: number) => () => {
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="content-project__table-row">
                {HeadList.map((name, i) => (
                  <TableCell align="left" key={i}>
                    {name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
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

              {addNewParentLine && <RowEdit onSubmit={CleanEdit} level={0} add />}
            </TableBody>
          </Table>
          <div className="content-project__add-button">
            {!addNewParentLine && <Button onClick={ShowNewLine}>Добавить новую запись</Button>}
          </div>
        </TableContainer>
      </form>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(ContentProject));
