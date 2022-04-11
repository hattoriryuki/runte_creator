class PicturesController < ApplicationController
  def index
    @pictures = Picture.all.includes(:user).order(created_at: :desc)
  end
end
