import React from "react";
import {
  Form,
  useLoaderData,
  useNavigation,
  useNavigate,
  redirect,
  useActionData,
  Link,
} from "react-router-dom";
import { loginUser } from "../api";
// import {auth} from "../api"

export const loader = ({ request }) => {
  return new URL(request.url).searchParams.get("message");
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  try {
    const data = await loginUser({ email, password });
    if (data.exists()) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          firstname: data.data().firstname,
          lastname: data.data().lastname,
          email: data.data().email,
        })
      );
      return redirect(pathname);
    } else {
      console.log("no such document here");
    }
    return null;
  } catch (err) {
    return err.message;
  }
};

export const Login = () => {
  const message = useLoaderData();
  console.log("gane", message);
  const errorMessage = useActionData();
  console.log("err", errorMessage);
  const navigation = useNavigation();

  //   const [loginFormData, setLoginFormData] = React.useState({
  //     email: "",
  //     password: "",
  //   });
  //   const [error, setError] = React.useState(null);
  //   const [status, setStatus] = React.useState("idle");
  //   const navigate = useNavigate();

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setStatus("submitting");
  //     setError(null);
  //     loginUser(loginFormData)
  //       .then((data) => navigate("/host", { replace: true }))
  //       .catch((err) => setError(err))
  //       .finally(() => setStatus("idle"));
  //   };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setLoginFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      <Form method="post" className="login-form" replace>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          //   value={loginFormData.email}
          //   onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          //   value={loginFormData.password}
          //   onChange={handleChange}
        />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
      <div className="acct-text">
        <p>
          Don't have an account <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};
