class UserSessionsController < ApplicationController
  def new; end

  def create
    @user = login(params[:email], params[:password])
    if @user
      redirect_back_or_to root_path, notice: t('.success')
    else
      flash.now[:danger] = t('.fail')
      render :new
    end
  end

  def destroy
    logout
    redirect_to root_path, notice: t('.success')
  end

  def guest_login
    @user = User.guest_login
    auto_login(@user)
    redirect_to root_path, notice: t('.success')
  end
end
