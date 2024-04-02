import React from 'react';
import {nanoid} from "nanoid";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {SortableItem} from './SortableItem';

// Define an item type that includes an id and content
type SortableItemType = {
    id: string;
    content: string;
};

const initialItems: SortableItemType[] = [
    {id: nanoid(), content: 'Item 1'},
    {id: nanoid(), content: 'Item 2'},
    {id: nanoid(), content: 'Item 3'},
];

export const SortableList = () => {
    const [items, setItems] = React.useState<SortableItemType[]>(initialItems);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (over && active.id !== over.id) {
            // Ensure both IDs are treated as strings for indexing purposes
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);

            setItems((items) => {
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center', // Center items horizontally
            alignItems: 'center', // Center items vertically
            margin: '10px',
        }}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    <div style={{
                        maxWidth: '300px',
                    }}>
                        {items.map((item) => (
                            <SortableItem key={item.id} id={item.id}>{item.content}</SortableItem>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};
