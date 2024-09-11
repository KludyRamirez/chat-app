import React, { useState } from 'react';

export default function type1() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(errorsInitialState);

  return <div>type1</div>;
}
