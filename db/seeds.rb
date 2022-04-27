# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
5.times do |n|
  User.create!(
    name: "テストユーザー#{n + 1}", 
    email: "testuser#{n + 1}@example.com",
    password: 'password',
    password_confirmation: 'password'
  )
end

20.times do |index|
  Picture.create(
    user: User.offset(rand(User.count)).first,
    picture_comment: "テストコメント#{index}",
    image: open("./app/assets/images/600x360.png")
  )
end

User.create(
  name: "管理者ユーザー", 
  email: "admin@example.com",
  password: 'password',
  password_confirmation: 'password',
  role: 'admin'
)
