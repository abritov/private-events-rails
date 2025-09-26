import React from "react";
import { useForm, Link } from "@inertiajs/react";

// Destructure the new props
export default function Login({
  flash,
  user_session_path,
  new_user_registration_path,
  new_user_password_path
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember_me: false
  });

  const submit = e => {
    e.preventDefault();
    // Use the prop instead of the global route() helper
    post(user_session_path, {
      onFinish: () => reset("password")
    });
  };

  return (
    <div>
      <h2>Log in</h2>

      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={e => setData("email", e.target.value)}
            autoFocus
            autoComplete="email"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={e => setData("password", e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="field">
          <input
            type="checkbox"
            id="remember_me"
            checked={data.remember_me}
            onChange={e => setData("remember_me", e.target.checked)}
          />
          <label htmlFor="remember_me">Remember me</label>
        </div>

        <div className="actions">
          <button type="submit" disabled={processing}>
            Log in
          </button>
        </div>
      </form>

      {flash && flash.notice && (
        <div className="flash-notice">{flash.notice}</div>
      )}
      {flash && flash.alert && <div className="flash-alert">{flash.alert}</div>}

      {/* Devise shared links - use the props here too */}
      <p>
        <Link href={new_user_registration_path}>Sign up</Link>
        <br />
        <Link href={new_user_password_path}>Forgot your password?</Link>
      </p>
    </div>
  );
}
