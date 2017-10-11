ActiveAdmin.register AdminUser do
  permit_params :email, :name, :bort_at, :password, :password_confirmation
  actions :index, :show, :edit, :update
  before_action :redirect_to_edit_page, except: [:edit, :update]


  index do
    selectable_column
    id_column
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  filter :email
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs "Admin Details" do
      f.input :name
      f.input :email
      f.input :bort_at
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end


  controller do
    def redirect_to_edit_page
      redirect_to edit_admin_admin_user_path(current_admin_user.id.to_i)  
    end

    def update_resource(object, attributes)
      if params[:id].to_i == current_admin_user.id.to_i
        update_method = attributes.first[:password].present? ? :update_attributes : :update_without_password
        object.send(update_method, *attributes)
        sign_in(object, :bypass => true)
      end
    end
  end

end
