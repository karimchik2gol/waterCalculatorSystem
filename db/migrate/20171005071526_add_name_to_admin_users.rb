class AddNameToAdminUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :admin_users, :name, :string
    add_column :admin_users, :bort_at, :date
  end
end
