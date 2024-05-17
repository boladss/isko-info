class UniversityCollegesController < ApplicationController
    def index
        @university_colleges = UniversityCollege.all
        puts @university_colleges.inspect 
    end
    
    def show
        @university_college = UniversityCollege.find(params[:id])
        @departments = @university_college.departments
    rescue ActiveRecord::RecordNotFound
        redirect_to root_path
    end
    
end