# frozen_string_literal: true

class TodoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :finished, :created_at, :updated_at, :document

  def document
    if object.document.attached?
      {
        url: rails_blob_url(object.document),
        signed_id: object.document.signed_id
      }
    end
  end
end
