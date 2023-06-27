import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

// React stuff
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getFirebase from "./firebase";
import { getAuth } from "firebase/auth";

export default function BuiltInFirebaseUI() {
  const firebaseApp = getFirebase(); // firebase instance
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(getAuth(firebaseApp));

    ui.start("#firebaseui-auth-container", {
      callbacks: {
        uiShown: function () {
          // This is what should happen when the form is full loaded. In this example, I hide the loader element.
          document.getElementById("loader")!.style.display = "none";
        },
      },
      // Below is the url where should redirect if the sign in is successful.
      signInSuccessUrl: "/profile",
      signInOptions: [
        // This array contains all the ways an user can authenticate in your application. For this example, is only by email.
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true,
          disableSignUp: {
            status: true,
          },
        },
      ],
      tosUrl: "https://www.youtube.com/static?template=terms", // URL to you terms and conditions.
      privacyPolicyUrl: function () {
        // URL to your privacy policy
        window.location.assign(
          "https://www.youtube.com/intl/ALL_in/howyoutubeworks/our-commitments/protecting-user-data/"
        );
      },
    });
  }, [firebaseApp]);

  return (
    <>
      <h1 className="text-center my-3 title">Login Page</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader" className="text-center">
        Loading form
      </div>
    </>
  );
}
