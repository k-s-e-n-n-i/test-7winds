import React from 'react';
import { Props } from './LineInfo.interfaces';

import { TableRow, TableCell } from '@mui/material';
import RowEdit from '../RowEdit/RowEdit';
import Options from '../Options/Options';

const LineInfo = ({
  linePrint,
  numChild,
  level,
  editState,
  idEditLine,
  addState,
  idAddLine,
  clean,
  parent,
}: Props) => {
  const { id, rowName, salary, equipmentCosts, overheads, estimatedProfit, child } = linePrint;
  const fieldsInfo = [rowName, salary, equipmentCosts, overheads, estimatedProfit];

  return (
    <>
      {idEditLine === id ? (
        <RowEdit onSubmit={clean} level={level} i={numChild} id={id} key={numChild} linePrint={linePrint} />
      ) : (
        <TableRow className="content-project__table-row" onDoubleClick={editState(id)} key={numChild}>
          <TableCell>
            <Options level={level} firstChild={numChild === 0} id={id} addState={addState} parent={parent} />
          </TableCell>
          {fieldsInfo.map((item, i) => (
            <TableCell key={i}>{item}</TableCell>
          ))}
        </TableRow>
      )}

      {child.length
        ? child.map((item, i) => (
            <LineInfo
              linePrint={item}
              numChild={i}
              level={level + 1}
              key={i}
              editState={editState}
              addState={addState}
              idEditLine={idEditLine}
              idAddLine={idAddLine}
              clean={clean}
              parent={linePrint}
            />
          ))
        : null}

      {idAddLine === id ? (
        <RowEdit onSubmit={clean} level={level + 1} i={numChild} id={id} parent={linePrint} add />
      ) : null}
    </>
  );
};

export default LineInfo;
