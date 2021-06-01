class Changename < ActiveRecord::Migration[6.0]
  def change
    rename_column :todos, :document, :doc_name
  end
end
