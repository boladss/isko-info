class CoursePoliciesController < ApplicationController

    before_action :authenticate_user

    def index
        @course_policies = CoursePolicy.all
        puts @course_policies.inspect 
    end

    def show
        @course_policy = CoursePolicy.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        redirect_to root_path
    end

    def new
        @course_policy = CoursePolicy.new()
    end

    def create
        @course_policy = CoursePolicy.new(course_policy_params)
        if @course_policy.save
            redirect_to @course_policy
        else  
            render :new, status: :unprocessable_entity
        end
    end

    def edit
        @course_policy = CoursePolicy.find(params[:id])
    end
    
    def destroy
        @course_policy = CoursePolicy.find(params[:id])
        @course_policy.destroy
        redirect_to '/dept_profile'
    end

    def update
        @course_policy = CoursePolicy.find(params[:id])
        if @course_policy.update(course_policy_params)
            redirect_to @course_policy
        else
            render :edit, status: :unprocessable_entity
        end
    end
    private
    def course_policy_params
        params.require(:course_policy).permit(:course_title, :course_description, :prerogative_policy, :waitlisting_schedule, :cancellation_procedure, :other_information)
    end

    def authenticate_user
        redirect_to "/loginstudent", notice: "You must be logged in to access this page." unless current_user
    end
end