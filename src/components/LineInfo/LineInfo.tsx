import React from 'react';
import { Props } from './LineInfo.interfaces';
import './LineInfo.styles.scss';
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

  const Child = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      {idEditLine === id ? (
        <li className="line-info">
          <RowEdit onSubmit={clean} level={level} i={numChild} id={id} key={numChild} linePrint={linePrint} />
          <Child />
        </li>
      ) : (
        <li className="line-info" key={numChild}>
          <div className="line-info__fields" onDoubleClick={editState(id)}>
            <Options level={level} firstChild={numChild === 0} id={id} addState={addState} parent={parent} />

            {fieldsInfo.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>

          <Child />

          {idAddLine === id ? (
            <RowEdit
              onSubmit={clean}
              level={level + 1}
              i={numChild}
              id={id}
              parent={linePrint}
              add
              addChild
            />
          ) : null}
        </li>
      )}
    </>
  );
};

export default LineInfo;
