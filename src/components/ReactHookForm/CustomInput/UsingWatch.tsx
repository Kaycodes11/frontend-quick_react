import React, {useState, useEffect} from 'react';
import {useForm, useWatch, Control} from 'react-hook-form';
import {TextField, Button, Box, Typography, Container} from '@mui/material';

interface FormInputs {
    firstName: string;
    lastName: string;
}

function FirstNameWatched({control}: { control: Control<FormInputs> }) {
    const firstName = useWatch({control, name: "firstName", defaultValue: "default"});
    const [renderCount, setRenderCount] = useState(1);

    useEffect(() => {
        setRenderCount((prevCount) => prevCount + 1);
    }, [firstName]);

    return <Typography>Watch: {firstName} (Render Count: {renderCount})</Typography>;
}

export default function UsingWatch() {
    const {register, control, handleSubmit} = useForm<FormInputs>({
        defaultValues: {
            firstName: '',
            lastName: '',
        },
    });

    const onSubmit = (data: FormInputs) => console.log(data);

    return (
        <Container maxWidth="sm" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: '100%'}}>
                <Typography variant="h6" sx={{textAlign: 'center', mb: 2}}>Form with Watch</Typography>
                <TextField {...register("firstName")} label="First Name" variant="outlined" placeholder="FirstName"
                           fullWidth margin="normal"/>
                <TextField {...register("lastName")} label="Last Name" variant="outlined" placeholder="LastName"
                           fullWidth margin="normal"/>
                <Button type="submit" variant="contained" sx={{mt: 2}}>Submit</Button>

                <Box sx={{mt: 4}}>
                    <FirstNameWatched control={control}/>
                </Box>
            </Box>
        </Container>
    );
}
