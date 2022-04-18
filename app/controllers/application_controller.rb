class ApplicationController < ActionController::Base
  add_flash_types :success, :danger

  def not_authenticated
    redirect_to login_path, danger: t('defaults.message.require_login')
  end
end
