import React from 'react';
import {useForm, UseFormReturn, SubmitHandler, FieldValues} from 'react-hook-form';
import {Container, TextField, MenuItem, Button, FormControl, InputLabel, Select as MuiSelect} from '@mui/material';

const Form = <TFormValues extends Record<string, any> = Record<string, any>>({onSubmit, children}: {
    onSubmit: SubmitHandler<TFormValues>; children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
}) => {
    const methods = useForm<TFormValues>();
    return (
        <Container component="form" onSubmit={methods.handleSubmit(onSubmit)} maxWidth="sm" sx={{mt: 4}}>
            {children(methods)}
        </Container>
    );
};

type FormValues = {
    firstName: string;
    lastName: string;
    sex: 'female' | 'male' | 'other';
};

export default function Form1() {
    const onSubmit = (data: FormValues) => console.log(data);

    return (
        <Form<FormValues> onSubmit={onSubmit}>
            {({register}) => (
                <>
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        {...register('firstName')}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        {...register('lastName')}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Sex</InputLabel>
                        <MuiSelect
                            label="Sex"
                            defaultValue=""
                            {...register('sex')}>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </MuiSelect>
                    </FormControl>
                    <Button type="submit" variant="contained" sx={{mt: 2}}>
                        Submit
                    </Button>
                </>
            )}
        </Form>
    );
}
