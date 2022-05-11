class Picture < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy

  validates :picture_comment, length: { maximum: 50 }
  validates :image, presence: true

  scope :recent, -> { order(id: :desc).limit(4) }

  def image_url
    "/pictures/image/#{self.id}.png"
  end
end
