class UserPolicy < ApplicationPolicy
  def show?
    true
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
