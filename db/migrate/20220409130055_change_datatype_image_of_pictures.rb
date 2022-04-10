class ChangeDatatypeImageOfPictures < ActiveRecord::Migration[6.1]
  def change
    change_column :pictures, :image, :text
  end
end
