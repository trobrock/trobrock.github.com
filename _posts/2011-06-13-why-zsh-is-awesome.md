---
layout: post
title: Why zsh is awesome
date: 2011-06-13
---

Just some quick thoughts on why I love zsh so much more than bash.

##method_missing

I am constantly typing things like: `cat somefile | sometext` I just missed that grep before `sometext`. That is where zsh's method_missing type functionality comes in.

```
function command_not_found_handler() {
  /usr/bin/grep $*
}
```

While sometimes this doesn't quite work, you get the idea you could really do some powerful things.

##Command history, pressing up doesn't have duplicate commands

Something that bugs me about bash is when I type something like `dig somedomain.com` 5 times while waiting for the DNS record to update, and I push the up arrow to go to a command in my history before the dig command I have to press the up arrow 5 times. Not in zsh it uniquifies the command history so I would only have to press up once to get to the command I want.

##Fixing of mis-spelled commands

I am not a good typist and am constantly type `xit` or `bim`, thankfully zsh will ask if I want to correct these to `exit` and `vim`

##The ability to modify your command line eg. having your current git branch on the command line

In my dotfiles collection I have some great zsh modifications, Ryan Bates wrote the original files, which includes a function to add my currently checked out git branch to the front of my command prompt to I now see:

```
/some/path[master]$
```

Cons:

##Have to work around other tools sometimes eg. rake and bundler

Granted all zsh's awesomeness, it does have some problems. Being that most people use bash alot of times tools can break in zsh. Recently I have had problems with rake, occasionally bundler, and the Fugitive plugin in MacVim. The Fugitive plugin has been fixed, and that is generally how things go if you have problems submit a bug and they are usually fixed. Or the problem is enough of an inconvenience to matter.
