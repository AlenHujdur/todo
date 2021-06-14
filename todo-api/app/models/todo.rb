class Todo < ActiveRecord::Base
  has_one_attached :document
  #scope :recently_created, -> {where("created_at <= '#{Date.today - 2.days}'")}

end
