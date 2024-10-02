import {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useEffect, useState} from "react";
import s from './addInput.module.scss'

type AddInputPropsType = {
    placeholder: string
    className?: string
    addItem: (value: string) => void
}

export const AddInput:FC<AddInputPropsType> = memo(({className, placeholder, addItem}) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const inputOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        error && setError(false)
    }, [error, inputValue])

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
                console.log('test')
            }, 1000);

            // Очищаем таймер при размонтировании или изменении ошибки
            return () => clearTimeout(timer);
        }
    }, [error]);

    const addTask = useCallback(() => {
        if (inputValue.trim().length > 0) {
            addItem(inputValue)
            setInputValue('')
        } else {
            setError(true)

        }
    }, [inputValue, error, addItem])

    const inputOnKeyDownHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }, [addTask])

    const buttonOnClickHandler = useCallback(() => {
        addTask()
    }, [addTask])

    return (
        <div className={className ? `${s.addInput} ${className}` : s.addInput}>
            <input value={inputValue} onChange={inputOnChangeHandler} onKeyDown={inputOnKeyDownHandler} placeholder={placeholder} type={'text'}/>
            <button onClick={buttonOnClickHandler}>+</button>
            {error && <div className={s.error}>Введите корректное значение</div>}
        </div>
    )
})