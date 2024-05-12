class AddCourseCodeToCoursePolicy < ActiveRecord::Migration[7.1]
  def change
    add_column :course_policies, :course_code, :string
  end
end
  