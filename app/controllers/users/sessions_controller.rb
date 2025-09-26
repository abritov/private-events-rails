class Users::SessionsController < Devise::SessionsController
  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?

    if request.inertia?
      render inertia: "Auth/Login", props: {
        flash: { notice: flash[:notice], alert: flash[:alert] }
      }
    else
      respond_with resource, location: after_sign_in_path_for(resource)
    end
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?

    if request.inertia?
      render inertia: "Auth/Login", props: {
        flash: { notice: flash[:notice], alert: flash[:alert] }
      }
    else
      respond_with_navigational(signed_out: signed_out) do
        redirect_to after_sign_out_path_for(resource_name)
      end
    end
  end
end
