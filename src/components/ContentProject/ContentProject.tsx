import React, { useEffect, useState } from 'react';
import './ContentProject.styles.scss';
import { connect, WithStore, MapStateToProps, MapDispatchToProps } from '../../redux/services/Imports';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { ITable, Props } from './ContentProject.interfaces';
import { HeadList, StubRow } from './ContentProject.constants';
import { ServiceData } from '../../redux/services/ServiceRedux';
import RowEdit from '../RowEdit/RowEdit';
import LineInfo from '../LineInfo/LineInfo';

const ContentProject = ({ listInfo, listInfoLoaded, alertLoaded }: Props) => {
  useEffect(() => {
    ServiceData.getList({ listInfoLoaded, alertLoaded });
  }, []);

  const [rowName, setRowName] = useState('');
  const [salary, setSalary] = useState('0');
  const [equipmentCosts, setEquipmentCosts] = useState('0');
  const [overheads, setOverheads] = useState('0');
  const [estimatedProfit, setEstimatedProfit] = useState('0');
  const [id, setId] = useState(0);

  const fields: { varField: string; set: any }[] = [
    { varField: rowName, set: setRowName },
    { varField: salary, set: setSalary },
    { varField: equipmentCosts, set: setEquipmentCosts },
    { varField: overheads, set: setOverheads },
    { varField: estimatedProfit, set: setEstimatedProfit },
  ];

  const [idEditLine, setIdEditLine] = useState(-1);
  const [editItem, setEditItem] = useState<ITable>(StubRow);

  const EditState = (idEdit: number, fieldsInfo: ITable) => () => {
    setIdEditLine(idEdit);
    setEditItem(fieldsInfo);

    const { rowName, salary, equipmentCosts, overheads, estimatedProfit, id } = fieldsInfo;
    setRowName(rowName);
    setSalary(salary.toString());
    setEquipmentCosts(equipmentCosts.toString());
    setOverheads(overheads.toString());
    setEstimatedProfit(estimatedProfit.toString());
    setId(id);
  };

  const [idAddLine, setIdAddLine] = useState(0);
  const AddState = (id: number) => () => {
    setIdAddLine(id);

    setRowName('');
    setSalary('0');
    setEquipmentCosts('0');
    setOverheads('0');
    setEstimatedProfit('0');
  };

  const success = () => {
    setIdEditLine(-1);
    setId(0);

    setIdAddLine(0);
  };

  const CreateLine = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.keyCode === 13) {
      ServiceData.createLine({
        data: {
          ...editItem,
          parentId: idAddLine ? idAddLine : null,
          rowName,
          salary: parseFloat(salary),
          equipmentCosts: parseFloat(equipmentCosts),
          overheads: parseFloat(overheads),
          estimatedProfit: parseFloat(estimatedProfit),
        },
        alertLoaded,
        success,
      });
    }
  };

  const EditLine = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.keyCode === 13) {
      ServiceData.editLine({
        sendData: {
          ...editItem,
          id,
          rowName,
          salary: parseFloat(salary),
          equipmentCosts: parseFloat(equipmentCosts),
          overheads: parseFloat(overheads),
          estimatedProfit: parseFloat(estimatedProfit),
        },
        alertLoaded,
        success,
        listInfo,
        listInfoLoaded,
      });
    }
  };

  const DeleteLine = (id: number) => () => {
    ServiceData.deleteLine({ id, alertLoaded, success, listInfo, listInfoLoaded });
  };

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
                    fields={fields}
                    linePrint={item}
                    i={i}
                    level={0}
                    editLine={EditLine}
                    deleteLine={DeleteLine}
                    createLine={CreateLine}
                    editState={EditState}
                    addState={AddState}
                    idEditLine={idEditLine}
                    setIdEditLine={setIdEditLine}
                    idAddLine={idAddLine}
                    key={i}
                  />
                ))
              ) : (
                <RowEdit fields={fields} onSubmit={CreateLine} level={0} i={0} id={id} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(ContentProject));
