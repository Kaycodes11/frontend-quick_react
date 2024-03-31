import React from 'react';
import {Controller} from 'react-hook-form';

interface Option {
    label: string;
    value: string | number;
}

interface DropdownProps {
    name: string;
    options: Option[];
    control: any;
    label: string;
}

const Dropdown: React.FC<DropdownProps> = ({name, options, control, label}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <>
                    <label>{label}</label>
                    <select {...field}>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </>
            )}
        />
    );
};

export default Dropdown;
