class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :name
      t.text :description
      t.boolean :finished, :default => false
      t.timestamps
    end
  end
end
