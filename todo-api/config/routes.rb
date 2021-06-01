Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #resources :reports

  root to: 'todos#index'
  resources :todos
  post '/rails/active_storage/direct_uploads' => 'direct_uploads#create'
  #get "/private", to: "private#private"
end
