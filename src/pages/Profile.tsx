import React from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import styled from "styled-components";

const ProfileContainer = styled.div`
  height: 100vh;
  text: white;
  position: relative;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: lightgreen;
    font-weight: bold;
  }

  &:disabled {
    background-color: gray;
    text-color: black;
  }
`;

// set user's email, password, verification mail, password rest, deleting user, re-authenticate
// https://firebase.google.com/docs/auth/web/manage-users (just take a look at apis from here as needed)
function Profile() {
  const auth = getAuth(); // don't use auth.currentUser to authenticate rather use the getToken method
  const [updatedUser, setUpdatedUser] = React.useState<typeof auth.currentUser | null>(
    auth.currentUser
  );
  const [btnName, setBtnName] = React.useState<any | null>({
    name: `btn-${Math.random().toString().substring(2, 6)}`,
  });

  React.useEffect(() => {
    // console.log("NAME", updatedUser); // for some reason updateProfile updateUser becoomes undefined

    // save the current user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUpdatedUser(user); // all the data that's needed will be within this user
      } else {
        console.log("No user is signed in");
        // navigate("/auth", { replace: true });
      }
    });
  }, [auth, updatedUser]);

  const updateUserProfile = () => {
    updatedUser?.uid &&
      updateProfile(auth.currentUser!, { displayName: "John" })
        .then((user) => {
          setUpdatedUser(user!);
        })
        .catch((error) => {
          console.log(error.message);
        });
  };

  const handleButton = async () => {
    const sleep = await Promise.resolve(`btn-${Math.random().toString().substring(2, 6)}`);
    setBtnName({ name: sleep }); // don't setBtnName(sleep)
  };

  return (
    <ProfileContainer>
      <span style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
        Name: {updatedUser?.displayName} - Email: {updatedUser?.email}
      </span>
      <hr />
      <Button onClick={updateUserProfile}>Update username</Button>
      <hr />
      <Button onClick={handleButton}>incrementAsync</Button>
      <hr />
      {JSON.stringify(btnName)}
      <hr />
      <p>{btnName.name}</p>
    </ProfileContainer>
  );
}

export default Profile;
