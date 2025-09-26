import React from "react";
import { useForm, Link } from "@inertiajs/react";

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
    post(user_session_path || route("user_session"), {
      // Use prop or global route()
      onFinish: () => reset("password")
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Sign in to manage your private events.</p>

        <form onSubmit={submit} className="login-form">
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={e => setData("password", e.target.value)}
              autoComplete="current-password"
              className={`form-input ${errors.password ? "is-invalid" : ""}`}
              placeholder="••••••••"
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="form-group form-group--checkbox">
            <input
              type="checkbox"
              id="remember_me"
              checked={data.remember_me}
              onChange={e => setData("remember_me", e.target.checked)}
              className="form-checkbox"
            />
            <label htmlFor="remember_me" className="form-checkbox-label">
              Remember me
            </label>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={processing}
              className="btn btn-primary"
            >
              {processing ? "Logging in..." : "Log In"}
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
          <Link
            href={new_user_registration_path || route("new_user_registration")}
            className="link"
          >
            Create an account
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
