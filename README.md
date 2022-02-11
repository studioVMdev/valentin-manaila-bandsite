# Getting Started

## The site uses [JSON-Server](https://github.com/typicode/json-server) to serve a local db.json.
## __Shows Section__ 
- Shows are retrieved from local db.json and painted to UI using Javascript.

## __Comments Section__
  1. Comments are retrieved from local db.json and painted to UI
  2. New comment is validated in the front end, then:
     a. sent using fetch and POST method to db.json
     b. prepended to the list of comments on the UI so only the new post is added to the UI not the entire content of the database.

### Installation instructions:  

- [](#) clone this repository

```shell
npm init
npm clone git@github.com:studioVMdev/valentin-manaila-bandsite.git
```

- [](#) install dependencies
```shell
npm install
```

- [](#) start JSON-Server and watch database
```shell 
json-server --watch ./database/db.json
```


---
