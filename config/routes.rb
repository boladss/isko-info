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
  

  get "/reghelper", to: "pages#reghelper"

  # Department of Computer Science
  get "/deptcs", to: "pages#deptcs"
  get "/CS11", to: "pages#CS11"
  get "/CS12", to: "pages#CS12"

  # Department of Art Studies
  get "/deptart", to: "pages#deptart"
  get "/AS50", to: "pages#AS50"

  # Department of Filipino and Philippine Literature
  get "/deptfpl", to: "pages#deptfpl"
  get "/FIL40", to: "pages#FIL40"

  get "/appeal_success", to: "pages#appeal_success"

  get '/dept_profile', to: "course_policies#index"
  get '/course_policies/:id/edit', to: "course_policies#edit", as: :edit_course_policy 
  get '/course_policies/:id', to: "course_policies#show", as: :course_policy
  patch '/course_policies/:id', to: "course_policies#update" 
  
  post "/home", to: "pages#home"
  post '/logindept', to: "pages#logindept"
  post '/loginstudent', to: "pages#loginstudent"
  post '/logout', to: "pages#logout"
  post '/signup', to: "pages#signup"
  post '/profilepage', to: "pages#profilepage"
  
end
