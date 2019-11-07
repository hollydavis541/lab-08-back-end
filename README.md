# Code 301 Lab 08 - Persistence with a SQL database

**Author**: David Vloedman and Holly Davis  
**Version**: 1.2.0
<!-- (increment the patch/fix version number if you make more commits past your first submission) -->

## Overview
Create a node.js server that connects to APIs that provide weather, events, restaurants, and movie showing information to the City Explorer site. 

<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
1. Fork this repository
2. Clone it to your computer
3. In your command line: $ touch .env
4. Add the following to your .env file and save
PORT = 3000
GEOCODE_API_KEY = "[your api goes here]"
WEATHER_API_KEY = "[your api goes here]"
EVENT_API_KEY = "[your api goes here]"
5. Confirm that node is installed: $ node -v (if not installed, do so)
6. To start your server: $ nodemon
7. Go to city-explorer-code301.netlify.com and enter "http://localhost:3000" in the field. Search for a city and you should see the location and weather information. 

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

This is a Node.js server that uses express, dotenv, and cors packages. The server currently references two json data files in order to provide information to the client. 

## Change Log

11-07-2019 08:45 AM - database setup and table created

11-07-2019 10:30 AM - checks for location in database and saves location to database if not already there

11-07-2019 11:30 AM - database and server deployed to Heroku


<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.-->

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->


Number and name of feature: Feature #1 Database  
Estimate of time needed to complete: 30 minutes 
Start time: 08:15 AM
Finish time: 08:45 AM
Actual time needed to complete: 30 minutes

Number and name of feature: Feature #2 Server  
Estimate of time needed to complete: 60 minutes
Start time: 08:45 AM
Finish time: 10:30 AM
Actual time needed to complete: 105 minutes

Number and name of feature: Feature #3 Deploy  
Estimate of time needed to complete: 45 minutes
Start time: 11:00 AM
Finish time: 11:30 AM
Actual time needed to complete: 30 minutes