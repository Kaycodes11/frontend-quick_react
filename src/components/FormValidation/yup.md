# https://dev.to/gimnathperera/yup-vs-zod-vs-joi-a-comprehensive-comparison-of-javascript-validation-libraries-4mhi

```javascript

const [errors, setErrors] = React.useState({});

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    mobile: Yup.string().matches(/^\d{10}$/, "mobile no. must be ten digits"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters").matches(/[!@#$%^&(),.?":{}<>]/, "Password must contain at leas one symbol")
        .matches(/[0-9]/, "Password must containt at least one digit")
        .matches(/[A-Z]/, "Password must contain one uppercase letter")
        .matches(/[a-z]/, "Password must contain one lowercase letter"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password must match").required("Confirm password is required"),
    age: Yup.string().typeError("Age must be a nunber").min(18, "You must be 18 years old").max(100, "You cannot be older than 100 years"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array().min(1, "Select at least one interest").required("You must select at least one interest"),
    birthDate: Yup.date().required("Date of birth is required")
});


// now I can do single validation for a field or all at once when submitting

const handleSubmit = async () => {
    
    // raw data from form
    const nonParsed = {
        firstName: "Jenas",
        lastName: "Johnson",
        email: "jenas11@gmail.com",
        mobile: "8670364540",
        password: "1234564@Qa",
        confirmPassword: "1234564@Qa",
        age: "18",
        gender: "male",
        interests: ["programming", "painting"],
        birthDate: "1994-06-04"
    }

    const parsedUser = validationSchema.cast(nonParsed, parsedUser);
    
    try {
        toggleLoading(true);
        // abortEarly : true, as soon as it encounters the first validation error, it stops execution (and throw error so as a result it will go to cacth block with `First Error`) but to see all validation errors use {abortEarly: false}
        await validationSchema.validate(formData, {abortEarly: false});
        toggleLoading(false);
        // may redirect to another page or whatever
        console.log("form validation is successful", formData);
    } catch (e) {
        toggleLoading(false);
        setErrors(e);
    } finally {
        
        // do something: regardless of success of fail (e.g. reset)
    }
}

```

```html

<div>
    <label>First Name</label>
    <input type="text" name="firstName" value={formData.firstName} placeholder="Enter your first name" onchange={handleChange} />
    {errors.firstName && <div class="error">{errors.firstName}</div>
</div>

<div>
    <label>Last Name</label>
    <input type="text" name="LastName" value={formData.lastName} placeholder="Enter your last name" onchange={handleChange} />
    {errors.lastName && <div class="error">{errors.lastName}</div>
</div>

```

