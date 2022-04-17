Rails.application.routes.draw do
  root to: 'static_pages#top'
  resources :users, only: %i[new create show]
  resources :users, only: %i[new create]
  resources :pictures, only: %i[index]

  post 'guest', to: 'user_sessions#guest_login'
  
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'
end
