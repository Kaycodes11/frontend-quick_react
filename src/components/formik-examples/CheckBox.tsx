import React from "react";
import {Formik, Field, Form} from "formik";
import {Checkbox, FormControlLabel, Button, Container, Typography, FormGroup} from "@mui/material";

interface FormValues {
    toggle: boolean;
    checked: string[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const CheckBox: React.FC = () => (
    <Container maxWidth="sm" style={{marginTop: '2rem'}}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <Formik<FormValues>
            initialValues={{
                toggle: false,
                checked: [],
            }}
            onSubmit={async (values) => {
                await sleep(500);
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({values}) => (
                <Form>
                    <FormGroup>
                        <FormControlLabel
                            control={<Field as={Checkbox} type="checkbox" name="toggle" color="primary"/>}
                            label={`${values.toggle}`}
                        />

                        <Typography component="div" id="checkbox-group">Checked</Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Field as={Checkbox} type="checkbox" name="checked" value="One"
                                                color="primary"/>}
                                label="One"
                            />
                            <FormControlLabel
                                control={<Field as={Checkbox} type="checkbox" name="checked" value="Two"
                                                color="primary"/>}
                                label="Two"
                            />
                            <FormControlLabel
                                control={<Field as={Checkbox} type="checkbox" name="checked" value="Three"
                                                color="primary"/>}
                                label="Three"
                            />
                        </FormGroup>
                    </FormGroup>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Form>
            )}
        </Formik>
    </Container>
);

export default CheckBox;
