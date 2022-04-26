class User < ApplicationRecord
  enum role: { general: 0, admin: 1, guest: 2 }
  authenticates_with_sorcery!
  mount_uploader :avatar, AvatarUploader

  has_many :pictures, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :like_pictures, through: :likes, source: :picture

  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
  validates :reset_password_token, uniqueness: true, allow_nil: true

  validates :email, uniqueness: true, presence: true
  validates :name, presence: true, length: { minimum: 2, maximum: 15 }

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

  def self.guest_login
    find_or_create_by!(email: 'guest@example.com') do |user|
      user.name = 'guest_user'
      user.password = SecureRandom.urlsafe_base64
      user.password_confirmation = user.password
      user.role = 'guest'
    end
  end
end
