export const getDobbleRandomNumber = (row: number, column: number): [number, number] => {
  return [randomInteger(0, row - 1), randomInteger(0, column - 1)]
}

function randomInteger(min: number, max: number): number {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}