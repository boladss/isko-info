require 'net/http'
require 'uri'
require 'json'
require 'firebase'

class PagesController < ApplicationController

    before_action :set_user_data, only: %i[signup loginstudent logindept get_signup get_logindept]
    before_action :authenticate_user, except: %i[main signup loginstudent logindept errorpage get_signup get_logindept]    # makes sure na hindi makakapasok sa home page unless logged - in

    def main
    end

    def get_signup
        render '/pages/signup'
    end

    def get_logindept
        render '/pages/logindept'
    end

    def userpreferences
        if session[:type] = "student"
            @user = User.find(session[:user_id])
        else
            @department = Department.find_by(code: session[:code])
        end
    end

    def signup
        begin
            session[:type] == "student"
            password_confirmation = params[:password_confirmation]
            username = params[:username]
            email = params[:email]
            password = params[:password]
            firebase_url = "https://isko-info-default-rtdb.asia-southeast1.firebasedatabase.app"
            firebase = Firebase::Client.new(firebase_url)
            
            uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
            if username && email && password && password_confirmation
                if username.length < 8 || username.length > 21
                    flash[:notice] = "Username should be between 8 and 21 characters long."
                    redirect_to "/signup"
                    return
                elsif !(!!(username =~ /^[a-zA-Z0-9]+$/))
                    flash[:notice] = "Username must only consist of alphanumeric characters (A-Z, 0-9)."
                    redirect_to "/signup"
                    return
                elsif password != password_confirmation
                    flash[:notice] = "Passwords do not match." 
                    redirect_to "/signup"
                    return
                elsif password.length < 8 || password.length > 21
                    flash[:notice] = "Password should be between 8 and 21 characters long." 
                    redirect_to "/signup"
                    return
                elsif !(email.include?("@"))
                    flash[:notice] = "Please include an email." 
                    redirect_to "/signup"
                    return
                else
                    firebase_response = firebase.get("user/users/" + username)
                    firebase_response_data = firebase_response.body

                    if firebase_response_data
                        flash[:notice] = "Username already exists."
                        redirect_to "/signup"
                        return
                    end
                    email_name = email.split('@')[0]
                    domain_name = email.split('@')[1]
                    firebase_response = firebase.get("user/emails/" + email_name)
                    firebase_response_data = firebase_response.body
                    if firebase_response_data
                        if domain_name == firebase_response_data["domain_name"]
                            flash[:notice] = "Email has already been used."
                            redirect_to "/signup"
                        return
                        end
                    end
                end
            end
        rescue StandardError => e
            flash[:error] = "Sorry, there was an issue connecting to the authentication service. Please try again later."
            redirect_to "/errorpage" # Redirect the user to an appropriate page
            return
        end
        
        begin
            uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{Rails.application.credentials.firebase_api_key}")
            response = Net::HTTP.post_form(uri, "username": @username, "email": @email, "password": @password)
            data = JSON.parse(response.body)
            @user = User.new(username: @username, user_type: "student", course_code: "0", firebase_id: data["localId"])
            @user.save
            session[:firebase_id] = @user.firebase_id
            session[:type] = "student"
            session[:user_id] = @user.id
            session[:username] = @username 
            session[:email] = @email
            session[:password] = @password
            session[:data] = data
            
            redirect_to "/profilepage", notice: "You have successfully signed up!" if response.is_a?(Net::HTTPSuccess)
            # redirect_to_signup_path, alert: "There was an error signing up. Please try again." if response.is_a?(Net::HTTPClientError)
        
        end
        
    end
        

    def login
        begin
            uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
            response = Net::HTTP.post_form(uri, "email": @email, "password": @password)
            data = JSON.parse(response.body)
            if response.is_a?(Net::HTTPSuccess)
                session[:user_id] = data["localId"]
                session[:data] = data
                redirect_to "/profilepage", notice: "You have successfully logged in!"
            end
        rescue StandardError => e
            flash[:error] = "Sorry, there was an issue connecting to the authentication service. Please try again later."
            redirect_to "/errorpage" # Redirect the user to an appropriate page
            return
        end
    end

    def home
    end

    def profilepage
    end

    def logindept
        email = params[:email];
        password = params[:password];
        firebase_url = "https://isko-info-default-rtdb.asia-southeast1.firebasedatabase.app"
        firebase = Firebase::Client.new(firebase_url)
        if email
            begin
                firebase_response = firebase.get("user/department_users/" + email)
                firebase_response_data = firebase_response.body
            rescue StandardError => e
                flash[:error] = "Sorry, there was an issue connecting to the authentication service. Please try again later."
                redirect_to "/errorpage" # Redirect the user to an appropriate page
                return
            end  
            begin
                uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
                response = Net::HTTP.post_form(uri, "email": email, "password": password)
                data = JSON.parse(response.body)
                if response.is_a?(Net::HTTPSuccess)
                    local_part, domain = email.split('@')
                    domain_name, domain_extension = domain.split('.')
                    firebase_response = firebase.get("user/emails/" + local_part + "/" + domain_name)
                    firebase_response_data = firebase_response.body
                    name = firebase_response_data["username"]
                    firebase_response = firebase.get("user/department_users/" + name)
                    firebase_response_data = firebase_response.body
                    session[:type] = "department"
                    session[:email] = email
                    session[:user_id] = data["localId"]
                    session[:data] = data
                    session[:code] = firebase_response_data["code"]
                    flash[:notice] = "You have successfully logged in!"
                    redirect_to "/deptprofilepage"
                elsif firebase_response_data
                    email = firebase_response_data["email"]
                    response = Net::HTTP.post_form(uri, "email": email, "password": password)
                    data = JSON.parse(response.body)
                    if response.is_a?(Net::HTTPSuccess)
                        session[:type] = "department"
                        session[:email] = email
                        session[:user_id] = data["localId"]
                        session[:data] = data
                        session[:code] = firebase_response_data["code"]
                        flash[:notice] = "You have successfully logged in!"
                        redirect_to "/deptprofilepage"
                    else
                        flash[:notice] = "Invalid email or password."
                        redirect_to "/logindept"
                    end
                else
                    flash[:notice] = "This username is not registered. Please contact the developers to request for an account."
                    redirect_to "/logindept"
                end
            rescue StandardError => e
                flash[:error] = "Sorry, there was an issue connecting to the authentication service. Please try again later."
                redirect_to "/errorpage" # Redirect the user to an appropriate page
                return
            end    
        end
          # Now you can use `user_data` to access the fetched user data
    end

    def loginstudent
        email = params[:email];
        password = params[:password];

        firebase_url = "https://isko-info-default-rtdb.asia-southeast1.firebasedatabase.app"
        firebase = Firebase::Client.new(firebase_url)
        if email
            begin
                firebase_response = firebase.get("user/users/" + email)
                firebase_response_data = firebase_response.body
            rescue StandardError => e
                flash[:error] = "Sorry, there was an issue connecting to the authentication service. Please try again later."
                redirect_to "/errorpage" # Redirect the user to an appropriate page
                return
            end
            
            begin
                uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
                response = Net::HTTP.post_form(uri, "email": email, "password": password)
                data = JSON.parse(response.body)
                if response.is_a?(Net::HTTPSuccess)
                    @user = User.find_by(firebase_id: data["localId"])
                    session[:type] = "student"
                    session[:firebase_id] = data["localId"]
                    session[:email] = email
                    session[:user_id] = @user.id
                    session[:data] = data
                    flash[:notice] = "You have successfully logged in!"
                    redirect_to "/profilepage"
                elsif !(email.include?("@")) && email.length < 8
                    flash[:notice] = "Invalid email or password."
                    redirect_to "/loginstudent"
                elsif firebase_response_data
                    email = firebase_response_data["email"]
                    response = Net::HTTP.post_form(uri, "email": email, "password": password)
                    data = JSON.parse(response.body)
                    if response.is_a?(Net::HTTPSuccess)
                        @user = User.find_by(firebase_id: data["localId"])
                        session[:type] = "student"
                        session[:firebase_id] = data["localId"]
                        session[:email] = email
                        session[:user_id] = @user.id
                        session[:data] = data
                        flash[:notice] = "You have successfully logged in!"
                        redirect_to "/profilepage"
                    else
                        flash[:notice] = "Invalid email or password."
                        redirect_to "/loginstudent"
                    end
                else
                    flash[:notice] = "This username is not registered. Please sign up first."
                    redirect_to "/loginstudent"
                end
            rescue StandardError => e
                flash[:error] = "Sorry, there was an issue connecting to the authentication service. Please try again later."
                redirect_to "/errorpage" # Redirect the user to an appropriate page
                return
            end
        end
          # Now you can use `user_data` to access the fetched user data
    end

    def logout
        session.clear
        redirect_to root_path, notice: "You have successfully logged out!"
    end

    def deptprofilepage
    end


    private 
    def set_user_data
        @username = params[:username]
        @email = params[:email]
        @password = params[:password]

    end

    def authenticate_user
        redirect_to "/loginstudent", notice: "You must be logged in to access this page." unless current_user
    end

    
end