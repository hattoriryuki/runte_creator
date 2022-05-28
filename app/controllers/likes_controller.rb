class LikesController < ApplicationController
  def create
    @picture = Picture.find(params[:picture_id])
    current_user.like(@picture)
  end
end
