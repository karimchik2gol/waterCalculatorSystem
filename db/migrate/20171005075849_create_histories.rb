class CreateHistories < ActiveRecord::Migration[5.0]
  def change
    create_table :histories do |t|
      t.integer :weight
      t.integer :physical_activity
      t.float :capacity
      t.references :admin_user, foreign_key: true

      t.timestamps
    end
  end
end
