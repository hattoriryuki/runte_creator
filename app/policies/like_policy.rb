class LikePolicy < ApplicationPolicy
  def create?
    user.general? || user.admin?
  end
end
