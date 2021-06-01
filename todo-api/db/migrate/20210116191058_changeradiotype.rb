class Changeradiotype < ActiveRecord::Migration[6.0]
  def change
    change_column :todos, :finished, :string, default: 'inProgress'
  end
end
