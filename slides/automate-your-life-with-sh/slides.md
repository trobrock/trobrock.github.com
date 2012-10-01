# automate your life with sh

!SLIDE

# automate your life with sh
\#!/bin/sh

### @trobrock
### trae@outright.com

!SLIDE

# I love ruby

Really...
``` ruby
love_ruby unless crazy?
```
Who wouldn't?

!SLIDE

# The Unix Way

> Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface.

!SLIDE

The magical unicorns of sh...

``` shell
  # Rewrite the revision file to update cloudfront cache
  sed -i'.bak' 's/294729/294729TR/' REVISION

  # Print the 5min load average
  uptime | awk -F'load averages:' '{ print $2 }' | awk '{ print $2 }'

  # Clean out .orig files from current directory and children
  find ./**/*.orig | xargs rm
```

![Unicorns](images/unicorns.jpg)

!SLIDE

# sed

a powerful stream editor, and since everything in unix uses text streams as IO (remember?) this tool is very powerful.

## Things I've used it for

``` shell
  # Install a gem in all your rvm global gemsets
  rvm list | sed 's/=>//' | awk '/\[/{print $1}' | xargs -I '{}' rvm {}@global do gem install gem_name

  # Count lines in a log file matching a regex
  sed -n '/Internal error processing import_txns/{n;p;}' agg.log | sed 's/[0-9]\{14\}//' | sort |
    uniq -c | sort -n

  # Rewrite the REVISION file to update cloudfront cache
  sed -i'.bak' 's/294729/294729TR/' REVISION
```

!NOTES

* sed -n '/Internal error processing import_txns/{n;p;}' agg.log => -n silences auto printing, {n;p;} prints the next line

!SLIDE

# awk

like grep, but by default uses more powerful regular expression and supports full scripting

## Things I've used it for

``` shell
  # watch every 10 seconds MySQL query ids and times that have been running longer than 60 seconds
  watch -n10 "mysql -uroot -e 'show processlist' | awk '/Query/{ print \$1 \" \" \$6}' |
    grep -E '[0-9]+ ([6-9][0-9]|[0-9]{3,})'"

  # Kill MySQL queries that have been running for longer than 60 seconds
  mysql -uroot -e 'show processlist;' | grep -v 'root' | awk '/Query/i{ print $1 " " $6 }' |
    grep -E '([0-9]+) ([6-9][0-9]|[0-9]{3,})' | awk '{print $1}' | xargs -I '{}' mysql -uroot -e 'kill {} ;'

  # Download production logs for a specific month
  ./s3cmd ls s3://production-outright-com/logs/acc/production/ | awk '/2011-05-[0-9][0-9]/{print $4}' |
    grep -v production_log | xargs -I '{}' ./s3cmd get '{}' ~/t/
```

!SLIDE

# xargs

for those programs that dont take stdin, or need the argument to go in a non standard place

## Things I've used it for

Just look above
``` shell
  # Install a gem in all your rvm global gemsets
  rvm list | sed 's/=>//' | awk '/\[/{print $1}' | xargs -I '{}' rvm {}@global do gem install gem_name

  # Kill MySQL queries that have been running for longer than 60 seconds
  mysql -uroot -e 'show processlist;' | grep -v 'root' | awk '/Query/i{ print $1 " " $6 }' |
    grep -E '([0-9]+) ([6-9][0-9]|[0-9]{3,})' | awk '{print $1}' | xargs -I '{}' mysql -uroot -e 'kill {} ;'

  # Run all report tests
  find test/unit/outright/{base_report_test.rb,report/**/*.rb} |
    xargs ruby -I"lib:test" "/Library/Ruby/Gems/1.8/gems/rake-0.8.7/lib/rake/rake_test_loader.rb"
```

!SLIDE

# What are the downsides?

* No floating point math `ruby -e 'print $1.to_f + $2.to_f'`
* Slightly different syntax when using higher level programming functions (zsh vs. bash)

![Facepalm](images/tux-facepalm.jpg)

Stick to sh level code and things will work everywhere generally.

!SLIDE

# Automate your life

* deploy alias [[code](code/deploy.sh)]
* ssh to server alias [[code](code/ssh-server.sh)]

!SLIDE

# Questions?

> http://blog.trobrock.com/slides/automate-your-life-with-sh/slides.html
