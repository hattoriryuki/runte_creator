Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  root to: 'static_pages#top'

  resources :users, only: %i[new create show]
  resource :profile, only: %i[show edit update]
  resources :pictures, only: %i[new create index show] do
    resources :likes, only: %i[create]
    collection do
      get :likes
    end
    resources :comments, only: %i[create destroy update]
  end
  resources :likes, only: %i[create destroy]
  resources :password_resets, only: %i[new create edit update]

  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'

  post 'guest', to: 'user_sessions#guest_login'

  post 'oauth/callback', to: 'oauths#callback'
  get 'oauth/callback', to: 'oauths#callback'
  get 'oauth/:provider', to: 'oauths#oauth', as: :auth_at_provider
end
