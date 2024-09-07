
import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const SlateEditor = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable placeholder="Enter the long description..." />
    </Slate>
  );
};

export default SlateEditor;
