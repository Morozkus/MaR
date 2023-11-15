import { Box } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/store';

interface IRepeatCard {
    indexColor: number,
    active: boolean,
    setSelectCard: () => void,
    isStart: boolean
}

type opacityArgs = { active: boolean, isClick: boolean }

const colorTheme = ['red', 'purple', 'lightblue', 'yellow']

const RepeatCard = memo(({ indexColor, active, setSelectCard, isStart }: IRepeatCard) => {
    const [isClick, setIsClick] = useState(false)

    const setOpacity = ({ active, isClick }: opacityArgs) => {
        let opacity = 0.5
        if (isStart && (active || isClick)) {
            opacity = 1
        }
        return opacity
    }

    return (
        <Box
            onClick={() => isStart && setSelectCard()}
            onMouseDown={() => isStart && setIsClick(true)}
            onMouseUp={() => isStart && setTimeout(() => setIsClick(false), 200)}
            sx={{
                height: 50,
                flexGrow: 1,
                borderRadius: 1,
                bgcolor: colorTheme[indexColor % (colorTheme.length - 1)],
                opacity: setOpacity({ active, isClick }),
                cursor: 'pointer'
            }}
        />
    );
})

export default RepeatCard