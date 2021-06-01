class Todo < ActiveRecord::Base
  #has_many_attached :documents
  has_one_attached :avatar
  #scope :recently_created, -> {where("created_at <= '#{Date.today - 2.days}'")}
  #belongs_to :report
  #validates :doc_name, {
  #  presence: true
  #}

  # def get_image_url
  #   url_for(self.doc_name)
  # end

end
