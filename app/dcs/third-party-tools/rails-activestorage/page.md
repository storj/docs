---
title: Rails Active Storage
description: How to connect ActiveStorage in Rails 7 to Storj
docId: NhH8YVF9d8liRd7BRu9jT
redirects:
  - /dcs/how-tos/rails-activestorage
pageTitle: Rails 7 ActiveStorage Connected to Storj
---

This guide will show you how to connect ActiveStorage in Rails 7 to Storj (an AWS S3 compatible object storage). You can also look at the [source code of this example](https://github.com/amozoss/active-storj).

We have a webinar walking you through it, but you can also refer to the steps below:

<https://www.youtube.com/watch?v=a8SlyTuoIwI>

## Prerequisites:

- Installed ruby 3.1.2 or later&#x20;

- Installed rails 7.0.4.2 or later

- Storj S3 compatiable access and secret key (see [](docId:LueFgrbZ9rJbWtDMXhIWZ))&#x20;

- A bucket created on Storj (see [](docId:OJPnxiexQIXHmzGBkvzHc))

## Configure ActiveStorage to Storj

Create a new rails app

```shell
rails new active-storj
```

Install ActiveStorage

```shell
rails active_storage:install
```

Edit `Gemfile`, add the `aws-sdk-s3` gem and run `bundle install`&#x20;

```ruby
gem "aws-sdk-s3", require: false
```

Edit the rails credentials

```shell
rails credentials:edit
```

Add to the credentials your access key and secret key (see [](docId:LueFgrbZ9rJbWtDMXhIWZ)) under `storj:`&#x20;

```yaml
storj:
  access_key_id: <access_key>
  secret_access_key: <secret_key>
```

Edit `config/storage.yml`, enter the following to configure ActiveStorage to use Storj.&#x20;

Be sure to replace the bucket with the one created earlier (see [](docId:OJPnxiexQIXHmzGBkvzHc))

```yaml
storj:
  service: S3
  access_key_id: <%= Rails.application.credentials.dig(:storj, :access_key_id) %>
  secret_access_key: <%= Rails.application.credentials.dig(:storj, :secret_access_key) %>
  region: global
  endpoint: https://gateway.storjshare.io
  bucket: active-storj
```

Edit `config/environments/development.rb`, change the ActiveStorage service to `:storj` &#x20;

```ruby
config.active_storage.service = :storj
```

## Use active storage images hosted by Storj

First we'll need a basic app to interact with generated with [Rails scaffolding](https://guides.rubyonrails.org/v3.2/getting_started.html#getting-up-and-running-quickly-with-scaffolding)

```shell
rails generate scaffold Name name
```

Edit `config/routes.rb` set `root` to `"names#index`&#x20;

```ruby
  root "names#index"
```

Edit `app/models/name.rb` to have `has_one_attached`&#x20;

```ruby
class Name < ApplicationRecord
  has_one_attached :main_image
end
```

Edit `app/views/names/_form.html.erb` to include a `field_field` to allow the user to choose a file to upload

```html
<div><%= form.label :main_image %> <%= form.file_field :main_image %></div>
```

Navigate to <http://localhost:3000/names/new> and you should see the following

![](https://archbee-image-uploads.s3.amazonaws.com/kv3plx2xmXcUGcVl4Lttj/exMR-EZ3OKl8eokEZk-Ox_screenshot-2023-02-02-at-41007-pm.png)

Click "Create Name"&#x20;

Edit `app/views/names/show.html.erb` to include `<%= image_tag @name.main_image %>` to display the image

```html
<p style="color: green"><%= notice %></p>

<%= render @name %> <%= image_tag @name.main_image %>

<div>
  <%= link_to "Edit this name", edit_name_path(@name) %> | <%= link_to "Back to
  names", names_path %> <%= button_to "Destroy this name", @name, method:
  :delete %>
</div>
```

Edit `app/assets/stylesheets/application.css` to style the image to fix the size of the screen

```css
img {
  width: 100vh;
}
```

Navigate to <http://localhost:3000/names/1> to see your image

## Enable direct to Storj upload

Edit `config/importmap.rb` to include the `@rails/activestorage` package

```ruby
pin "@rails/activestorage", to: "https://ga.jspm.io/npm:@rails/activestorage@7.0.4/app/assets/javascripts/activestorage.esm.js"
```

Edit `app/javascript/controllers/application.js` to initialize the ActiveStorage

```javascript
import * as ActiveStorage from '@rails/activestorage'

const application = Application.start()
ActiveStorage.start()
```

Modify `app/views/names/_form.html.erb` `form.file_field` to include `direct_upload: true`&#x20;

```html
<div>
  <%= form.label :main_image %> <%= form.file_field :main_image, direct_upload:
  true %>
</div>
```
