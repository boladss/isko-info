class ChangeCourseCode < ActiveRecord::Migration[7.1]
  def change
    rename_column :course_policies, :course_code, :code
  end
end
