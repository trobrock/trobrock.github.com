---
layout: post
title: git, hub, and pull requests = awesome daily workflow
date: 2011-11-17
---

Recently where I work we started using personal forks of our main project to reduce the amount of left over branches and to increase amount of code review that is done.

Right now there isn't really a clear workflow for doing this, so I found something close and tweaked things as I needed. My solution allows me to effectively pull in new changes and get my changes into the code base with pull requests without ever leaving the terminal.

There are three tools I use in this workflow.

* Git
* [Hub](https://github.com/defunkt/hub) (but I am using my fork so that pull requests fully work [here](httsp://github.com/trobrock/hub)) **EDIT** No need for my fork anymore, the fix for the pull-request command was added to the main repo.
* zsh

Git is just our version control system. Hub is a wrapper for git that adds a ton of integration with [Github](https://github.com) including forking and pull requests. zsh is my shell of choice, all it is needed for here is a function I wrote that could be easily ported to bash.

### Install hub

You can install hub by doing the following:

{% highlight bash %}
curl https://github.com/downloads/trobrock/hub/hub -sLo ~/bin/hub &&
chmod 755 ~/bin/hub
{% endhighlight %}

Then to make things simpler go to the *Aliasing* section of the [README](https://github.com/trobrock/hub/blob/master/README.md) and alias git to hub, so that all of hubs commands become seemless into your normal git workflow.

### Fork the repo

Now that you have hub installed you can clone the repo that you want to fork and do pull request on with

{% highlight bash %}
git clone github_user/repo
{% endhighlight %}

Once that is cloned run:

{% highlight bash %}
git fork
{% endhighlight %}

This will fork this project to your github user, and setup a remote on this repo as your user name

### Make your changes

Now you can get ready to make your changes by creating a new branch on your fork and committing to it.

{% highlight bash %}
git checkout -b my-new-feature
git push -u my_github_user my-new-feature
{% endhighlight %}

Then just commit and push to that branch as you normally would.

### Create a Pull Request

When you are ready to create a Pull Request run

{% highlight bash %}
git pull-request
{% endhighlight %}

An editor will open up, the first line will be the title of the pull request and the following lines will fall in the description. Save and quit the editor and your pull request will be created and the URL to it will be printed to the screen.

### Clean up your branches

This last step is to keep your local and remote branches cleaned up. After the pull request is merged you will want to delete the local and remote branches with:

{% highlight bash %}
git push my_github_user :my-new-feature
git branch -d my-new-feature
{% endhighlight %}

I quickly got tired of typing that so I created a zsh function that made this easy.

{% highlight bash %}
gbd () {
  if [[ -n $1 ]]
  then
    if [[ -n $2 ]]
    then
      git push $1 :$2
      git branch -d $2
    else
      git push origin :$1
      git branch -d $1
    fi
  fi
}
compdef _git gbd=git-branch
{% endhighlight %}

Now I can run with branch tab completion:

{% highlight bash %}
gbd my_github_user my-new-feature
{% endhighlight %}

Hope this helps some people.
