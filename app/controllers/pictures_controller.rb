class PicturesController < ApplicationController
  def new
    @picture = Picture.new
  end

  def create
    @picture = Picture.new(image: params[:picture], user_id: current_user.id)
    @picture.save
  end

  def index
    @pictures = Picture.all
  end
end
