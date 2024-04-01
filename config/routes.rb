Rails.application.routes.draw do
  
  # NOTE FOR DEVELOPERS:
  # get - just retrieves data (i.e., any "normal" page link)
  # post - sends data to server for processing (i.e., submitting filled forms)
  
  # TL;DR: Only use post when necessary, not for linking.

  root to: "pages#main"
  get '/', to: "pages#main"
  get '/signup', to: "pages#signup"
  get "/home", to: "pages#home"
  get "/masterlist", to: "pages#masterlist"
  get '/logindept', to: "pages#logindept"
  get '/loginstudent', to: "pages#loginstudent"
  get '/profilepage', to: "pages#profilepage"
  
  post "/home", to: "pages#home" # ideally, isn't used -- refreshing causes form resubmission
  post '/logindept', to: "pages#logindept"
  post '/loginstudent', to: "pages#loginstudent"
  post '/logout', to: "pages#logout"
  post '/signup', to: "pages#signup"
  post '/profilepage', to: "pages#profilepage"
  
end
