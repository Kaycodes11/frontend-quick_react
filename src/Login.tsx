import React from "react";
import {getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
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
    const auth = getAuth();
    const [email, setEmail] = React.useState<string>('');
    const [pass, setPass] = React.useState<string>('');

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    };

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const loggedOut = await signOut(auth);
            console.log(`loggedOut: `, loggedOut);
        } catch (error: any) {
            console.error("logout_error: ", error.message)
        }
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

    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Input autoFocus={true} type="email" placeholder="enter email" value={email} onChange={handleEmail}/>
                <Input type="password" placeholder="enter password" value={pass} onChange={handlePass}/>
                <Button>Login</Button>
            </Form>
            <button onClick={handleLogout}>Sign Out</button>
        </>
    )
};
