Rails.application.routes.draw do
  
  root to: "pages#main"
  get '/', to: "pages#main"
  get '/signup', to: "pages#signup"
  get "home", to: "pages#home"
  get '/logindept', to: "pages#logindept"
  get '/loginstudent', to: "pages#loginstudent"
  
  post '/logindept', to: "pages#logindept"
  post '/loginstudent', to: "pages#loginstudent"
  post '/logout', to: "pages#logout"
  post '/signup', to: "pages#signup"
  
end
