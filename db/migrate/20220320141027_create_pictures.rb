class CreatePictures < ActiveRecord::Migration[6.1]
  def change
    create_table :pictures do |t|
      t.references :user, null: false, foreign_key: true
      t.string :picture_comment
      t.string :image, null: false

      t.timestamps
    end
  end
end
