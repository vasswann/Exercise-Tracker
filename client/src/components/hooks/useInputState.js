import { useState } from 'react';
export default (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const handleChange = (e) => {
    setValue({
      ...value,
      name: e.target.id,
      [e.target.name]: e.target.value,
    });
  };
  const reset = () => {
    setValue('');
  };
  return [value, handleChange, reset];
};
