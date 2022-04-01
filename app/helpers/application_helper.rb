module ApplicationHelper
  def flash_class(type)
    { danger: 'red', notice: 'green' }.fetch(type.to_sym)
  end
end
