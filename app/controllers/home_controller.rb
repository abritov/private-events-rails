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
end
