class Picture < ApplicationRecord
  belongs_to :user

  validates :picture_comment, length: { maximum: 50 }
  validates :image, presence: true
end
