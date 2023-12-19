import { Stack } from '@mui/material'
import React, { memo, useState, useEffect } from 'react'
import RepeatCard from './RepeatCard'
import { useAppSelector } from '../hooks/store'
import { useCheckerRepeat } from '../hooks/useChecker'
import { } from '../store/Slice/RepeatSlice'

interface ICard {
  active: boolean,
  duration: null | number
}

const RepeatBoard = memo(() => {
  // Определение нужных полей из глобального хранилища
  const { settings, repeatList, isStart, round } = useAppSelector(state => state.RepeatSlice)

  // Определение массива прямоугольничков, отображаемых на экране, их состояния и задержки срабатывания анимации
  const [cards, setCards] = useState<ICard[][]>(Array(settings.height).fill(Array(settings.width).fill({ active: false, duration: null })))
  // Определение необходимых карточек для завершения раунда
  const [currentCards, setCurrentCards] = useState<[number, number][]>([])
  // Определение выбранной карточки
  const [selectCard, setSelectCard] = useState<[number, number] | null>(null)

  const isLastRepeat = useCheckerRepeat(repeatList, currentCards)

  // Очищение необходимых карточек после завершения раунда
  useEffect(() => {
    if (!isLastRepeat || round) {
      setCurrentCards([])
    }
  }, [isLastRepeat, round])

  // Отрисовка новой карточки, которая будет в последней в следующем раунде
  useEffect(() => {
    if (!repeatList.length) return
    const [repeatRow, repeatColumn] = repeatList[repeatList.length - 1]
    setCards(cards => cards.map((row, index) => index === repeatRow ? row.map((card, i) => i === repeatColumn ? card = { active: true, duration: 500 * repeatList.length } : card) : row))
  }, [repeatList])

  // Определение поля после конца игры.
  useEffect(() => {
    if (!isStart) setCards(cards => cards.map((row) => row.map((card) => card = { active: false, duration: null })))
  }, [isStart])

  // Добавление карточек в данном раунде в общий массив для сравнения и удаление последней выбранной карты
  useEffect(() => {
    if (selectCard) {
      setCurrentCards((current) => [...current, selectCard])
      setSelectCard(null)
    }
  }, [selectCard])

  // Отрисовка массива карточек на поле
  return (
    <>
      {cards.map((height, row) =>
        <Stack key={row} direction='row' justifyContent='center' gap={1} flexGrow={1} mt={2}>
          {isStart && height.map((el, column) =>
            <RepeatCard
              key={`R-Card-${column}${row}`}
              indexColor={row}
              active={el.active}
              setSelectCard={() => setSelectCard([row, column])}
              duration={el.duration}
            />)}
        </Stack>
      )}
    </>
  )
})

export default RepeatBoard