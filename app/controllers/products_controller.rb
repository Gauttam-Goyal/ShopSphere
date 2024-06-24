class ProductsController < ApplicationController
    def getProducts
        @products = Product.all
        @categories = Category.all

        if params[:category].present?
        puts "hello user"
        @products = Product.where(category_id: params[:category])
        @selected_category = Category.find(params[:category])
        end
        render json: @products
    end

    def getProductDetails
        @product = Product.where(id: params[:id])
        render json: @product
    end
end
