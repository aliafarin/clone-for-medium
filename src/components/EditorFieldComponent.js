import React from "react";

import EditorComponent from "./EditorComponent";

const EditorFieldComponent = (props) => {
  
  const { meta: {touched, error}, input: {value, onChange}, editorDefault} = props;

  return(
    <EditorComponent
      onChange={onChange}
      value={value}
      touched={touched}
      error={error}
      editorDefault={editorDefault}
    />
  );

}


export default EditorFieldComponent;