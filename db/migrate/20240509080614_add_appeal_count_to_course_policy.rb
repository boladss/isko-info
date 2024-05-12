class AddAppealCountToCoursePolicy < ActiveRecord::Migration[7.1]
  def change
    add_column :course_policies, :appeal_count, :integer
  end
end
