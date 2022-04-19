class PicturesController < ApplicationController
  def new
    @picture = Picture.new
  end

  def create
    picture = current_user.pictures.build(picture_params)
    if picture.save
      flash[:notice] = t('.success')
    else
      render :new
    end
  end

  def index
    @pictures = Picture.all.includes(:user).order(created_at: :desc)
  end

  def likes
    @like_pictures = current_user.like_pictures.include(:user).order(created_at: :desc)
  end

  private

  def picture_params
    params.require(:picture).permit(:image, :picture_comment, :user)
  end
end
