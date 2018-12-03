# Name of Application

Grocery app that digitizes the shopping list. Grocery categories are organized in stores so that when you select a particular store to shop at, the grocery list is ordered by those categories. Preloaded with categories and general grocery items. Users can add their own items, categories, and stores.

## Built With

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and tables

Create a new database called `prime_app`.

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

- Follow the `database.sql` file instructions to setup the basic structure of the database.
- Run the following INSERT to load the base categories.

```SQL
INSERT INTO "base_category" ("name")
VALUES ('Dairy'), ('Refrigerated'), ('Produce'), ('Meat'), ('Seafood'), ('Deli'), ('Baking'),
('Frozen'), ('Snacks'), ('Condiments'), ('Rice/Grains'), ('Canned Goods'),
('Spices/Oils'), ('Breakfast'), ('Coffee/Tea'), ('Beverages'), ('Baked Goods'), 
('Cheese'), ('Personal Care'), ('Cleaning Supplies'), ('Kitchen Supplies'), ('Pet Care')
```
- Import the following file into the base_items table.

common-grocery-items.csv


## Setup database stored procedures and triggers

- Use the database-storedprocedures.sql file to setup the triggers and stored procedures.

### Installing

Steps to get the development environment running.

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Screen Shot


### Completed Features

High level list of items completed.

- [x] Register/Login
- [x] Store Admin
- [x] Category Admin
- [x] Item Admin
- [x] Create List
- [x] Shopping List

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Combine admin for category and items.

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Rhonda Stark


## Acknowledgments

* Hat tip to anyone who's code was used