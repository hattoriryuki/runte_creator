class CommentsController < ApplicationController
  def create
    @comment = current_user.comments.new(comment_params)
    @comment.save
  end

  private

  def comment_params
    params.require(:comment).permit(:body).merge(picture_id: params[:picture_id])
  end
end
