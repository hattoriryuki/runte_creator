class PicturesController < ApplicationController
  def index
    @pictures = Picture.all.order(created_at: :desc)
  end
end
