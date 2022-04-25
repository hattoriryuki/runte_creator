Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  root to: 'static_pages#top'

  resources :users, only: %i[new create show]
  resources :pictures, only: %i[new create index show]
  resource :profile, only: %i[show edit update]

  resources :pictures, only: %i[new create index]
  resources :password_resets, only: %i[new create edit update]
  
  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'
end
