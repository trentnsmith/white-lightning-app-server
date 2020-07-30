# White Lightning API

Link to live app: https://white-lightning-app.vercel.app/

## Summary

This API allows a user to view information about distilleries in Omaha, NE, and see the types of spirits offered at the distilleries. 

# Endpoint Documentation

## GET Spirits

Returns information about all spirits in the database

**Method:** GET

**URL:**  https://floating-scrubland-72191.herokuapp.com/api/spirits

**Example Response:** 

Status: 200 OK

    {
        "id": 36,
        "spirit_name": "Honest American",
        "content": "\"Straight up, un aged goodness! Aged for 7 days on new oak, this 100% malted barley lends an assertive grain flavor with firm sweetness.\"",
        "age": "7 days",
        "abv": "90%",
        "category": "White Whisky",
        "distillery_id": 1,
        "distillery_name": "Brickway Brewery and Distillery",
        "website": "www.drinkbrickway.com",
        "description": "Located in the heart of Omaha’s Old Market District, Brickway Brewery & Distillery taps into Omaha’s rich history by handcrafting beer and spirits                              that are as tried-and-true as the brick paved streets"
    }
    
## Add a new spirit 

Adds a new spirit to the database

**Method:** POST

**URL:** https://floating-scrubland-72191.herokuapp.com/api

**Example:** POST

**Example Respone:** STATUS 201

## Remove a spirit

Removes a spirit and it's data from the database.

**Method:** DELETE

**URL:** https://floating-scrubland-72191.herokuapp.com/api

**Example Response:** STATUS 204

## Screenshots

Landing Page. A user can click on anyone of the links to get started:

![image](https://user-images.githubusercontent.com/58092710/88878433-9b3ad580-d1ed-11ea-85b9-f9005a093ea1.png)

Distillery Page. A user can read a little about the distilleries in the local area, and click a link to check out the website:

![image](https://user-images.githubusercontent.com/58092710/88878472-af7ed280-d1ed-11ea-969d-bc0ec3b1e5a8.png)

Spirits Page. A user can read a little about all of the types of spirits the the distilleries have to offer. A user can also delete an item if they choose:

![image](https://user-images.githubusercontent.com/58092710/88878496-bb6a9480-d1ed-11ea-9372-5635d4bdec2b.png)

Add Spirits Page. A user can add a new spirit to the database:

![image](https://user-images.githubusercontent.com/58092710/88878524-c8878380-d1ed-11ea-8180-053a33b33493.png)

About Page. A user can read a little about the history of distilling in Omaha, NE and where the term "White Lightning" comes from:

![image](https://user-images.githubusercontent.com/58092710/88878559-d76e3600-d1ed-11ea-870b-8177ab50cdbe.png)

## Technology

React, Express, Axios, Helmet, Knex, Morgan, Winston, XSS, Chai, Postgrator, Mocha, Supertest
