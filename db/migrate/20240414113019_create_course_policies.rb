class CreateCoursePolicies < ActiveRecord::Migration[7.1]
  def change
    drop_table :course_policies
    create_table :course_policies do |t|
      t.string :course_title
      t.text :course_description

      t.timestamps
    end
  end
end
