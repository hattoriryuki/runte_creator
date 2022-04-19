class LikesController < ApplicationController
  def create
    picture = Picture.find(params[:picture_id])
    current_user.like(picture)
    redirect_back fallback_location: root_path, success: t('.success')
  end
end
