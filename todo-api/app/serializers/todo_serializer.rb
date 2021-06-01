# frozen_string_literal: true

class TodoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :finished, :created_at, :updated_at, :avatar

  def avatar
    if object.avatar.attached?
      {
        url: rails_blob_url(object.avatar),
        signed_id: object.avatar.signed_id
      }
    end
  end
end
