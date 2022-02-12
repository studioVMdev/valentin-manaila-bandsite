# Getting Started

## The site uses [JSON-Server](https://github.com/typicode/json-server) to serve a local db.json file as a database.
## __Shows Section__ 
- Shows are retrieved from local db.json and painted to UI using Javascript.
- The Id retrieved from the database is assigned to the show div wrapper using a __data-__ attribute.
- This allows for event listeners to be added to it's children, most importantly for pairing the buy ticket button wih the actual ticket in the database.

## __Comments Section__
  1. Comments are retrieved from local db.json, given their unique id using __data-__ and painted to UI.
  2. New comment is validated in the front end, then:
      - Sent using fetch and POST method to db.json 
      - Prepended to the list of comments on the UI so only the new post is added to the UI not the entire content of the database.
## __Miscelaneous__
-

## __Installation instructions:__ 

- [](#) Clone this repository

```shell
npm init
npm clone git@github.com:studioVMdev/valentin-manaila-bandsite.git
```

- [](#) Install dependencies
```shell
npm install
```

- [](#) Start JSON-Server on port 3000 and watch database
```shell 
json-server --watch --port 3000 ./database/db.json
```


---
