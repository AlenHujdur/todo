# lib/json_web_token.rb

# frozen_string_literal: true
require 'jwt'
require 'net/http'
require 'uri'

class JsonWebToken
  def self.verify(token)
    JWT.decode(token, nil,
               true, # Verify the signature of this token
               algorithm: 'RS256',
               iss: 'http://localhost:3000/',
               verify_iss: true,
               aud: Rails.application.secrets.auth0_api_audience,
               verify_aud: true) do |header|
      jwks_hash[header['kid']]
    end
  end

  def self.jwks_hash
    jwks_raw = Rails.cache.fetch("JWKS_HASH", expires_in: 10.hours) do
        Net::HTTP.get URI("https://#{Rails.application.credentials[:auth0][:domain]}.well-known/jwks.json")
    end
    jwks_keys = Array(JSON.parse(jwks_raw)['keys'])
    Hash[
      jwks_keys
        .map do |k|
        [
          k['kid'],
          OpenSSL::X509::Certificate.new(
            Base64.decode64(k['x5c'].first)
          ).public_key
        ]
      end
    ]
  end
end
