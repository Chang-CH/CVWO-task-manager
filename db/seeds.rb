# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


#   Test task can be removed, but General Category must be initialized
#   The category is the default category when a task is created without choosing any categories
#   General category cannot be edited/deleted from the front end otherwise
categories = Category.create([{name: 'General'}])
Task.create([
    {title: 'Test task', done: 'false', category: categories.first}
    ])
