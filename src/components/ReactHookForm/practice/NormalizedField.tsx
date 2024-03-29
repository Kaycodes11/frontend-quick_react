import React from 'react';
import {useController, UseControllerProps, useForm} from "react-hook-form";
import {NumericFormat} from "react-number-format";
import {TextField, Box, Typography, Button} from "@mui/material";

const defaultValues = {
    priceInCents: 1234567,
    muiPriceInCents: 1234567,
};

interface FormValues {
    priceInCents: number | string;
    muiPriceInCents: number | string;
}

// Here, UseControllerProps type takes FormValues (or FieldValues) for MaskedInput's props type
// since props.field.ref thus MaskedInput expects a forwardRef which is why it's having this issue
const MaskedInput = React.forwardRef<HTMLDivElement, UseControllerProps<FormValues>>((props, ref) => {
    const {field} = useController(props);
    return (
        <NumericFormat
            {...field}
            customInput={TextField} // Using TextField as the base input component
            thousandSeparator={true}
            decimalScale={2}
            onValueChange={(values) => {
                const {floatValue} = values;
                field.onChange(floatValue || '');
            }}
            prefix="$ "
            inputRef={ref} // Applying the ref to the customInput
            fullWidth
        />
    );
});
MaskedInput.displayName = 'MaskedInput';

export default function NormalizedField() {
    const {control, reset, watch} = useForm<FormValues>({
        mode: "onChange",
        defaultValues,
    });

    return (
        <Box component="form" sx={{'& > *': {m: 1}}}>
            <Typography variant="h6">Normalized Field</Typography>
            <MaskedInput control={control} name="muiPriceInCents"/>
            <Button variant="contained" type="submit" sx={{mt: 2}}>
                Submit
            </Button>
            <Button
                variant="outlined"
                onClick={() => reset(defaultValues)}
                sx={{mt: 2}}
            >
                Custom Reset
            </Button>
            <Typography component="pre"
                        sx={{color: '#000', mt: 2, backgroundColor: '#f0f0f0', p: 2, borderRadius: '4px'}}>
                {JSON.stringify(watch(), null, 2)}
            </Typography>
        </Box>
    );
}