class Document < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :document, :integer
  end
end
