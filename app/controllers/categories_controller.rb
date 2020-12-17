class CategoriesController < ApplicationController
    def index
        categories = Category.order("id ASC")
        render json: categories
    end

    def create
        category = Category.create(category_param)
        render json: category
    end

    def update
        category = Category.find(params[:id])
        category.update_attributes(category_param)
        render json: category
    end

    def destroy
        category = Category.find(params[:id])
        category.destroy
        head :no_content, status: :ok
    end

    private
    def category_param
        params.require(:category).permit(:name)
    end
end
