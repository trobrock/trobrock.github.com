#!/usr/bin/env ruby

require 'stringex'

title = ARGV.first
date = "#{Time.now.year}-#{Time.now.month}-#{Time.now.day}"
file_name = "#{date}-#{title.to_url}.md"
File.open(File.join("_posts", file_name), 'w') do |f|
  f.puts "---"
  f.puts "layout: post"
  f.puts "title: #{title}"
  f.puts "date: #{date}"
  f.puts "---"
end

puts "Created #{file_name}"
