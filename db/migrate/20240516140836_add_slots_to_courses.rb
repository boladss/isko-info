class AddSlotsToCourses < ActiveRecord::Migration[7.1]
  def change
    # remove_column :course_policies, :appeal_count

    # add_column :course_policies, :total_slots, :integer
    # add_column :course_policies, :remaining_slots, :integer

    change_table :course_policies do |t|
      t.remove :appeal_count
      t.integer :remaining_slots
      t.integer :total_slots
    end
  end
end
