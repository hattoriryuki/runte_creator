class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :pictures, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :like_pictures, through: :likes, source: :picture

  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  validates :email, uniqueness: true, presence: true
  validates :name, presence: true, length: { minimum: 2, maximum: 15 }

  mount_uploader :avatar, AvatarUploader

  def own?(object)
    id == object.user_id
  end

  def like(picture)
    like_pictures << picture
  end

  def unlike(picture)
    like_pictures.destroy(picture)
  end

  def like?(picture)
    like_pictures.include?(picture)
  end
end
