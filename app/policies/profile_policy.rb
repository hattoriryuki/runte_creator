class ProfilePolicy < ApplicationPolicy
  def show?
    user.general? || user.admin?
  end

  def edit?
    update?
  end

  def update?
    user.general? || user.admin?
  end
end
