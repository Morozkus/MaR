import { Button, Stack } from '@mui/material'
import React, { memo } from 'react'
import RepeatBoard from '../components/RepeatBoard'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { pushToRepeatList, setStart } from '../store/Slice/RepeatSlice'

const Repeat = memo(() => {
    const dispatch = useAppDispatch()
    const {round, isStart, repeatList} = useAppSelector(state => state.RepeatSlice)

    const start = (): void => {
        dispatch(setStart(true))
        dispatch(pushToRepeatList())
        console.log(repeatList)
    }

    return (
        <>
            <Stack flexDirection={'row'} gap={5} mt={2}>
                <h1>Раунд: {round}</h1>
                {!isStart && <Button onClick={start} variant="contained">Начать</Button>}
            </Stack>
            <RepeatBoard />
        </>
    )
})

export default Repeat