class LikesController < ApplicationController
  def create
    picture = Picture.find(params[:picture_id])
    current_user.like(picture)
    redirect_back fallback_location: root_path, notice: t('.success')
    @like_count = Like.where(picture_id: params[:picture_id]).count
  end

  def destroy
    picture = current_user.likes.find(params[:id]).picture
    current_user.unlike(picture)
    redirect_back fallback_location: root_path, notice: t('.success')
    @like_count = Like.where(picture_id: params[:picture_id]).count
  end
end
