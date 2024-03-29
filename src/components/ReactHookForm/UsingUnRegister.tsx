import React from "react";
import {useForm} from "react-hook-form";
import {TextField, Button, Box, Typography, Container} from "@mui/material";

interface IFormInputs {
    firstName: string;
    lastName?: string;
}

// if some field which is not needed or dynamically turned off, then that field's value still
// available somehow at the form submission, to exclude that field's value - use "unregister"

export default function UsingUnRegister() {
    const {register, handleSubmit, watch, unregister} = useForm<IFormInputs>();
    const onSubmit = (data: IFormInputs) => console.log(data);

    const firstName = watch("firstName");

    React.useEffect(() => {
        if (!firstName) {
            unregister("lastName");
        }
    }, [firstName, unregister]);

    return (
        <Container maxWidth="sm" sx={{mt: 4}}>
            <Typography variant="h5" sx={{mb: 2}}>Dynamic Form</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}
                 sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                <TextField
                    {...register("firstName")}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                />
                {firstName && (
                    <TextField
                        {...register("lastName")}
                        label="Last Name (Optional)"
                        variant="outlined"
                        fullWidth
                    />
                )}
                <Box sx={{display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 1}}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => unregister("lastName")}
                        disabled={!firstName}
                    >
                        Unregister Last Name
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
