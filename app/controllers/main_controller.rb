class MainController < ApplicationController
  def index
  end

  def registration
  	if current_admin_user
  		redirect_to admin_root
  	else
  		@admin_user = AdminUser.new
  	end
  end

  def create
  	@admin_user = AdminUser.create(admin_user_params)

  	if @admin_user.save
  		sign_in("admin_user", @admin_user)
  		redirect_to admin_root_url
  		#redirect_to admin_user_session_path(admin_user: { email: @admin_user.email, password: admin_user_params.params })
  	else 
  		@errors = @admin_user.errors
  		render :registration
  	end
  end

  def create_history
  	if current_admin_user
  		history = current_admin_user.histories.build(history_params)
  		if history.save
  			render :json => "successful".to_json
  		else
  			render :json => "failure".to_json
  		end
  	else
  		render nothing: true
  	end
  end

  def cabinet
  	
  end

  def history_params
  	params.require(:history).permit(:weight, :physical_activity, :capacity)
  end
  
  def update
    id, data = params[:id], params[:data]
    if current_admin_user
      history = current_admin_user.histories.find(id)
      history.update_attributes(data)
      redirect_to root_url
    end
  end
  
  def delete
    id = params[:id]
    if current_admin_user
      history = current_admin_user.histories.find(id)
      history.delete
      redirect_to root_url
    end
  end

  def admin_user_params
  	params.require(:admin_user).permit(:name, :email, :bort_at, :password)
  end
end
