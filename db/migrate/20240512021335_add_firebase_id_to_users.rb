class AddFirebaseIdToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :firebase_id, :string
  end
end
