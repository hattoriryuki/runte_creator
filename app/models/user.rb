class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :pictures, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  validates :email, uniqueness: true, presence: true
  validates :name, presence: true, length: { minimum: 2, maximum: 15 }

  def own?(object)
    id == object.user_id
  end
end
