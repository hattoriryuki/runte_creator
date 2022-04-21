class Picture < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy

  validates :picture_comment, length: { maximum: 50 }
  validates :image, presence: true

  scope :recent, -> { order(id: :desc).limit(3) }
end
