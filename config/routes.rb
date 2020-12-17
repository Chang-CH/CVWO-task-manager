Rails.application.routes.draw do
  get 'tasks/index'
  get 'tasks/update'
  get 'tasks/destroy'
  get 'tasks/create'
  
  get 'categories/index'
  get 'categories/update'
  get 'categories/destroy'
  get 'categories/create'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api/1.0' do
    resources :categories, :tasks
  end
end
