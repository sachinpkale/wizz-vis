source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.0'

gem 'pg', '~> 1.0'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

gem 'active_model_serializers', '~> 0.10.7'

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# React gem
gem 'react_on_rails', '10.0.2'

# Material Design
gem 'materialize-sass', '~> 0.100.2'
gem 'material_icons', '~> 2.2'

# Simple form
gem 'simple_form', '~> 4.0.1'

# Breadcrumbs helper
gem 'gretel', '~> 3.0'

# Sidekiq
gem 'sidekiq', '~> 5.1'
gem 'sidekiq-cron', '~> 1.0.0'

# Druid
gem 'ruby-druid', git: 'https://github.com/wizzie-io/ruby-druid.git'

# Pagination
gem 'kaminari', '~> 1.1'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

gem 'mini_racer', platforms: :ruby

gem 'nokogiri', '~> 1.8.5'

gem 'swagger-blocks'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and
  # get a debugger console
  gem 'bundle-audit', '~> 0.1.0'
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'dotenv-rails', '~> 2.2'
  gem 'faker', '~> 1.8'
  gem 'pry-byebug', '~> 3.6'
  gem 'rspec-rails', '~> 3.7'
end

group :development do
  gem 'foreman', '~> 0.78.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '~> 2.15'
  gem 'chromedriver-helper'
  gem 'codecov', require: false
  gem 'factory_bot_rails', '~> 4.8'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers', '~> 3.1'
  gem 'simplecov', require: false
  gem 'webmock', '~> 3.3'
end

Dir.glob(File.join(File.dirname(__FILE__), 'plugins', '*')) do |plugin_path|
  gem plugin_path.split('/').last, path: plugin_path
end
