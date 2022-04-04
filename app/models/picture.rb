class Picture < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy

  validates :picture_comment, length: { maximum: 50 }
  validates :image, presence: true
end
