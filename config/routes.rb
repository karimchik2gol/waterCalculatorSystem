Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  get 'main/index'
  get 'main/cabinet'
  post 'main/create', as: 'main_create'
  post 'create_history', to: 'main#create_history'

  get 'registration', to: 'main#registration', as: "registration"

  root to: 'main#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
