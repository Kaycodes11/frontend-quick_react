import React from 'react';
import {CSS} from '@dnd-kit/utilities';
import {useSortable} from '@dnd-kit/sortable';

interface Props {
    id: string;
    children: React.ReactNode;
}

export const SortableItem: React.FC<Props> = ({id, children}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        border: '1px solid #ddd',
        padding: '1rem 4rem', // Increase left and right padding
        marginBottom: '5px',
        backgroundColor: '#fff',
        cursor: 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};
