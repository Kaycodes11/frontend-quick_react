import React from "react";
import {useForm, Controller} from "react-hook-form";
import {Box, Typography, Button, TextField, Container, Paper, Stack} from "@mui/material";

interface FormInputs {
    something: string;
}

export default function UsingResetWithSubmit() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {isSubmitSuccessful},
    } = useForm({defaultValues: {something: "anything"}});

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset({something: ""}); // Reset form fields to initial values after successful submit
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = (data: FormInputs) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <input {...register("something")} placeholder="Type something..."/>
            <input type="submit" value="Submit"/>
        </form>
    );
}

// interface for the Uncontrolled Form
interface UseFormInputs {
    firstName: string;
    lastName: string;
}

// Reset the Uncontrolled Form
export function UncontrolledForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<UseFormInputs>({
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    });
    const onSubmit = (data: UseFormInputs) => {
        console.log(data);
    };

    // return (
    //     <Container maxWidth="sm" sx={{mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    //         <Paper elevation={3} sx={{p: 3, width: '100%', borderRadius: 2}}>
    //             <Typography variant="h6" sx={{mb: 2}}>Uncontrolled Form</Typography>
    //             <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{'& > *': {m: 1}, width: '100%'}}>
    //                 <TextField
    //                     variant="outlined"
    //                     label="First Name"
    //                     error={!!errors.firstName}
    //                     helperText={errors.firstName?.type === 'required' && "First name is required"}
    //                     {...register("firstName", {required: true})}
    //                     fullWidth
    //                 />
    //
    //                 <TextField
    //                     variant="outlined"
    //                     label="Last Name"
    //                     {...register("lastName")}
    //                     fullWidth
    //                 />
    //
    //                 <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
    //                     <Button type="submit" variant="contained">Submit</Button>
    //                     <Button variant="outlined" onClick={() => reset()}>Reset</Button>
    //                 </Box>
    //             </Box>
    //         </Paper>
    //     </Container>
    // );

    return (
        <Container maxWidth="sm" sx={{mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Paper elevation={3} sx={{p: 3, width: '100%', borderRadius: 2}}>
                <Typography variant="h6" sx={{mb: 2}}>Uncontrolled Form</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: '100%'}}>
                    <Stack spacing={2}>
                        <TextField
                            variant="outlined"
                            label="First Name"
                            error={!!errors.firstName}
                            helperText={errors.firstName?.type === 'required' && "First name is required"}
                            {...register("firstName", {required: true})}
                            fullWidth
                        />

                        <TextField
                            variant="outlined"
                            label="Last Name"
                            {...register("lastName")}
                            fullWidth
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{mt: 2, justifyContent: 'center'}}>
                        <Button type="submit" variant="contained">Submit</Button>
                        <Button variant="outlined" onClick={() => reset()}>Reset</Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}


// interface for the controlled form
interface IFormInputs {
    firstName: string
    lastName: string
}

export function ControlledForm() {
    const {handleSubmit, reset, control, formState: {errors}} = useForm<IFormInputs>({
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    });

    const onSubmit = (data: IFormInputs) => console.log(data);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{display: 'flex', flexDirection: 'column', gap: 2, width: 250, margin: 'auto', mt: 4}}
        >
            <Typography variant="h6">Controlled Form</Typography>
            <Controller
                name="firstName"
                control={control}
                rules={{required: "First name is required"}}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                )}
            />
            <Controller
                name="lastName"
                control={control}
                render={({field}) => <TextField {...field} label="Last Name" variant="outlined" fullWidth/>}
            />
            <Button type="submit" variant="contained" sx={{mt: 2}}>Submit</Button>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1, mt: 2}}>
                <Button variant="outlined" onClick={() => reset()} fullWidth>Reset All</Button>
                <Button variant="outlined" onClick={() => reset({firstName: "Bill", lastName: "Luo"})} fullWidth>Reset
                    to Bill Luo</Button>
            </Box>
        </Box>
    );
}
