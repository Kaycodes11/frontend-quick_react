import React from 'react';
import {useForm, useFieldArray, Controller, Control} from 'react-hook-form';
import {TextField, Button, Box, List, ListItem, Typography} from '@mui/material';

interface IFormInputs {
    data: { name?: string; conditional?: string }[];
}

type FieldName = `data.${number}` | `data.${number}.name` | `data.${number}.conditional`;

const ConditionField = ({control, index, name}: {
    control: Control<IFormInputs>;
    index: number;
    name: string;
}) => {
    const fieldName: FieldName = `data.${index}.conditional` as FieldName;

    return (
        <Controller
            name={fieldName} // Using the adjusted field name with type assertion
            control={control}
            render={({field}) => (
                <TextField {...field} label="Conditional" variant="outlined" fullWidth margin="dense"/>
            )}
        />

    );
};

const UseFieldArrayUnregister2 = () => {
    const {control, handleSubmit, reset} = useForm<IFormInputs>({
        defaultValues: {data: [{name: 'test'}, {name: 'test1'}, {name: 'test2'}]},
    });
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'data',
    });

    const onSubmit = (data: IFormInputs) => console.log(data);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: '100%'}}>
            <Typography variant="h6" gutterBottom>Field Array Example</Typography>
            <List>
                {fields.map((item, index) => (
                    <ListItem key={item.id} sx={{display: 'flex', flexDirection: 'column', mb: 2}}>
                        <Controller
                            name={`data.${index}.name`}
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label={`Name ${index + 1}`} variant="outlined" fullWidth
                                           margin="dense"/>
                            )}
                        />
                        {item.name &&
                            <ConditionField control={control} index={index} name={`data.${index}.conditional`}/>}
                        <Button variant="outlined" onClick={() => remove(index)} sx={{mt: 1}}>Remove</Button>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" onClick={() => append({name: ''})} sx={{mt: 2}}>Append</Button>
            <Button variant="contained" type="submit" sx={{mt: 2, ml: 2}}>Submit</Button>
            <Button variant="outlined" onClick={() => reset()} sx={{mt: 2, ml: 2}}>Reset</Button>
        </Box>
    );
};

export default UseFieldArrayUnregister2;
