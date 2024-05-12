class CreateUniversityColleges < ActiveRecord::Migration[7.1]
  def change
    create_table :university_colleges do |t|
      t.string :name

      t.timestamps
    end
  end
end
