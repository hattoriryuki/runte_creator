class LikesController < ApplicationController
  before_action :set_picture, only: [:create]
  def create
    @like = Like.create(user_id: current_user.id, picture_id: params[:picture_id])
  end

  private

  def set_picture
    @picture = Picture.find(params[:picture_id])
  end
end
