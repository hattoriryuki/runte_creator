class LikesController < ApplicationController
  def create
    @picture = Picture.find(params[:picture_id])
    authorize(@picture, policy_class: LikePolicy)
    current_user.like(@picture)
  end
end
