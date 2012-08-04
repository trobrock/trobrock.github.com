---
layout: post
title: Connection pooling with Stillwater
date: 2012-8-3
---

## What is it

Stillwater is a simple connection pooling gem that enables you to pool connections to multiple servers or any other Object you want.

## Why

Here at Outright we were wanting to have our queue servers be intelligent about server failures in our aggregation system, it would also be nice if the connections to that aggregation system were load balanced. After looking around for a bit we realized there wasn't really anything out there that did what we wanted. So a couple of hours with [@julio](https://github.com/julio) and we ended up with [Stillwater](https://github.com/trobrock/stillwater). Now you can load balance and handle failover between any sort of connection that you can create in a ruby block.

## Usage

The usage is pretty simple, install the gem as you would for any other project.

Setup:

{% highlight ruby %}
# Instantiate the pool
@pool = Stillwater::ConnectionPool.new

# Add your connections
# These blocks that you create connections with get stored and
# re-executed when building a connection after it has failed
%q{ host1.com host2.com }.each do |host|
  pool.add { MyConnectionClass.new(host) }
end
{% endhighlight %}

Then connection pooiling with and without failover:

{% highlight ruby %}
# Basic connection handling
pool.with_connection do |connection|
  # Do some stuff with your connection
end

# Retry connections
# This will retry your code with a new connection and mark the tried
# connection as bad. The bad connection will be put back in the pool
# at the default period of 5 minutes.
pool.retry_connection_from(ServerConnectionFailed) do |connection|
  # Do some stuff with your connection
end
{% endhighlight %}
