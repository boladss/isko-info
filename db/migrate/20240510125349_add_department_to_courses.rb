class AddDepartmentToCourses < ActiveRecord::Migration[7.1]
  def change
    add_reference :course_policies, :department, foreign_key: true
  end
end
