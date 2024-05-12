class RenameTypeColumnInUsers < ActiveRecord::Migration[7.1]
  def change
      rename_column :users, :type, :user_type
  end
end
