class AppealsController < ActionController::Base
    def create
        @course_policy = CoursePolicy.find(params[:id])
        existing_appeal = @course_policy.appeals.exists?(user_id: session[:user_id])
        if existing_appeal
            @course_policy.appeals.find_by(user_id: session[:user_id]).destroy
            redirect_to course_policy_reghelper_path(params[:id])
        else   
            @appeal = @course_policy.appeals.build(user_id: session[:user_id])
            @appeal.save
            redirect_to course_policy_reghelper_path(params[:id])
        end
    end
end
