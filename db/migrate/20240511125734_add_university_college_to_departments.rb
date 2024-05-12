class AddUniversityCollegeToDepartments < ActiveRecord::Migration[7.1]
  def change
    add_reference :departments, :university_college, foreign_key: true
  end
end
