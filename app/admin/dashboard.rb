ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    div class: "datas", "data-cont": "#{current_admin_user.histories.select(:capacity, :created_at).map { |history| [history.capacity, history.created_at] }.to_json}" do
    end

    h3 "History statistic"

    div id: "combine-chart" do
      div id: "order-stats", class: "flot-chart", style: "height: 320px;" do
      end
    end


    # Here is an example of a simple dashboard with columns and panels.
    #
    # columns do
    #   column do
    #     panel "Recent Posts" do
    #       ul do
    #         Post.recent(5).map do |post|
    #           li link_to(post.title, admin_post_path(post))
    #         end
    #       end
    #     end
    #   end

    #   column do
    #     panel "Info" do
    #       para "Welcome to ActiveAdmin."
    #     end
    #   end
    # end
  end # content
end
