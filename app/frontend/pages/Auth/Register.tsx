import React from "react";
import { useForm, Link } from "@inertiajs/react";

export default function Register({
  flash,
  minimumPasswordLength,
  user_session_path, // from ziggy or manual pass
  new_user_password_path, // from ziggy or manual pass
  user_registration_path // from ziggy or manual pass
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    password_confirmation: ""
  });

  const submit = e => {
    e.preventDefault();
    post(user_registration_path || route("user_registration"), {
      onFinish: () => reset("password", "password_confirmation")
    });
  };

  return (
    <div className="login-container">
      {" "}
      {/* Re-using login-container styles */}
      <div className="login-card">
        {" "}
        {/* Re-using login-card styles */}
        <h2 className="login-title">Join Private Events!</h2>
        <p className="login-subtitle">
          Create an account to host or attend events.
        </p>
        <form onSubmit={submit} className="login-form">
          {" "}
          {/* Re-using login-form styles */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={e => setData("email", e.target.value)}
              autoFocus
              autoComplete="email"
              className={`form-input ${errors.email ? "is-invalid" : ""}`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
              {minimumPasswordLength && (
                <em> ({minimumPasswordLength} characters minimum)</em>
              )}
            </label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={e => setData("password", e.target.value)}
              autoComplete="new-password"
              className={`form-input ${errors.password ? "is-invalid" : ""}`}
              placeholder="••••••••"
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={e => setData("password_confirmation", e.target.value)}
              autoComplete="new-password"
              className={`form-input ${
                errors.password_confirmation ? "is-invalid" : ""
              }`}
              placeholder="••••••••"
            />
            {errors.password_confirmation && (
              <div className="error-message">
                {errors.password_confirmation}
              </div>
            )}
          </div>
          <div className="form-actions">
            <button
              type="submit"
              disabled={processing}
              className="btn btn-primary"
            >
              {processing ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        {flash && flash.notice && (
          <div className="flash-message flash-notice">{flash.notice}</div>
        )}
        {flash && flash.alert && (
          <div className="flash-message flash-alert">{flash.alert}</div>
        )}
        <div className="login-links">
          {/* Change "Sign up" link to "Log in" link */}
          <Link
            href={user_session_path || route("new_user_session")}
            className="link"
          >
            Already have an account? Log in
          </Link>
          <Link
            href={new_user_password_path || route("new_user_password")}
            className="link"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
