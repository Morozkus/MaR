import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import { pushToRepeatList, setRound, setStart, clearRound, clearRepeatList, setDefeat } from '../store/Slice/RepeatSlice'

export const useCheckerRepeat = (base: [number, number][], target: [number, number][]) => {
    // Получение из глобального хранилища информации о нынещнем раунде, старте игры и необходимых позициях карточек
    const { round, isStart, repeatList } = useAppSelector(state => state.RepeatSlice)
    // Состояние, отвечающее за последний шаг
    const [isLastRepeat, setLastRepeat] = useState(true)
    const dispatch = useAppDispatch()

    // Добавление новой карточки в начале нового раунда
    useEffect(() => {
        if (isStart && !repeatList.length) {
            dispatch(pushToRepeatList())
        } else if (!isStart) {
            dispatch(clearRepeatList())
        }
    }, [isStart, dispatch, repeatList.length])

    // Проверка на правильность нынешнего шага игрока и нужной позиции карточки
    useEffect(() => {
        if (base.length && target.length) {
            const len = target.length - 1
            const [baseFirstValue, baseSecondValue] = base[len]
            const [targetFirstValue, targetSecondValue] = target[len]
            setLastRepeat((baseFirstValue === targetFirstValue) && (baseSecondValue === targetSecondValue))
            if (base.length === target.length && isLastRepeat) dispatch(setRound())
        }
    }, [target, dispatch, base, isLastRepeat])

    // Очищение полей в случае проигрыша или продолжение игры
    useEffect(() => {
        if (!isLastRepeat) {
            dispatch(setStart(false))
            dispatch(clearRepeatList())
            dispatch(clearRound())
            dispatch(setDefeat(true))
            setLastRepeat(true)
        } else {
            dispatch(pushToRepeatList())
        }
    }, [isLastRepeat, dispatch, round])

    return isLastRepeat
}