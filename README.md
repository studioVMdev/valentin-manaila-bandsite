# Getting Started

## The site uses [JSON-Server](https://github.com/typicode/json-server) to serve a local db.json file as a database. I employed a functional approach to writing the code, using clearly defined functions that return the same output given the same input.
## __Shows Section__ 
- Shows are retrieved from local db.json and rendered to UI using Javascript.
- The Id retrieved from the database is assigned to the show div wrapper using a __data-__ attribute.
- This allows for event listeners to be added to it's children, most importantly for pairing the buy ticket button with the actual ticket in the database.

## __Comments Section__
1. Comments are retrieved from local db.json, given their unique id using __data-__ attribute and rendered to UI.
2. New comment is validated in the front end on button press then:
      - An object is created using the comment values and timestamp. 
      - Object is submitted via POST method to db.json.
      - The POST response contains a unique id from the database.
      - The response is packaged into a new HTML comment with a unique id.
      - The HTML comment is prepended to the list of comments on the UI so only the new post is added to the UI not the entire content of the database.
## __Known Issues__

- GET - works as intended on page load and retrieves the comments.
- POST - on comment submit to JSON-server, the page refreshes.
- DELETE method also refreshes the page.
- e.preventDefault() prevents as intended. I was able to confirm using an array of objects in js file.
- I was able to POST to JSON Placeholder. There is no page reload on submit therefore I believe it is a JSON-Server issue.

## __Next Steps__
- Implement delete functionality - straightforward using the unique id of each comment.
- Implement edit functionality: 
    - Retrieve the comment from db using id.
    - Populate fields using retrieved data.
    - Validate input on button press.
    - Submit using PATCH method.
    - (OPTIONAL) add edited label to ui and a new field to comment object e.g. edited: false => edited: true.
## __Installation instructions:__ 

- [](#) Clone this repository

```shell
git clone git@github.com:studioVMdev/valentin-manaila-bandsite.git
```

- [](#) Install dependencies in package.json
```shell
npm install
```

- [](#) Start JSON-Server on port 3000 and watch database
```shell 
json-server --watch --port 3000 ./database/db.json
```


---
