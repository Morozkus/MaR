// Функция, рандомно генерирующая в нужных нам пределах строку и колонку карточки
export const getDobbleRandomNumber = (row: number, column: number): [number, number] =>
  [randomInteger(0, row - 1), randomInteger(0, column - 1)]

const randomInteger = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min))
