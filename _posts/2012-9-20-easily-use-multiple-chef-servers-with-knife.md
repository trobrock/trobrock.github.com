---
layout: post
title: Easily use multiple chef servers with knife
date: 2012-9-20
---

I recently have taken on a project that involves entirely rewriting our chef repository, as well as upgrading chef and chef server. To do this I figured it would be easier to build a new chef server and use that for testing out the new cookbooks, and eventually switch over to it on production.

I quickly found that it was a pain to switch chef configurations when I need to do a fix on our current cookbooks. I looked around a bit, but didn't find anything great for this purpose. I did find after building my solution you can put config in a project level .chef folder, but this isn't great since I don't want to be restricted to where knife is configured correctly. I have also found [Knife Block](https://github.com/greenandsecure/knife-block) which requires Ruby 1.9.2 and a gem to be installed. I often use different rvm gemsets for my chef projects so this would require me to install this gem in each gemset, or globally.

## My solution

What I came up with is a tool called [chefvm](https://github.com/trobrock/chefvm) (based on rvm). This tool is written entirely in sh and will not care about the knife version you use or what gemset you may be in. It works by intelligently manipulating symlinks, and even supports setting default chef configurations.

## Install and Usage

To install (Below is for zsh, but bash instructions are in the repo's README):

{% highlight bash %}
git clone git://github.com/trobrock/chefvm.git ~/.chefvm
echo '[[ -s "$HOME/.chefvm/scripts/chefvm" ]] && . "$HOME/.chefvm/scripts/chefvm"' >> ~/.zshenv
{% endhighlight %}

Usage is simple, I have tried to keep things as close to rvm as possible.

{% highlight bash %}
# Use a specific config
# This is the default command and you can omit the 'use'
chefvm use {YOUR_CHEF_CONFIG|default}

# Set your default config
chefvm default YOUR_CHEF_CONFIG

# List your configurations, including current and default
# You can also omit the 'list'
chefvm list

# Create a new config and help connect you to your chef server
chefvm create YOUR_CHEF_CONFIG

# Delete a config
chefvm delete YOUR_CHEF_CONFIG

# Open a config directory in $EDITOR
chefvm edit YOUR_CHEF_CONFIG
{% endhighlight %}

I am constantly working on this, so these are likely to change.

## That's it

Now you have a tool that is available everywhere, ruby environment and chef environment agnostic, and allows you to easily toggle between chef configurations.
