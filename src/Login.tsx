import React from "react";
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
`;


export default function Login() {
    const [value, setValue] = React.useState<string>('');
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        setValue(email);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // do something

    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Input type="email" placeholder="enter email" value={value} onChange={handleEmail}/>
                <Input type="password" placeholder="enter password" value={value} onChange={handleEmail}/>
                <Button>Login</Button>
            </Form>
            {value}
        </>
    )
}
