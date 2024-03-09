require 'net/http'
require 'uri'
require 'json'

class PagesController < ApplicationController

    before_action :set_user_data, only: %i[signup loginstudent logindept]
    before_action :authenticate_user, except: %i[main signup loginstudent logindept]    # makes sure na hindi makakapasok sa home page unless logged - in

    def main
    end

    def signup
        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{Rails.application.credentials.firebase_api_key}")
        response = Net::HTTP.post_form(uri, "username": @username, "email": @email, "password": @password)
        data = JSON.parse(response.body)
        session[:user_id] = data["localId"]
        session[:data] = data

        redirect_to home_path, notice: "You have successfully signed up!" if response.is_a?(Net::HTTPSuccess)
        # redirect_to_signup_path, alert: "There was an error signing up. Please try again." if response.is_a?(Net::HTTPClientError)
    end

    def login
        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
        response = Net::HTTP.post_form(uri, "email": @email, "password": @password)
        data = JSON.parse(response.body)
        if response.is_a?(Net::HTTPSuccess)
            session[:user_id] = data["localId"]
            session[:data] = data
            redirect_to home_path, notice: "You have successfully logged in!"
        end
    end

    def home
    end

    def logindept
        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
        response = Net::HTTP.post_form(uri, "email": @email, "password": @password)
        data = JSON.parse(response.body)
        if response.is_a?(Net::HTTPSuccess)
            session[:user_id] = data["localId"]
            session[:data] = data
            redirect_to home_path, notice: "You have successfully logged in!"
        end
    end

    def loginstudent
        uri = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{Rails.application.credentials.firebase_api_key}")
        response = Net::HTTP.post_form(uri, "email": @email, "password": @password)
        data = JSON.parse(response.body)
        if response.is_a?(Net::HTTPSuccess)
            session[:user_id] = data["localId"]
            session[:data] = data
            redirect_to home_path, notice: "You have successfully logged in!"
        end
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
        redirect_to root_path, notice: "You must be logged in to access this page." unless current_user
    end
end