class User < ApplicationRecord
  enum role: { general: 0, admin: 1, guest: 2 }
  authenticates_with_sorcery!
  mount_uploader :avatar, AvatarUploader

  has_many :pictures, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  validates :email, uniqueness: true, presence: true
  validates :name, presence: true, length: { minimum: 2, maximum: 15 }

  def self.guest_login
    find_or_create_by!(email: 'guest@example.com') do |user|
      user.name = 'guest_user'
      user.password = SecureRandom.urlsafe_base64
      user.password_confirmation = user.password
      user.role = 'guest'
    end
  end
end
