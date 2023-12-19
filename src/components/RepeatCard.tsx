import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/store';

interface IRepeatCard {
    indexColor: number,
    active: boolean,
    setSelectCard: () => void,
    duration: null | number
}
// Определение возможных цветов карточек
const colorTheme = ['red', 'purple', 'lightblue', 'yellow']

const RepeatCard = ({ indexColor, active, setSelectCard, duration }: IRepeatCard) => {
    // Номер раунда на данный момент
    const { round } = useAppSelector(state => state.RepeatSlice)

    // Определение прозрачности карточки
    const [opacity, setOpacity] = useState(0.5)

    // Подсвечивание карточки в начале раунда в соответствии с нужной задержкой
    useEffect(() => {
        if (active && duration) {
            setTimeout(() => {
                setOpacity(1)
                setTimeout(() => {
                    setOpacity(0.5)
                }, 250)
            }, duration)
        }
        else setOpacity(0.5)
    }, [active, duration, round])

    // Определение структуры карточки
    return (
        <Box
            onClick={() => setSelectCard()}
            sx={{
                height: 50,
                flexGrow: 1,
                borderRadius: 1,
                bgcolor: colorTheme[indexColor % (colorTheme.length - 1)],
                opacity: opacity,
                cursor: 'pointer',
                ":active": {
                    opacity: 1
                }
            }}
        />
    );
}

export default RepeatCard