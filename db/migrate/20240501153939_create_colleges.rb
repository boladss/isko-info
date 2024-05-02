class CreateColleges < ActiveRecord::Migration[7.1]
  def change
    create_table :colleges do |t|
      t.string :code
      t.text :name
      t.timestamps
    end
  end
end
