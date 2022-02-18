# Getting Started

## I employed a functional approach to writing the code, using clearly defined functions that return the same output given the same input.
## __Shows Section__ 
- Shows are retrieved from the server and rendered to UI using Javascript.
- The Id retrieved from the database is assigned to the show div wrapper using a __data-__ attribute.
- It allows all children event listeners to have access to this.

## __Comments Section__
1. Comments are retrieved from the server, given their unique id using __data-__ attribute and rendered to UI.
2. New comment is validated in the front end on button press then:
      - An object is created using the comment values and timestamp. 
      - Object is submitted via POST method.
      - The POST response contains a unique id from the database.
      - The response is packaged into a new HTML comment with a unique id.
      - The HTML comment is prepended to the list of comments on the UI so only the new post is added to the UI not the entire content of the database.
3. Comments are deleted on by retrieving the id of the comment and sending a DELETE request. Only the deleted item is removed from the UI.
4. Comments are liked by retrieving the id of the comment and sending a PUT request. The response is used to update the like counter of that particular comment.
## __Known Issues__
- None.
## __Next Steps__
- Implement edit functionality: 
    - Retrieve the comment from db using id.
    - Populate fields using retrieved data.
    - Validate input on button press.
    - Submit using PATCH method.
    - (OPTIONAL) add edited label to ui and a new field to comment object e.g. edited: false => edited: true.
## __Installation instructions:__ 

- [](#) Clone this repository

```shell
git clone -b sprint-3 git@github.com:studioVMdev/valentin-manaila-bandsite.git
```
---
