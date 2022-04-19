class UserPolicy < ApplicationPolicy
  def show?
    user.general?
  end

  def new?
    true
  end

  def create?
    true
  end

  def destroy?
    true
  end

  def guest_login?
    true
  end
end
