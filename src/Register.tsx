import React from "react";
import getFirebase from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";

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

export default function Register() {
  const firebase = getFirebase();
  const auth = getAuth();
  const [email, setEmail] = React.useState<string>("test@gmail.com");
  const [pass, setPass] = React.useState<string>(Math.random().toString(36).substring(2));

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // stop the form from redirection [default form element behaviour]
    event.preventDefault();
    // take the email and password the use firebase api
    try {
      if (firebase && email.length && pass.length) {
        const registeredUser = await createUserWithEmailAndPassword(auth, email, pass);
        console.log(`registered: `, registeredUser.user);
        setEmail("");
        setPass("");
      }
    } catch (error: any) {
      console.log("registration error", error.code, error.message);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input type="email" placeholder="enter email" value={email} onChange={handleEmail} />
        <Input type="password" placeholder="enter password" value={pass} onChange={handlePass} />
        <Button>Register</Button>
      </Form>
    </>
  );
}
