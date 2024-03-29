import {useForm} from "react-hook-form";

export default function GetCompareFields() {
    const {
        register,
        formState: {errors},
        handleSubmit,
        getValues,
    } = useForm();

    const onSubmit = (data) => console.log(data);

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '0.5rem 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const buttonStyle = {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '1rem',
    };

    const errorStyle = {
        color: 'red',
        fontSize: '0.85rem',
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        display: 'block',
    };

    return (
        <>
            <h1 style={{textAlign: 'center'}}>GetValue - Compare Field Values</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <label style={labelStyle}>New Password:</label>
                <input
                    {...register("password", {required: "Password is required!"})}
                    style={inputStyle}
                    type="password"
                />
                {errors.password && <p style={errorStyle}>{errors.password.message}</p>}

                <label style={labelStyle}>Confirm Password:</label>
                <input
                    {...register("passwordConfirmation", {
                        required: "Please confirm password!",
                        validate: value => value === getValues("password") || "Passwords should match"
                    })}
                    style={inputStyle}
                    type="password"
                />
                {errors.passwordConfirmation && (
                    <p style={errorStyle}>{errors.passwordConfirmation.message}</p>
                )}

                <button type="submit" style={buttonStyle}>Submit</button>
            </form>
        </>
    );
}
