import React, { useState } from 'react';
import { connect, WithStore, MapStateToProps, MapDispatchToProps } from '../../redux/services/Imports';
import { TableRow, TableCell, TextField } from '@mui/material';
import { Props } from './RowEdit.interfaces';
import './RowEdit.styles.scss';

import { TypeInput } from '../../services/GlobalFunctions';
import Options from '../Options/Options';

import { StubRow } from '../ContentProject/ContentProject.constants';
import { ServiceData } from '../../redux/services/ServiceRedux';

const RowEdit = ({
  onSubmit,
  level,
  i = 0,
  id = 0,
  linePrint,
  add = false,
  addChild = false,
  parent,
  listInfo,
  listInfoLoaded,
  alertLoaded,
}: Props) => {
  const [rowName, setRowName] = useState('');
  const [salary, setSalary] = useState(0);
  const [equipmentCosts, setEquipmentCosts] = useState(0);
  const [overheads, setOverheads] = useState(0);
  const [estimatedProfit, setEstimatedProfit] = useState(0);

  const OnSubmit = (e: any) => {
    if (add) {
      CreateLine(e);
      return;
    }

    EditLine(e);
  };

  const EditLine = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.keyCode === 13) {
      ServiceData.editLine({
        sendData: { ...StubRow, ...linePrint },
        alertLoaded,
        success: onSubmit,
      });
    }
  };

  const CreateLine = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.keyCode === 13) {
      const newLine = {
        ...StubRow,
        rowName,
        salary,
        equipmentCosts,
        overheads,
        estimatedProfit,
        parentId: parent?.id || null,
      };

      if (parent) {
        parent.child = [...parent.child, newLine];
      } else {
        listInfo.push(newLine);
      }

      ServiceData.createLine({
        data: newLine,
        newLine,
        alertLoaded,
        success: onSubmit,
      });
    }
  };

  const fieldsNum: {
    value: number;
    setValue: any;
    keyName: 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit';
  }[] = [
    { value: linePrint?.salary || salary, setValue: setSalary, keyName: 'salary' },
    {
      value: linePrint?.equipmentCosts || equipmentCosts,
      setValue: setEquipmentCosts,
      keyName: 'equipmentCosts',
    },
    { value: linePrint?.overheads || overheads, setValue: setOverheads, keyName: 'overheads' },
    {
      value: linePrint?.estimatedProfit || estimatedProfit,
      setValue: setEstimatedProfit,
      keyName: 'estimatedProfit',
    },
  ];

  return (
    <div className={`row-edit${addChild ? ' row-edit_add-child' : ''}`}>
      <Options level={level} firstChild={i === 0} id={id} addState={() => {}} parent={parent} />

      <TextField
        id="outlined-basic"
        variant="outlined"
        value={linePrint?.rowName || rowName}
        onChange={(e: TypeInput) => {
          setRowName(e.target.value);
          if (linePrint) {
            linePrint['rowName'] = e.target.value;
          }
        }}
        onKeyDown={OnSubmit}
      />

      {fieldsNum.map(({ value, setValue, keyName }, i) => (
        <TextField
          key={i}
          id="outlined-basic"
          variant="outlined"
          value={value}
          onChange={(e: TypeInput) => {
            setValue(e.target.value);
            if (linePrint) {
              linePrint[keyName] = parseFloat(e.target.value);
            }
          }}
          onKeyDown={OnSubmit}
        />
      ))}
    </div>
  );
};

export default WithStore()(connect(MapStateToProps, MapDispatchToProps)(RowEdit));
