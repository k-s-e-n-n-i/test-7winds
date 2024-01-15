import React from 'react';
import { TableRow, TableCell, TextField } from '@mui/material';
import { Props } from './RowEdit.interfaces';

import { TypeInput } from '../../services/GlobalFunctions';
import Options from '../Options/Options';

const RowEdit = ({ fields, onSubmit, level, i, id, deleteLine }: Props) => {
  return (
    <TableRow>
      <TableCell>
        <Options level={level} i={i} id={id} deleteLine={deleteLine ? deleteLine : () => {}} />
      </TableCell>
      {fields.map(({ varField, set }, i) => (
        <TableCell key={i}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={varField}
            onChange={(e: TypeInput) => set(e.target.value)}
            onKeyDown={onSubmit}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default RowEdit;
