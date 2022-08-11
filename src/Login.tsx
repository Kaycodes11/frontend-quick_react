import React from "react";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import getFirebase from "./firebase";


// container mainly provides the total width, height, padding, margin etc.
const Form = styled.form`
  width: 55%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  gap: 20px;
  //background-color: seagreen;
`;

// now how much width/height the child element takes from container's "total width or height" upto itself like here
const Input = styled.input`
  width: 60%;
  height: 50px;
`;

const Button = styled.button`
  width: 60%;
  height: 50px;
  background-color: black;
  color: white;
  cursor: pointer;
`;


export default function Login() {
    const firebase = getFirebase();
    const navigate = useNavigate();
    const auth = getAuth();
    const [email, setEmail] = React.useState<string>('ff@gmail.com');
    const [pass, setPass] = React.useState<string>('');
    const [user, setUser] = React.useState<string | null>(null);

    // without dependency, any sort of interaction done on `Login` component will run below code
    React.useEffect(() => {
        // for now every time `Login` component render/render get the current user
        // later this could be improved by using context
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // all the data that's needed will be within this user
                setUser(user.email);
                // when navigating to auth if user exist then send to profile route
                navigate('/profile', {replace: true});

            } else {
                setUser(null);
            }
        })
    });

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (firebase && email.length && pass.length) {
                const loggedIn = await signInWithEmailAndPassword(auth, email, pass);
                console.log(`loggedIn: `, loggedIn.user);
            }
        } catch (error) {
            console.log('registration error', error);
        }

    };
    const handleLogout  = async () => {
        try {
            await signOut(auth);
        } catch ( error: any) {
            console.log(`logoutError`, error.message)
        }
    }
    return (
        <>
            <h2>The authenticated user is : {String(user)}</h2>
            <Form onSubmit={handleSubmit}>
                <Input autoFocus={true} type="email" placeholder="enter email" value={email} onChange={handleEmail}/>
                <Input type="password" placeholder="enter password" value={pass} onChange={handlePass}/>
                <Button>Login</Button>
            </Form>
            {user && <button onClick={handleLogout}>logout</button>}
        </>
    )
};

