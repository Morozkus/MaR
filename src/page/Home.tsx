import { Button, Container, MenuItem, Stack, TextField } from '@mui/material'
import React from 'react'
import useInput from '../hooks/useInput';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { TDifficult, setDifficult, setHeight, setWidth } from '../store/Slice/RepeatSlice';

// Определение сложности игры [сложности не реализованы]
const currencies = [
    {
        value: 'easy',
        label: 'Легкая',
    },
    {
        value: 'medium',
        label: 'Средняя',
    },
    {
        value: 'hard',
        label: 'Сложная',
    }
];

const Home = () => {
    const dispatch = useAppDispatch()
    // Вытаскиваем поле с настройками
    const { settings } = useAppSelector(state => state.RepeatSlice)

    // Определяем поля для настроек
    const width = useInput(String(settings.width))
    const height = useInput(String(settings.height))
    const difficult = useInput(settings.difficult)

    // Сохранение настроек
    const saveOptions = (type: 'repeat' | 'touch') => {
        if (type === 'repeat') {
            const numberWidth = Number(width.value)
            const numberHeight = Number(height.value)

            numberWidth && dispatch(setWidth(numberWidth))
            numberHeight && dispatch(setHeight(numberHeight))
            dispatch(setDifficult(difficult.value as TDifficult))
        } else if (type === 'touch') {

        }
    }

    // Рисуем саму структуру страницы настроек
    return (
        <>
            <Container maxWidth='sm'>
                <Stack direction={'column'} alignItems={'center'} spacing={3}>
                    <h1>Максимум плиточек: {localStorage.getItem('maxRepeat') || 0}</h1>
                    <h1>Максимум мишеней: {localStorage.getItem('maxTouch') || 0}</h1>
                </Stack>

                <Stack direction={'column'} alignItems={'center'} spacing={3} mt={10}>
                    <h1>Настройка для плиточек</h1>
                    <TextField onChange={width.onChange} value={width.value} id="outlined-basic" label="Ширина" variant="outlined" />
                    <TextField onChange={height.onChange} value={height.value} id="outlined-basic" label="Высота" variant="outlined" />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="сложность"
                        defaultValue={difficult.value}
                        helperText="Выберете сложность"
                        onChange={difficult.onChange}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" onClick={() => saveOptions('repeat')}>Сохранить</Button>
                </Stack>

                <Stack direction={'column'} alignItems={'center'} spacing={3} mt={5}>
                    <h1>Настройка для мишеней</h1>

                </Stack>
            </Container>
        </>
    )
}

export default Home