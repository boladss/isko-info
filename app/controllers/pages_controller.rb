require 'net/http'
require 'uri'
require 'json'
require 'firebase'

class PagesController < ApplicationController

    before_action :set_user_data, only: %i[signup loginstudent logindept]
    before_action :authenticate_user, except: %i[main signup loginstudent logindept]    # makes sure na hindi makakapasok sa home page unless logged - in

    def main
    end


    def signup
        password_confirmation = params[:password_confirmation]
        username = params[:username]
        email = params[:email]
        password = params[:password]
        firebase_url = "https://isko-info-default-rtdb.asia-southeast1.firebasedatabase.app"
        firebase = Firebase::Client.new(firebase_url)
        
        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
        if username && email && password && password_confirmation
            if username.length < 8
                flash[:notice] = "Username is lee than 8 characters"
                redirect_to "/signup"
                return
            elsif !(!!(username =~ /^[a-zA-Z0-9]+$/))
                flash[:notice] = "Alphanumeric Characters only"
                redirect_to "/signup"
                return
            elsif password != password_confirmation
                flash[:notice] = "Password does not match" 
                redirect_to "/signup"
                return
            elsif password.length < 8
                flash[:notice] = "Password is less than 8 characters" 
                redirect_to "/signup"
                return
            elsif !(email.include?("@"))
                flash[:notice] = "Please input an email" 
                redirect_to "/signup"
                return
            else
                firebase_response = firebase.get("user/users/" + username)
                firebase_response_data = firebase_response.body

                if firebase_response_data
                    flash[:notice] = "Username exists!"
                    redirect_to "/signup"
                    return
                end
                
                email_name = email.split('@')[0]
                domain_name = email.split('@')[1]
                firebase_response = firebase.get("user/emails/" + email_name)
                firebase_response_data = firebase_response.body
                if firebase_response_data
                    if domain_name == firebase_response_data["domain_name"]
                        flash[:notice] = "Email exists"
                        redirect_to "/signup"
                    return
                    end
                end
            end
        end
        

        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{Rails.application.credentials.firebase_api_key}")
        response = Net::HTTP.post_form(uri, "username": @username, "email": @email, "password": @password)
        data = JSON.parse(response.body)
        session[:user_id] = data["localId"]
        session[:username] = @username 
        session[:email] = @email
        session[:password] = @password
        session[:data] = data
        redirect_to "/profilepage", notice: "You have successfully signed up!" if response.is_a?(Net::HTTPSuccess)
        # redirect_to_signup_path, alert: "There was an error signing up. Please try again." if response.is_a?(Net::HTTPClientError)
    end
        

    def login
        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
        response = Net::HTTP.post_form(uri, "email": @email, "password": @password)
        data = JSON.parse(response.body)
        if response.is_a?(Net::HTTPSuccess)
            session[:user_id] = data["localId"]
            session[:data] = data
            redirect_to "/profilepage", notice: "You have successfully logged in!"
        end
    end

    def home
    end

    def profilepage
    end

    def logindept
        username = params[:username]
        email = params[:email];
        password = params[:password];
        firebase_url = "https://isko-info-default-rtdb.asia-southeast1.firebasedatabase.app"
        firebase = Firebase::Client.new(firebase_url)
        
        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
        response = Net::HTTP.post_form(uri, "email": email, "password": password)
        data = JSON.parse(response.body)
        if response.is_a?(Net::HTTPSuccess) 
            session[:email] = email
            session[:user_id] = data["localId"]
            session[:data] = data
            flash[:notice] = "You have successfully logged in!"
            redirect_to "/profilepage"
        elsif email
            firebase_response = firebase.get("user/users/" + email)
            firebase_response_data = firebase_response.body
            email = firebase_response_data["email"]
            response = Net::HTTP.post_form(uri, "email": email, "password": password)
            data = JSON.parse(response.body)
            if response.is_a?(Net::HTTPSuccess)
                session[:email] = email
                session[:user_id] = data["localId"]
                session[:data] = data
                flash[:notice] = "You have successfully logged in!"
                redirect_to "/profilepage"
            else
                flash[:notice] = "Invalid email or password"
                redirect_to "/logindept"
            end
        end
    end

    def loginstudent
        username = params[:username]
        email = params[:email];
        password = params[:password];
        firebase_url = "https://isko-info-default-rtdb.asia-southeast1.firebasedatabase.app"
        firebase = Firebase::Client.new(firebase_url)
        
        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
        response = Net::HTTP.post_form(uri, "email": email, "password": password)
        data = JSON.parse(response.body)
        if response.is_a?(Net::HTTPSuccess) 
            session[:email] = email
            session[:user_id] = data["localId"]
            session[:data] = data
            flash[:notice] = "You have successfully logged in!"
            redirect_to "/profilepage"
        elsif email
            firebase_response = firebase.get("user/users/" + email)
            firebase_response_data = firebase_response.body
            email = firebase_response_data["email"]
            response = Net::HTTP.post_form(uri, "email": email, "password": password)
            data = JSON.parse(response.body)
            if response.is_a?(Net::HTTPSuccess)
                session[:email] = email
                session[:user_id] = data["localId"]
                session[:data] = data
                flash[:notice] = "You have successfully logged in!"
                redirect_to "/profilepage"
            else
                flash[:notice] = "Invalid email or password"
                redirect_to "/loginstudent"
            end
        end
          # Now you can use `user_data` to access the fetched user data
    end

    def logout
        session.clear
        redirect_to root_path, notice: "You have successfully logged out!"
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