import * as React from "react";
import {useForm} from "react-hook-form";

type FormInputs = {
    firstName: string;
    lastName: string;
    username: string;
};

const styles = {
    form: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "10px",
        marginTop: "20px",
    },
    input: {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "200px",
    },
    error: {
        color: "red",
        fontSize: "0.75rem",
        marginTop: "-5px",
        marginBottom: "10px",
    },
    button: {
        padding: "8px 12px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
        margin: "5px",
    },
    submitButton: {
        marginTop: "20px",
    },
};

export default function UsingClearErrors() {
    const {
        register,
        formState: {errors},
        handleSubmit,
        clearErrors,
    } = useForm<FormInputs>();

    const onSubmit = (data: FormInputs) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <input {...register("firstName", {required: "First name is required"})} style={styles.input}/>
            {errors.firstName && <p style={styles.error}>{errors.firstName.message}</p>}
            <input {...register("lastName", {required: "Last name is required"})} style={styles.input}/>
            {errors.lastName && <p style={styles.error}>{errors.lastName.message}</p>}
            <input {...register("username", {required: "Username is required"})} style={styles.input}/>
            {errors.username && <p style={styles.error}>{errors.username.message}</p>}
            <button type="button" onClick={() => clearErrors("firstName")} style={styles.button}>
                Clear First Name Errors
            </button>
            <button type="button" onClick={() => clearErrors(["firstName", "lastName"])} style={styles.button}>
                Clear First and Last Name Errors
            </button>
            <button type="button" onClick={() => clearErrors()} style={styles.button}>
                Clear All Errors
            </button>
            <input type="submit" style={{...styles.button, ...styles.submitButton}}/>
        </form>
    );
}


// single field errors
/*
type FormInputs = {
  lastName: string;
};

const SingleSetFieldErrors = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormInputs>({
    criteriaMode: 'all',
  });
  
  const onSubmit = (data: FormInputs) => console.log(data);
  
  React.useEffect(() => {
    setError("lastName", {
      types: {
        required: "This is required",
        minLength: "This is minLength"
      }
    });
  }, [setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Last Name</label>
      <input {...register("lastName")} />
      {errors.lastName && errors.lastName.types && (
        <p>{errors.lastName.types.required}</p>
      )}
      {errors.lastName && errors.lastName.types && (
        <p>{errors.lastName.types.minLength}</p>
      )}
      <input type="submit" />
    </form>
  );
};

*/

// Multiple errors

/*
import * as React from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  username: string;
  firstName: string;
};

const MulipleErrors = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Username</label>
      <input {...register("username")} />
      {errors.username && <p>{errors.username.message}</p>}
      <label>First Name</label>
      <input {...register("firstName")} />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      <button
        type="button"
        onClick={() => {
          [
            {
              type: "manual",
              name: "username",
              message: "Double Check This"
            },
            {
              type: "manual",
              name: "firstName",
              message: "Triple Check This"
            }
          ].forEach(({ name, type, message }) =>
            setError(name, { type, message })
          );
        }}
      >
        Trigger Name Errors
      </button>
      <input type="submit" />
    </form>
  );
};





*/
