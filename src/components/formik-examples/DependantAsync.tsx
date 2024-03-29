import React from "react";
import {Formik, Field, Form, useFormikContext} from "formik";

// Step 1: Define a TypeScript interface for your form values.
interface FormValues {
    textA: string;
    textB: string;
    textC: string;
}

async function fetchNewTextC(a: string, b: string): Promise<string> {
    await new Promise((r) => setTimeout(r, 500));
    return `textA: ${a}, textB: ${b}`;
}

// Fix: Explicitly type the props of MyField component.
const MyField = ({name}: { name: keyof FormValues }) => {
    // Step 2: Use FormValues interface to type the context.
    const {values, setFieldValue} = useFormikContext<FormValues>();
    React.useEffect(() => {
        let isCurrent = true;
        if (values.textA.trim() !== "" && values.textB.trim() !== "") {
            fetchNewTextC(values.textA, values.textB).then((textC) => {
                if (isCurrent) {
                    setFieldValue(name, textC);
                }
            });
        }
        return () => {
            isCurrent = false;
        };
    }, [values.textA, values.textB, setFieldValue, name]);

    return (
        <input
            value={values[name]}
            onChange={(e) => setFieldValue(name, e.target.value)}
            className="inputField"
        />
    );
};

// Styles
const styles: Record<string, React.CSSProperties> = {
    app: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    input: {
        padding: "10px",
        width: "300px",
        margin: "5px 0",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    label: {
        textAlign: "left",
        width: "300px",
        marginBottom: "5px",
    },
    button: {
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
    },
};

export default function DependantAsync() {
    return (
        <div style={styles.app}>
            <Formik
                initialValues={{textA: "", textB: "", textC: ""}}
                onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
            >
                <Form style={styles.form}>
                    <Field name="textA" placeholder="Text A" style={styles.input}/>
                    <Field name="textB" placeholder="Text B" style={styles.input}/>
                    <label style={styles.label}>
                        Text C (Auto-filled based on Text A and B):
                        <MyField name="textC"/>
                    </label>
                    <button type="submit" style={styles.button}>Submit</button>
                </Form>
            </Formik>
        </div>
    );
}