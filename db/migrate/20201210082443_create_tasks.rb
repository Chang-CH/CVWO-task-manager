class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.belongs_to :category, null: false, foreign_key: true
      t.boolean :done

      t.timestamps
    end
  end
end
