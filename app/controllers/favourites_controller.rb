class FavouritesController < ApplicationController
    def get_favourite_items
        @favourite_items = Favourite.where(user_id: params[:user_id])
        render json: @favourite_items
    end
    def add_to_favourite
        product = Product.find(params[:product_id])
        puts "hello world favourite"
        puts product
        favourite_item = Favourite.find_by(product_id: params[:product_id], user_id: params[:user_id])
        if(favourite_item)
            render json:{
                'status': "item already in favourites",
            }
        else
            Favourite.create(user_id: params[:user_id], product_id: product.id)
            favourite_item = Favourite.find_by(product_id: params[:product_id], user_id: params[:user_id])
            render json:{
                'status': "item added to favourites",
                'item': favourite_item

            }
       
      end
    end
       def remove_from_favourite
        # favourite_id = params[:id]
        favourite_item = Favourite.where(product_id: params[:product_id], user_id: params[:user_id])
        favourite_item[0].destroy
        render json:{
            status: "item removed from favourites"
        }
      
    end
end
