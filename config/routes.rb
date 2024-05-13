Rails.application.routes.draw do
  
  # NOTE FOR DEVELOPERS:
  # get - just retrieves data (i.e., any "normal" page link)
  # post - sends data to server for processing (i.e., submitting filled forms)
  
  # TL;DR: Only use post when necessary, not for linking.

  root to: "pages#main"
  get '/', to: "pages#main"
  get '/signup', to: "pages#get_signup"
  get "/home", to: "pages#home"
  get "/masterlist", to: "pages#masterlist"
  get '/loginstudent', to: "pages#loginstudent"
  get '/profilepage', to: "pages#profilepage"
  


  # Department routes
  get '/deptprofilepage', to: "pages#deptprofilepage"
  get '/logindept', to: "pages#get_logindept"
  post '/logindept', to: "pages#logindept"


  # College of Engineering
  get "/coe", to: "pages#coe" 
    # Department of Computer Science
    get "/deptcs", to: "pages#deptcs"
    get "/CS11", to: "pages#CS11"
    get "/CS12", to: "pages#CS12"

  # College of Arts and Letters
  get "/cal", to: "pages#cal"
  # Department of Art Studies
  get "/deptart", to: "pages#deptart"
  get "/AS50", to: "pages#AS50"

  # Department of Filipino and Philippine Literature
  get "/deptfpl", to: "pages#deptfpl"
  get "/FIL40", to: "pages#FIL40"

  get "/appeal_success", to: "pages#appeal_success"

  get '/dept_profile', to: "course_policies#index"
  
  get 'department/:id/course_policies/new', to: "course_policies#new", as: :new_course_policy
  post 'department/:id/course_policies', to:"course_policies#create", as: :course_policies
  get '/course_policies/:id/edit', to: "course_policies#edit", as: :edit_course_policy 
  get '/course_policies/:id', to: "course_policies#show", as: :course_policy
  patch '/course_policies/:id', to: "course_policies#update"
  delete '/course_policies/:id', to: "course_policies#destroy"
  
  get '/dept_list', to: "departments#index"
  get '/departments/:id', to: "departments#show", as: :department
  get '/departments/:id/edit', to: "departments#edit", as: :edit_department
  get '/departments/:id/course_policies', to: "departments#show_course_policies", as: :all_course_policies
  patch '/departments/:id', to: "departments#update"
  
  get '/reghelper', to: "university_colleges#index"
  get '/university_colleges/:id', to: "university_colleges#show", as: :university_college
  get '/university_colleges/departments/:id', to: "departments#reghelper_show", as: :department_reghelper
  get '/university_colleges/course_policies/:id', to: "course_policies#reghelper_show", as: :course_policy_reghelper


  post "/home", to: "pages#home"
  post '/loginstudent', to: "pages#loginstudent"
  post '/logout', to: "pages#logout"
  post '/signup', to: "pages#signup"
  post '/profilepage', to: "pages#profilepage"
  post '/university_colleges/course_policies/:id/appeals', to: "appeals#create", as: :appeals

  get '/userpreferences', to: "pages#userpreferences"

  # Databse connection error
  get '/errorpage', to: "pages#errorpage"
  #get '/errorpage', to: 'errors#database_connection_error'
end
 