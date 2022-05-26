require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  # 本番環境の場合はS3へアップロード
  if Rails.env.production?
    config.storage :fog
    config.fog_provider = 'fog/aws'
    # バケット名
    config.fog_directory  = 'runtecreator'
    config.fog_public = false
    config.fog_credentials = {
      provider: 'AWS',
      # Access key ID
      aws_access_key_id: ENV['S3_ACCESS_KEY_ID'],
      # Secret access key
      aws_secret_access_key: ENV['S3_SECRET_ACCESS_KEY'],
      # AWS リージョン
      region: 'ap-northeast-1',
      path_style: true
    }
  # 本番環境以外の場合はローカルにアップロード
  else
    config.storage :file
    config.enable_processing = false if Rails.env.test?
  end
end
