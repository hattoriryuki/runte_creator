class StaticPagesController < ApplicationController
  before_action :loading_image
  
  def top
    @pictures = Picture.recent
  end
end
