import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCIosSjJjyZuT1SyRBgCEpk5SdQKsOiwXA",
  authDomain: "vanlife-433b9.firebaseapp.com",
  projectId: "vanlife-433b9",
  storageBucket: "vanlife-433b9.appspot.com",
  messagingSenderId: "770863362363",
  appId: "1:770863362363:web:9fb46be0d4b233c2b3c71e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const loader = async () => {};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");
  const password = formData.get("password");
  const birthdate = formData.get("birthdate");
  const phonenumber = formData.get("phonenumber");
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      firstname,
      lastname,
      birthdate,
      phonenumber
    );
    const user = userCredential.user;
    const documentPathForUser = doc(db, `users/${user.uid}`);
    await setDoc(documentPathForUser, {
      firstname,
      lastname,
      email,
    //   password,
      phonenumber,
      birthdate,
    });
    console.log("list of userInput", user);
    localStorage.setItem(
      "user",
      JSON.stringify({ firstname, lastname, email })
    );
    return redirect("/host");
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Signup = () => {
  const navigation = useNavigate();
  return (
    <>
      <div className="login-container">
        <h1>Sign up to create an account</h1>
        <Form method="post" className="signup-form" replace>
          <input name="firstname" type="text" placeholder="First name" />
          <input name="lastname" type="text" placeholder="Last name" />
          <input name="birthdate" type="date" />
          <input name="phonenumber" type="text" placeholder="+234 805 068 9393" />
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? "Signing in..." : "Sign in"}
          </button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
