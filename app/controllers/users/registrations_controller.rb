class Users::RegistrationsController < ApplicationController
# POST /resource
  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        if request.inertia?
          # Redirect to root or a dashboard after successful signup
          redirect_to root_path, notice: flash[:notice]
        else
          respond_with resource, location: after_sign_up_path_for(resource)
        end
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        if request.inertia?
          # Redirect to login page or a message page
          redirect_to login_page_path, notice: flash[:notice]
        else
          respond_with resource, location: after_inactive_sign_up_path_for(resource)
        end
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      if request.inertia?
        # Re-render the signup form with errors
        render inertia: "Auth/Register", props: {
          errors: resource.errors.as_json, # Pass errors explicitly
          minimumPasswordLength: @minimum_password_length,
          user_session_path: user_session_path,
          new_user_password_path: new_user_password_path,
          user_registration_path: user_registration_path,
          flash: { alert: flash[:alert] } # Include any general alerts
        }, status: :unprocessable_entity # Important for Inertia error handling
      else
        respond_with resource
      end
    end
  end

  # GET /resource/sign_up
  def new
    super do |resource|
      if request.inertia?
        render inertia: "Auth/Register", props: {
          minimumPasswordLength: @minimum_password_length,
          user_session_path: user_session_path,
          new_user_password_path: new_user_password_path,
          user_registration_path: user_registration_path,
          flash: { notice: flash[:notice], alert: flash[:alert] }
        } and return
      end
    end
  end
end
