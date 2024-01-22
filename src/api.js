import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore/lite";
import { Navigate, redirect } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIosSjJjyZuT1SyRBgCEpk5SdQKsOiwXA",
  authDomain: "vanlife-433b9.firebaseapp.com",
  projectId: "vanlife-433b9",
  storageBucket: "vanlife-433b9.appspot.com",
  messagingSenderId: "770863362363",
  appId: "1:770863362363:web:9fb46be0d4b233c2b3c71e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export const getVans = async () => {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log(dataArr);
  return dataArr;
};

export const getVan = async (id) => {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
};

export const getHostVans = async () => {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log(dataArr);
  return dataArr;
};

//Authentication config

export const loginUser = async ({ email, password }) => {
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const docRef = doc(db, "user", user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap;
  } catch (error) {
    console.log("error gotten", error);
  }
  return null;
};

export const signOutUser = () => {
  console.log("logging out");
  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      console.log("show");
      localStorage.removeItem("user");
      redirect("login");
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const signupUser = async ({ firstname, lastname, email, password }) => {
//   try {
//     const auth = getAuth(app);
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       firstname,
//       lastname,
//       email,
//       password
//     );
//     const user = userCredential.user;
//     await setDoc(doc(db, `user/${user.uid}`), {
//       firstname,
//       lastname,
//       email,
//       password,
//     });
//     localStorage.setItem(
//       "user",
//       JSON.stringify({ firstname, lastname, email })
//     );
//     return redirect("/host");
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

// if (docSnap.exists()) {
//   localStorage.setItem("user", JSON.stringify({ email }));
//   return redirect("/host");
// } else {
//   console.log("no such document here");
// }

// export const getVans = async (id) => {
//   const url = id ? `/api/vans/${id}` : "/api/vans";
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw {
//       message: "failed to fetch vans",
//       statusText: response.statusText,
//       status: response.status,
//     };
//   }
//   const { vans } = await response.json();
//   return vans;
// };

// export const getHostVans = async (id) => {
//   const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: response.statusText,
//       status: response.status,
//     };
//   }
//   const { vans } = await response.json();
//   return vans;
// };

// export const loginUser = async (creds) => {
//   const res = await fetch("/api/login", {
//     method: "post",
//     body: JSON.stringify(creds),
//   });
//   const data = await res.json();

//   if (!res.ok) {
//     throw {
//       message: data.message,
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   return data;
// };
