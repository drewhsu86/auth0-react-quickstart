# Viewer for Apps and Rules on your Auth0 account

## Summary

This React app implements Auth0's authentication system to allow only users on a whitelist to log in. The users who have logged in will then see a list of the apps and rules active on this particular Auth0 account. By filtering and manipulating the data, large sets of rules and applications may be sorted or visualized to help developers manage or maintain their Auth0 implementations.

## App Structure 

Please see this [diagram]().

## Test Sample App 

[Sample App Hosted On Netlify](https://auth0-rules-test-ahsu.netlify.app/)

Please try out a deployed sample app with the following credentials:
  * Email: tester123@tester.test
  * Password: tester123!@#
  
Logging in with different accounts, Google accounts, or creating new accounts should say you did not successfully log in because only the tester123 user is whitelisted.

# Technology Stack

Main stack - React (using React hooks) and Javascript

Packages (npm)
  * react-router-dom
  * @auth0/auth0-react
  * axios 
  
# Run on your local machine

## Setup

To run this on your local machine, Auth0 account information, such as clientIDs, need to be linked to certain portions of the code. Please see particular sections in this setup guide for more details. An Auth0 account can be created at [Auth0's site](https://auth0.com/), and is required to complete this app. This setup guide was completed 10/16/2020.

#### NPM Packages

After cloning or downloading this repo, run 'npm install' or 'npm i'.  

#### Required Apps 

Auth0 allows users to create multiple applications. This allows users to have separate login systems for each project. To create an app, log in to Auth0 and go to the dashboard. Then find 'applications' on the left hand sidebar. 

Then, using the '+create application' button in the upper right, two apps need to be created. 
  * Single Web Page Application 
  * Machine to Machine Application
  
The single web page application handles the login and whitelist for the actual front end in our project. This is where the data we will obtain will be viewed by the user. A quickstart guide to a React Auth0 app can be found [here](https://auth0.com/docs/quickstart/spa/react). Don't forget to configure the callback URLs and logout URLs to contain 'http://localhost:3000' and 'http://localhost:3000/rules. Otherwise, the React app won't be able to access the Auth0 login app while running on your local machine. 

The machine to machine application is for handling access to your account's management API. Basically, we need an access token to access routes on the management API. The management API needs to verify our identity to allow this. One way is for us to manually get an access token from our dashboard on the Auth0 site, which can be used for testing. However, in production applications it is best to set up a machine to machine app, then access it securely from your own app.

#### Required Rules

[Auth0 rules doc](https://auth0.com/docs/rules)

Long story short, rules are scripts that are run after a user is successfully authenticated. They can be used to add, limit or process information related to the login process. To keep it simple, we only need one rule at the moment, and it is to create a whitelist so that only certain emails can log in to our app. 

To create a rule, go to the dashboard and find 'rules' on the left hand sidebar. Then click the '+create rule' button in the upper right.

Under the various rule templates, go to the 'access control' section and choose 'whitelist for a specific app'. You can change the name, and anything in the code you want, but the important things to change are to change the 'NameOfTheAppWithWhiteList' to the name of your single web page application (on line 9), as well as the emails in the 'whitelist' array (on line 13). 


#### Linking Auth0 Apps to React App

Normally it is a better practice to use environment variables instead of hard coding variables, such as client ID and client secret, in a front end application's code itself. Please see the [sample .env file](https://github.com/drewhsu86/auth0-react-ruleviewer/blob/master/.env.sample) for the environment variables required to run this project.

All the following info can be found in your dashboard > applications > select one of your applications. Fill them in as follows: 

  * REACT_APP_AUTH0_DOMAIN=Auth0 domain for your account
  * REACT_APP_AUTH0_CLIENTID=client id of your single web page application

  * REACT_APP_AUTH0API_CLIENTID=client id of your machine to machine application
  * REACT_APP_AUTH0API_CLIENTSECRET=client secret of your machine to machine application

## Run Command 

Use 'npm run start' or 'npm start' to start the React app. It typically runs on port 3000, so go to localhost:3000 on your browser if React does not redirect you there.





