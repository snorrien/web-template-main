import { useState } from 'react';
import './Input.scss';

interface InputProps {
    placeholder: string;
}


export function Input({ placeholder }: InputProps) {
    const [value, setValue] = useState("");

    function saveInputValue(setFunc: React.Dispatch<React.SetStateAction<string>>, e: React.ChangeEvent<HTMLInputElement>) {
        setFunc(e.target.value);
    }
    
    return (
        <input
            className="input"
            placeholder={placeholder}
            value={value}
            onChange={e => saveInputValue(setValue, e)}
        />
    )
}
