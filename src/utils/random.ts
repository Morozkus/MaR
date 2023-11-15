import { Random } from "random-js"

const random = new Random()

export const getDobbleRandomNumber = (row: number, column: number): [number, number] => {
  return [random.integer(0, row), random.integer(0, column)]
}