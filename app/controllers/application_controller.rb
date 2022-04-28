class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :render_403
  add_flash_types :success, :danger

  def render_403
    render file: Rails.root.join('public/403.html'), status: :forbidden, layout: false, content_type: 'text/html'
  end

  def not_authenticated
    redirect_to main_app.login_path, danger: t('defaults.message.require_login')
  end
end
