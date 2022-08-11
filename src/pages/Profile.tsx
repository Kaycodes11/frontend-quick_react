import React from "react";
import {getAuth, updateProfile} from "firebase/auth";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 80vh;
  padding: 25px;
  display: flex;
  justify-content: center;
  gap: 10px;
  background-color: seagreen;
`;

const Text = styled.text`
  width: 50%;
  display: flex;
  font-size: 45px;
  align-self: center;
`;

const Paragraph = styled.p`
  width: 100%;
  margin-right: 45px;
  font-size: 45px;
  align-self: center;
`;

const Img = styled.img`
  background-color: #61dafb;
  object-fit: cover;
`;

// set user's email, password, verification mail, password rest, deleting user, re-authenticate
// https://firebase.google.com/docs/auth/web/manage-users
function Profile() {
    const [, setUpdatedUser] = React.useState<null | any>(null)
    const user = getAuth().currentUser;

    const updateUserProfile = () => {
        user && updateProfile(user, {displayName: "Jones"})
            .then(user => {
                setUpdatedUser(user)
            }).catch(error => {
                console.log(error.message)
            })
    }

    return (
        <Wrapper>
            <Text>Name: {user?.displayName || "untitled"}</Text>
            <Paragraph>Email: {user?.email}</Paragraph>
            <Img src='https://bit.ly/3vWl00z' alt={"portrait"}/>
            <button style={{cursor: "pointer"}} onClick={updateUserProfile}>update profile</button>

        </Wrapper>
    )
}

export default Profile;
