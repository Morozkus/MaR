import { Stack } from '@mui/material'
import React, { memo, useState, useEffect } from 'react'
import RepeatCard from './RepeatCard'
import { useAppSelector } from '../hooks/store'
import { useCheckerRepeat } from '../hooks/useChecker'
import { useDispatch } from 'react-redux'
import { } from '../store/Slice/RepeatSlice'

interface ICard {
  active: boolean,
  duration: null | number
}

const RepeatBoard = memo(() => {
  const { settings, repeatList, isStart, round } = useAppSelector(state => state.RepeatSlice)
  const dispatch = useDispatch()

  const [cards, setCards] = useState<ICard[][]>(Array(settings.height).fill(Array(settings.width).fill({ active: false, duration: null })))
  const [currentCards, setCurrentCards] = useState<[number, number][]>([])
  const [selectCard, setSelectCard] = useState<[number, number] | null>(null)
  const [isLoading, setLoading] = useState(false)

  const isLastRepeat = useCheckerRepeat(repeatList, currentCards)

  useEffect(() => {
    if (!isLastRepeat || round) {
      setCurrentCards([])
    }
  }, [isLastRepeat, round])

  useEffect(() => {
    if (!repeatList.length) return
    const [repeatRow, repeatColumn] = repeatList[repeatList.length - 1]
    setCards(cards => cards.map((row, index) => index === repeatRow ? row.map((card, i) => i === repeatColumn ? card = { active: true, duration: 500 * repeatList.length } : card) : row))
  }, [repeatList])

  // useEffect(() => {
  //   console.log(currentCards, repeatList)
  // }, [currentCards, repeatList])

  useEffect(() => {
    if (!isStart) setCards(cards => cards.map((row) => row.map((card) => card = { active: false, duration: null })))
  }, [isStart])


  useEffect(() => {
    if (selectCard) {
      setCurrentCards((current) => [...current, selectCard])
      setSelectCard(null)
    }
  }, [selectCard])

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