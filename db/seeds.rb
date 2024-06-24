# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# user = User.new(email: 'test2@example.com', password: 'new_password2')
# user.password_digest = BCrypt::Password.create(user.password)
# user.save
# Category.create(name: "Tshirts")
# Category.create(name: "Shirts")
# Category.create(name: "Pants")
5.times do
    Product.create(
      name: Faker::Commerce.product_name,
      price: Faker::Commerce.price,
      description: Faker::Lorem.sentence,
      category_id: 3
    )
end
10.times do
    Product.create(
      name: Faker::Commerce.product_name,
      price: Faker::Commerce.price,
      description: Faker::Lorem.sentence,
      category_id: 1
    )
end
10.times do
    Product.create(
      name: Faker::Commerce.product_name,
      price: Faker::Commerce.price,
      description: Faker::Lorem.sentence,
      category_id: 2
    )
end