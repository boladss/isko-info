class ApplicationController < ActionController::Base
    helper_method :current_user
    def current_user
        @current_user ||= session[:user_id]
    end

end
