class AddRangeToDashboard < ActiveRecord::Migration[5.2]
  def change
    add_column :dashboards, :range, :string
  end
end
