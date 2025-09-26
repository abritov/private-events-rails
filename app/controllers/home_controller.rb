class HomeController < ApplicationController
  def index
    render inertia: "Home/Index"
  end

  def login
    # render inertia: "Auth/Login"
    render inertia: "Auth/Login", props: {
      user_session_path: user_session_path,
      new_user_registration_path: new_user_registration_path,
      new_user_password_path: new_user_password_path
    }
  end

  def register
    render inertia: "Auth/Register", props: {
      minimumPasswordLength: User.password_length.first,
      user_session_path: user_session_path,
      new_user_password_path: new_user_password_path,
      user_registration_path: user_registration_path
    }
  end
end
