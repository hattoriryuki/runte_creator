class LikesController < ApplicationController
  def create
    @picture = Picture.find(params[:picture_id])
    current_user.like(@picture)
  end

  def destroy
    @picture = current_user.likes.find(params[:id]).picture
    current_user.unlike(@picture)
  end
end
