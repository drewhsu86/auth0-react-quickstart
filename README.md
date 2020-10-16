# How to view all the Apps and Rules on your Auth0 account

This React app implements Auth0's authentication system to allow only users on a whitelist to log in. The users who have logged in will then see a list of the apps and rules active on this particular Auth0 account. By filtering and manipulating the data, large sets of rules and applications may be sorted or visualized to help developers manage or maintain their Auth0 implementations.

# Technology Stack

Main stack - React and Javascript
Packages (npm)
  * react-router-dom
  * @auth0/auth0-react
  * axios 
  
# Run on your local machine

## Setup

To run this on your local machine, Auth0 account information, such as clientIDs, need to be linked to certain portions of the code. Please see particular sections in this setup guide for more details. An Auth0 account can be created at [Auth0's site](https://auth0.com/), and is required to complete this app. This setup guide was completed 10/16/2020.

#### Required Apps 

Auth0 allows users to create multiple applications. This allows users to have separate login systems for each project. To create an app, log in to Auth0 and go to the dashboard. Then find 'applications' on the left hand sidebar. 

Then, using the '+create application' button in the upper right, two apps need to be created. 
  * Single Web Page Application 
  * Machine to Machine Application
  
The single web page application handles the login and whitelist for the actual front end in our project. This is where the data we will obtain will be viewed by the user. The machine to machine application is for handling access to your account's management API. Basically, we need an access token to access routes on the management API. The management API needs to verify our identity to allow this. One way is for us to manually get an access token from our dashboard on the Auth0 site, which can be used for testing. However, in production applications it is best to set up a machine to machine app, then access it securely from your own app.

#### Required Rules

[Auth0 rules doc](https://auth0.com/docs/rules)

Long story short, rules are scripts that are run after a user is successfully authenticated. They can be used to add, limit or process information related to the login process. To keep it simple, we only need one rule at the moment, and it is to create a whitelist so that only certain emails




