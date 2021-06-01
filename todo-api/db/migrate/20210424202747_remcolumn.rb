class Remcolumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :todos, :doc_name
  end
end
