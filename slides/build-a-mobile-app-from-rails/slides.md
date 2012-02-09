# Build a Mobile application from your Rails project

!SLIDE

# Rails => Mobile app

!SLIDE left

# Our goal

* Reuse our existing backbone code
* Use the skills we already know
* Be able to quickly deploy native application to multiple platforms

!SLIDE

## Native vs. Web

* Speed
* Push Notifications
* Native look and feel

!SLIDE

## What we ended up with

A web app **and** a native application using Phonegap

In our Rails project:
``` console
  $ rake build:mobile
```

In out Xcode project:
```console
  $ rake
```

!SLIDE left

What the rake task does

* Compile our applications assets
* Extract mobile specific assets
* Manipulate paths to work in the Phonegap container
* Tar the file with the git sha it was built for
* Compile the Xcode application
* Deploy the Xcode application to TestFlight for testing

!SLIDE

# How we use it

Jenkins can now deploy to our testing server automatically

!SLIDE

#That's It, Questions?
