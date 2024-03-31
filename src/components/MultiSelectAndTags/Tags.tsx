import React, { useState } from 'react';
import { useController } from 'react-hook-form';

interface TagsInputProps {
    name: string;
    control: any;
}

const TagsInput: React.FC<TagsInputProps> = ({ name, control }) => {
    const {
        field: { value, onChange },
    } = useController({ name, control });

    const [input, setInput] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && input) {
            onChange([...value, input]);
            setInput('');
            event.preventDefault();
        }
    };

    const removeTag = (index: number) => {
        onChange([...value.slice(0, index), ...value.slice(index + 1)]);
    };

    return (
        <div>
            {value.map((tag: string, index: number) => (
                <span key={index} onClick={() => removeTag(index)}>
          {tag}
        </span>
            ))}
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};


export default TagsInput;