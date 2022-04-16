class PicturesController < ApplicationController
  def new
    @picture = Picture.new
  end

  def create
    @picture = Picture.new(image: params[:picture], user_id: current_user.id, picture_comment: params[:comment])
    @picture.save
  end

  def index
    @pictures = Picture.all.includes(:user).order(created_at: :desc)
  end

  def show
    @picture = Picture.find(params[:id])
  end
end
