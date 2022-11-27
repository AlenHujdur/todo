class Changetypeofdocument < ActiveRecord::Migration[6.0]
  def change
    change_column :todos, :document, :string
  end
end
