class StaticPagesController < ApplicationController
  def top
    @pictures = Picture.recent
  end
end
