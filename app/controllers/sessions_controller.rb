class SessionsController < ApplicationController
    def index
        @users = User.all
        render json: @users
    end
    def checkUser
        user = User.find_by(email: params[:email])
    
        if user && user.authenticate(params[:password])
          # Successful login
          puts "hello user found"
          session[:user_id] = user.id
          puts user.id
          puts session
          render json:{
            'id':user.id,
            'status':'success'
          }
        #   redirect_to products_path, notice: 'Login successful!'
        else
          # Failed login
          puts "hello user not found"
          render json:{
            status:'user not found'
          }
          
        end
    end
    def addUser
      
      existing_user = User.find_by(email: params[:email])
      puts "sign up user"
      puts existing_user
      if (!existing_user)
        user = User.new(email: params[:email], password: params[:password])
        user.password_digest = BCrypt::Password.create(user.password)
        user.save
        user = User.find_by(email: params[:email])
        render json:{
            'id': user.id,
            'status':'success'
          }
      else
        render json:{
          'status':'failed to add user'
        }
      end

    end
    def getCategories
        @categories = Category.all
        render json: @categories
    end
end
