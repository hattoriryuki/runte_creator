class UserSessionsController < ApplicationController
  def new; end

  def create
    @user = login(params[:email], params[:password])
    if @user
      redirect_back_or_to root_path, notice: 'login was successed.'
    else
      render :new
    end
  end

  def destroy
    logout
    redirect_to root_path, notice: 'logout was successed.'
  end
end
