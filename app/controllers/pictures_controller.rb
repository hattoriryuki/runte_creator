class PicturesController < ApplicationController
  def new
    @picture = Picture.new
  end

  def create
    @picture = current_user.pictures.build(picture_params)
    @picture.save
  end

  def index
    @pictures = Picture.all
  end

  private

  def picture_params
    params.require(:picture).permit(:image, :picture_comment, :user)
  end
end
