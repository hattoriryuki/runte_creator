Rails.application.routes.draw do
  root to: 'static_pages#top'
  resources :users, only: %i[new create show]
  resources :users, only: %i[new create]
  resources :pictures, only: %i[index]
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'

  post 'oauth/callback', to: 'oauths#callback'
  get 'oauth/callback', to: 'oauths#callback'
  get 'oauth/:provider', to: 'oauths#oauth', as: :auth_at_provider
end
