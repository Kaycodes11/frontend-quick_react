import React from 'react';
import {useForm, useFormState, useWatch, Control, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {
    TextField,
    Button,
    Box,
    Typography,
    FormControl,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
    FormHelperText,
    Grid
} from '@mui/material';

enum GenderEnum {
    female = 'female',
    male = 'male',
    others = 'others',
}

type FormValues = {
    firstName: string;
    lastName: string;
    email: string;
    isDeveloper: boolean;
    mobileNumber: string;
    title: string;
    gender: GenderEnum;
    developer: string;
    isArtist: boolean;
};

const SignupSchema = yup.object().shape({
    firstName: yup.string().required().min(2).max(20),
    lastName: yup.string().required().min(2).max(20),
    email: yup.string().email().required(),
    mobileNumber: yup.string().required().min(10).max(10),
    title: yup.string().trim().required().min(2).max(10),
});

export default function ValidationOnFieldChange() {
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
    } = useForm<FormValues>({
        resolver: yupResolver(SignupSchema),
        mode: 'onChange',
    });
    const {errors} = useFormState({control});

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            sx={{width: '100%', maxWidth: 480, mx: 'auto'}}
        >
            <Typography variant="h6" gutterBottom>
                Sign Up Form
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        {...register('firstName')}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        {...register('lastName')}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        {...register('email')}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        {...register('mobileNumber')}
                        error={Boolean(errors.mobileNumber)}
                        helperText={errors.mobileNumber?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(errors.title)}>
                        <Controller
                            name="title"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Title"
                                    variant="outlined"
                                    SelectProps={{native: true}}
                                >
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Dr">Dr</option>
                                </TextField>
                            )}
                        />
                        <FormHelperText>{errors.title?.message}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset" error={Boolean(errors.gender)}>
                        <Controller
                            name="gender"
                            control={control}
                            render={({field}) => (
                                <RadioGroup {...field} row>
                                    <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                    <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                    <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                                </RadioGroup>
                            )}
                        />
                        <FormHelperText>{errors.gender?.message}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox {...register('isDeveloper')} />}
                        label="Is Developer?"
                    />
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', gap: 2}}>
                    <Button variant="contained" type="submit">Submit</Button>
                    <Button variant="outlined" onClick={() => reset()}>Reset</Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setValue('firstName', 'S', {shouldValidate: true, shouldDirty: true, shouldTouch: true});
                            setValue('isDeveloper', true);
                        }}
                    >
                        Set All Values
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
