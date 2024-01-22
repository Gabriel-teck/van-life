import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const user = localStorage.getItem("user");

  if (!user) {
    const response = redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
    // response.body = true;
    return response;
  }

  const userObj = JSON.parse(user);
  return null;
}

// `/login?message=You must log in first.&redirectTo=${pathname}`;
