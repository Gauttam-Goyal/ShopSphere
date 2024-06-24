class CartsController < ApplicationController
    def get_cart_items
        @cart_items = Cart.where(user_id: params[:user_id])
        render json: @cart_items
    end
    def add_to_cart
        product = Product.find(params[:product_id])
        puts "hello world"
        puts product.id
        puts params[:user_id]
        cart_item = Cart.find_by(product_id: params[:product_id], user_id: params[:user_id])
        puts cart_item
        if(cart_item)
            puts "item found"
            item_quantity = cart_item.quantity+1
            cart_item.update(quantity: item_quantity)
            render json:{
                'status': "item found",
                'item': cart_item
            }
        else
            puts "item not found"
            Cart.create(user_id: params[:user_id], product_id: product.id, quantity: 1)
            cart_item = Cart.find_by(product_id: params[:product_id], user_id: params[:user_id])
            render json:{
                'status': "item created",
                'item': cart_item

            }
        end
        
    end
    def remove_from_cart
    #   cart_id = params[:id]
      cart_item = Cart.where(product_id: params[:product_id], user_id: params[:user_id])
    
      # Assuming your CartItem model has a `destroy` method
      cart_item[0].destroy
        render json:{
            status: "cart item removed"
        }
    #   redirect_to cart_path, notice: 'Product removed from cart.'
      end
    def decreaseCartQuantity
        product = Product.find(params[:product_id])
        puts "hello world"
        puts product.id
        puts params[:user_id]
        cart_item = Cart.find_by(product_id: params[:product_id], user_id: params[:user_id])
        puts cart_item
        if(cart_item)
            puts "item found"
            item_quantity = cart_item.quantity-1
            cart_item.update(quantity: item_quantity)
            render json:{
                'status': "item found",
                'item': cart_item
            }
        end
    end
end
