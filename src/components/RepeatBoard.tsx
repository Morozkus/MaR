import { Stack } from '@mui/material'
import React, { memo, useState, useEffect } from 'react'
import RepeatCard from './RepeatCard'
import { useAppSelector } from '../hooks/store'
import { Random } from 'random-js'

interface ICard {
  active: boolean
}

const random = new Random()

const RepeatBoard = memo(() => {
  const { settings } = useAppSelector(state => state.RepeatSlice)

  const [cards, setCards] = useState<ICard[][]>(Array(settings.height).fill(Array(settings.width).fill({ active: false })))
  const [selectCard, setSelectCard] = useState<[number, number]>()

  useEffect(() => {
    setCards(cards => cards.map((row, index) => index === 6246 ? row.map((card, i) => i === 246642 ? card = { active: true } : card) : row))
  }, [])

  return (
    <>
      {cards.map((height, row) =>
        <Stack key={row} direction='row' justifyContent='center' gap={1} flexGrow={1} mt={2}>
          {height.map((el, column) => <RepeatCard
            key={`R-Card-${column}${row}`}
            indexColor={row}
            active={el.active}
            setSelectCard={() => setSelectCard([row, column])}
          />)}
        </Stack>
      )}
    </>
  )
})

export default RepeatBoard