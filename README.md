
#PAMM Skeleton

##Contents
1. [About](#about)
2. [Technology Stack](#technology-stack)
3. [Installation Instructions](#installation-instructions)
   1. [Basic](#basic)
   2. [IntelliJ](#intellij)
   3. [MongoDB](#mongodb)
      * [Configuration](#configuration)

## About
The PAMM Skeleton project is a quick start, template project using the PAMM stack. It is designed to be barebones so that developers can download and start coding business requirements rapidly with no set-up required.
The project is based off the "hello-play-2.3-scala" template provided within Activator, however *significant* changes have been made.

##Technology Stack
- Scala
- Play 2.4.3
- SBT 0.13.8
- Angular 1.5.5
- Bootstrap 3.3.6
- MongoDB (sample integration provided via Casbah)

##Installation Instructions

**Note: Running the 'sbt' commands from behind the Atos Proxy may result in compilation errors, if sbt needs to download missing dependencies** 

###Basic
1. `git clone` <repo address>
2. Browse to the directory root
3. `sbt compile` to ensure the solution builds
4. `sbt run` to start the application
5. Browse to `http://localhost:9000` from your browser to see the application

###IntelliJ
1. Complete the steps above to download the solution
2. Import the project into IntelliJ
   1. Open IntelliJ
   2. Select 'Open'
   3. Select the root folder of the project
   4. Select to import as an SBT project
   5. Select 'auto import'
3. Configure IntelliJ to run the project
   1. Go to "Run" on the menu
   2. Select 'Edit Configurations'
   3. Add a new configuration by processing the + button in the top left
   4. Select 'SBT Task'
   5. Set the 'Name' to be "SBT Run"
   6. Set the 'task' to be "clean compile run"
   7. Remove 'Make' from the 'Before Launch' tasks
   8. Click Apply and close the menu
4. You can now run/debug the application using the "SBT Run" option from the IntelliJ Run menu

###MongoDB
This project includes [Casbah](https://github.com/mongodb/casbah), a Scala toolkit for MongoDB. It's usage is optional, and it can be replaced with a suitable alternative if required. A controller has been provided with an example of simple database interactions, and should be adapted or removed as needed.

####Configuration
There are 3 options for configuring which MongoDB instance the application uses:
 1. Set the `$MONGODB_URI` environment variable to the appropriate URI, this will be taken over the defaults set within `application.conf`.
 2. Change the target MongoDB URI within the `application.conf` file. Altering the first instance of `mongodb.uri` will change the default instance of MongoDB used by the application providing the environment variable is not present.
 3. Leave it as the default, which assumes the database is running on localhost under the default port (27017).

More detail on MongoDB URIs can be found at:
https://docs.mongodb.com/manual/reference/connection-string/
