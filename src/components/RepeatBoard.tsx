import { Stack } from '@mui/material'
import React, { memo, useState, useEffect } from 'react'
import RepeatCard from './RepeatCard'
import { useAppSelector } from '../hooks/store'
import { useCheckerRepeat } from '../hooks/useChecker'
import { useDispatch } from 'react-redux'
import {  } from '../store/Slice/RepeatSlice'

interface ICard {
  active: boolean
}

const RepeatBoard = memo(() => {
  const { settings, repeatList, isStart, round } = useAppSelector(state => state.RepeatSlice)
  const dispatch = useDispatch()

  const [cards, setCards] = useState<ICard[][]>(Array(settings.height).fill(Array(settings.width).fill({ active: false })))
  const [currentCards, setCurrentCards] = useState<[number, number][]>([])
  const [selectCard, setSelectCard] = useState<[number, number] | null>(null)

  const isLastRepeat = useCheckerRepeat(repeatList, currentCards)

  useEffect(() => {
    if (!isLastRepeat || round) {
      setCurrentCards([])
    }

  }, [isLastRepeat, round])

  useEffect(() => {
    console.log(currentCards, repeatList)
  }, [currentCards, repeatList])

  useEffect(() => {
    // setCards(cards => cards.map((row, index) => index === 6246 ? row.map((card, i) => i === 246642 ? card = { active: true } : card) : row))
    if (selectCard) {
      setCurrentCards((current) => [...current, selectCard])
      setSelectCard(null)
    }
  }, [selectCard])

  return (
    <>
      {cards.map((height, row) =>
        <Stack key={row} direction='row' justifyContent='center' gap={1} flexGrow={1} mt={2}>
          {height.map((el, column) => <RepeatCard
            key={`R-Card-${column}${row}`}
            indexColor={row}
            active={el.active}
            setSelectCard={() => setSelectCard([row, column])}
            isStart={isStart}
          />)}
        </Stack>
      )}
    </>
  )
})

export default RepeatBoard