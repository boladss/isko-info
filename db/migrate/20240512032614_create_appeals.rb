class CreateAppeals < ActiveRecord::Migration[7.1]
  def change
    create_table :appeals do |t|
      t.references :user, null: false, foreign_key: true
      t.references :course_policy, null: false, foreign_key: true

      t.timestamps
    end
  end
end
