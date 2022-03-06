# Getting Started

## The app is refactored using OOP paradigm and JS modules.

## **Shows Section**

- Shows are retrieved from the server and rendered to UI using Javascript.
- The Id retrieved from the database is assigned to the show div wrapper using a **data-** attribute.
- It allows all children event listeners to have access to this.

## **Comments Section**

1. Comments are retrieved from the server, given their unique id using **data-** attribute and rendered to UI.
2. New comment is validated in the front end on button press then:
   - An object is created using the comment values and timestamp.
   - Object is submitted via POST method.
   - The POST response contains a unique id from the database.
   - The response is packaged into a new HTML comment with a unique id.
   - The HTML comment is prepended to the list of comments on the UI so only the new post is added to the UI not the entire content of the database.
3. Comments are deleted on by retrieving the id of the comment and sending a DELETE request. Only the deleted item is removed from the UI.
4. Comments are liked by retrieving the id of the comment and sending a PUT request. The response is used to update the like counter of that particular comment.

## **Known Issues**

- None.

## **Next Steps**

- Implement edit functionality:
  - Retrieve the comment from db using id.
  - Populate fields using retrieved data.
  - Validate input on button press.
  - Submit using PATCH method.
  - (OPTIONAL) add edited label to ui and a new field to comment object e.g. edited: false => edited: true.

## **Installation instructions:**

- [](#) Clone this repository

```shell
git clone -b sprint-4 git@github.com:studioVMdev/valentin-manaila-bandsite.git
```

- [](#) Install dependencies in package.json

```shell
npm install
```
