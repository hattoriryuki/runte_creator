class PicturesController < ApplicationController
  def new
    @picture = Picture.new
  end

  def create
    @picture = Picture.new(image: params[:picture])
    @picture.save
  end

  def index
    @pictures = Picture.all
  end
end
