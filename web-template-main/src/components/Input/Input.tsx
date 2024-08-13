import { useState, KeyboardEventHandler, useEffect } from "react";
import "./Input.scss";

interface InputProps {
    placeholder: string;
    type: string;
    disabled: boolean;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Input({ placeholder, type, disabled, value, onChange, onKeyDown }: InputProps) {
    const [currentValue, setValue] = useState<string | number>(value);

    useEffect(() => {
        setValue(value);
    }, [value]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        onChange(e); 
    }

    return (
        <input
            type={type}
            className={`input ${!disabled && "editing"}`}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            onKeyDown={onKeyDown}
        />
    );
}
