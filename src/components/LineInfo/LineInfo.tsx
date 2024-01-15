import React from 'react';
import { Props } from './LineInfo.interfaces';

import { TableRow, TableCell } from '@mui/material';
import RowEdit from '../RowEdit/RowEdit';
import Options from '../Options/Options';

const LineInfo = ({
  fields,
  linePrint,
  i,
  level,
  editLine,
  deleteLine,
  createLine,
  editState,
  idEditLine,
  setIdEditLine,
  addState,
  idAddLine,
}: Props) => {
  const { id, rowName, salary, equipmentCosts, overheads, estimatedProfit, child } = linePrint;
  const fieldsInfo = [rowName, salary, equipmentCosts, overheads, estimatedProfit];

  return (
    <>
      {idEditLine === id ? (
        <RowEdit
          fields={fields}
          onSubmit={editLine}
          level={level}
          i={i}
          id={id}
          deleteLine={deleteLine}
          key={i}
        />
      ) : (
        <TableRow className="content-project__table-row" onDoubleClick={editState(id, linePrint)} key={i}>
          <TableCell>
            <Options level={level} i={i} id={id} addState={addState} deleteLine={deleteLine} />
          </TableCell>
          {fieldsInfo.map((item, i) => (
            <TableCell key={i}>{item}</TableCell>
          ))}
        </TableRow>
      )}

      {idAddLine === id ? (
        <RowEdit
          fields={fields}
          onSubmit={createLine}
          level={level + 1}
          i={i}
          id={id}
          deleteLine={deleteLine}
        />
      ) : null}

      {child.length
        ? child.map((item, i) => (
            <LineInfo
              fields={fields}
              linePrint={item}
              i={i}
              level={level + 1}
              editLine={editLine}
              deleteLine={deleteLine}
              createLine={createLine}
              editState={editState}
              addState={addState}
              idEditLine={idEditLine}
              setIdEditLine={setIdEditLine}
              idAddLine={idAddLine}
              key={i}
            />
          ))
        : null}
    </>
  );
};

export default LineInfo;
