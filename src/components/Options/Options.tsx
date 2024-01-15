import React from 'react';

import { TextSnippet as TextSnippetIcon, Delete as DeleteIcon } from '@mui/icons-material/';
import { Props } from './Options.interfaces';

const Options = ({ level, i, id, addState, deleteLine }: Props) => {
  return (
    <div className="content-project__icon" style={{ marginLeft: `${level * 20}px` }}>
      <div
        onClick={addState ? addState(id) : () => {}}
        className={`${level ? 'content-project__add_has-parent' : ''}${
          i === 0 ? ' content-project__add_first-child' : ''
        }`}
      >
        <TextSnippetIcon />
      </div>
      <div onClick={deleteLine(id)}>
        <DeleteIcon color="error" className="content-project__icon-delete" />
      </div>
    </div>
  );
};

export default Options;
