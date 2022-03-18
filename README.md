# Final Project for Udacity CLoud Delevopment course
## The project is being created as a portfolio final project combining knowledge from AWS, JS Node express, Frontend and backend

This project is basic project providing service for buying games and also uploading your game.
It consists of users - who have to login in order to buy/ upload game you need to make an account.
Your account is being given ***100 $*** for buying games!
When you login you will see games that you can buy. Just press buy and you will find the game when you ***click on your profile name***!

In Order to add money just click on ***add money*** button and add input!
To go back to the menu click on next to ***TedoSteam*** and goback to Home!

How To connect: *** http://a84bcdf59a3fc47ab9d9b73741a0da03-1128118364.us-east-1.elb.amazonaws.com  ***

Issue: If you have problem with the path: delete /home or /useritems in case you reload the browser

## How it was being deployed?

On the backend side we have:
    - feed-api - which shows the Home feed with games
    - user-api - which allows you to login and buy games!
    - frontend-api - Angular frontend
    - reverseproxy - proxy service

The whole project is being deployed in with AWS EKS.

Use services:
    - S3 bucket
    - PostgresSQL
    - AWS EKS
    - For CD/CI - Travis CL


## To Run int in your local system?

In this folder there is docker-compose.yaml. 

In this file you have to set your own ***ENVIROMENT VARIABLES***

- POSTGRES_USERNAME
- POSTGRES_HOST
- POSTGRES_PASSWORD
- POSTGRES_DATABASE 
- AWS_REGION
- AWS_PROFILE
- AWS_BUCKET
- JWT_SECRET

They have to be configured in order to connect to Database and storage service!

Check folder ***images*** for evaluation of my deployment.
Check folder ***deployment*** for EKS deployment files.