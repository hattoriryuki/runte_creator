class StaticPagesController < ApplicationController
  def top
    @pictures = Picture.last(3)
  end
end
