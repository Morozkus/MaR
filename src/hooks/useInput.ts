import { useState } from "react";

// Функция, помогающая управлять кнопками меню настройках игры
const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange
  };
};

export default useInput