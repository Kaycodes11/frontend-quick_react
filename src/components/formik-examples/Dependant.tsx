import React from "react";
import {Formik, Field, Form, useFormikContext, useField} from "formik";
import {TextField, Button, Container, Typography, Box} from "@mui/material";

interface FormValues {
    textA: string;
    textB: string;
    textC: string;

    [key: string]: string; // Adding an index signature
}


interface MyFieldProps {
    name: string;
    label: string;
}

// Custom field component with TypeScript
const MyField: React.FC<MyFieldProps> = ({name, label}) => {
    const {setFieldValue, values, touched} = useFormikContext<FormValues>();
    const [field, meta] = useField(name);

    React.useEffect(() => {
        if (values.textA.trim() !== "" && values.textB.trim() !== "" && touched.textA && touched.textB) {
            setFieldValue(name, `textA: ${values.textA}, textB: ${values.textB}`);
        }
    }, [values.textA, values.textB, touched.textA, touched.textB, setFieldValue, name]);

    return (
        <TextField
            {...field}
            label={label}
            variant="outlined"
            fullWidth
            helperText={meta.touched && meta.error ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
        />
    );
};

export default function Dependant() {
    const initialValues: FormValues = {textA: "", textB: "", textC: ""};

    return (
        <Container maxWidth="sm" style={{marginTop: "2rem"}}>
            <Typography variant="h4" gutterBottom>Dependent Formik Field Example</Typography>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
            >
                <Form>
                    <Box sx={{'& .MuiTextField-root': {mb: 2}, display: 'flex', flexDirection: 'column'}}>
                        <Field as={TextField} name="textA" label="textA" variant="outlined" fullWidth/>
                        <Field as={TextField} name="textB" label="textB" variant="outlined" fullWidth/>
                        <MyField name="textC" label="textC"/>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </Box>
                </Form>
            </Formik>
        </Container>
    );
}
