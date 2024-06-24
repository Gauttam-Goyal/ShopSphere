Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  get "getUsers", to:'sessions#index'
  post 'checkUser', to: 'sessions#checkUser'
  get "getCategories", to: 'sessions#getCategories'
  get "getProducts/:category", to: 'products#getProducts'
  get "getProducts", to: 'products#getProducts'
  get "getProductDetails/:id", to: 'products#getProductDetails'
  post "add_to_cart", to: 'carts#add_to_cart'
  get "get_cart_items/:user_id", to:'carts#get_cart_items'
  post "remove_from_cart", to:'carts#remove_from_cart'
  post "add_to_favourite", to: 'favourites#add_to_favourite'
  get "get_favourite_items/:user_id", to:'favourites#get_favourite_items'
  post "remove_from_favourite", to:'favourites#remove_from_favourite'
  post "addUser", to:'sessions#addUser'
  post "decreaseCartQuantity", to:"carts#decreaseCartQuantity"
  # Defines the root path route ("/")
  # root "posts#index"
end
