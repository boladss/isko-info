class DepartmentsController < ApplicationController

  before_action :authenticate_user

  def index
    @departments = Department.all
    puts @departments.inspect
  end

  def show
    @department = Department.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to root_path
  end

  def reghelper_show
    @department = Department.find(params[:id])
    @course_policies = @department.course_policies
    @university_college = @department.university_college
  end

  def show_course_policies
    @department = Department.find(params[:id])
    @course_policies = @department.course_policies
    render '/course_policies/index_dept'
  end

  def edit
    @department = Department.find(params[:id])
  end

  def update
    @department = Department.find(params[:id])
    if @department.update(department_params)
        redirect_to @department
    else
        render :edit, status: :unprocessable_entity
    end
end
  private
    def department_params
        params.require(:department).permit(:code, :name, :department_policy)
    end

  def authenticate_user
    redirect_to "/logindept", notice: "You must be logged in to access this page." unless current_user
  end
end