class CoursePoliciesController < ApplicationController
    def index
        @course_policies = CoursePolicy.all
        puts @course_policies.inspect 
    end

    def show
        @course_policy = CoursePolicy.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        redirect_to root_path
    end

    def edit
        @course_policy = CoursePolicy.find(params[:id])
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
end