---
layout: post
title: Heroku and Mongoid
date: 2011-11-11
---

I wanted to play around with Heroku a bit the other day since I didn't feel like spinning up a new server at Rackspace to hack on a new idea I had. Like the last time I messed around with Heroku I ran into headaches with Postgres, I have never had a pleasant experience with Postgres. I did notice that in the Heroku addons MongoHQ was listed, and if you haven't heard of them they are a hosted Mongo DB service. I am a big fan of the Rails 3.1, Devise, Omniauth, Mongoid stack. So I began my journey setting this app up.

### Heroku docs

The first thing I ran into are the docs for using MongoHQ with a Rails app that Heroku provides [here](http://devcenter.heroku.com/articles/mongohq). They list Mongoid as one of the gems you can use, but they only cover the configuration of the other two gems listed. From those docs I could determine that it looks like I'm going to have access to the `ENV['MONGOHQ_URL']` variable, and there was no listing of anything else available.

### Mongoid config

When I got into actually configuring Mongoid to work with MongoHQ and Heroku I did some searching and cam across [this](http://stackoverflow.com/questions/2784417/heroku-mongohq-and-mongoid-mongoconnectionfailure) StackOverflow article. The top answer suggested using a pre-release version of mongoid, which I don't prefer to do if I can work around it. They suggested this because Mongoid expects a very ActiveRecord-like config file with the user, password, host, etc. seperated and from everything people were suggesting the `MONGOHQ_URL` is the only thing you had to point at your Mongo db. At the end of that StackOverflow article there is someone who suggests just manually entering the config based on the Mongo URI that MongoHQ gives you.

As I was writing this article I looked a bit further and on v2.3 on Mongoid they support the uri option in the mongoid.yml file, so then the only trick left is to find the correct user name and password to use to connect to the database. To find this I ran

```
    % heroku run console
    Running console attached to terminal... up, run.8
    Loading production environment (Rails 3.1.1)
    irb(main):001:0> puts ENV.inspect
```

Then you should see something like this in the hash and you can grab the username and password from that: `"MONGOHQ_URL"=>"mongodb://heroku:23sl54a8e892ksldhjf8jl34mrlnsf8j@staff.mongohq.com:10053/app8849273"`

And then your heroku app should be good to go with Mongo
