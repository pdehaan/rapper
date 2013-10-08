# Narrator

Construct api wrappers around RESTful endpoints.

## Install

```
npm install narrator --save
```

## Usage

```javascript
var Narrator = require('narrator');

var api = new Narrator({
  host: 'http://someendpoint.com'
});

// This will construct http://someendpoint.com/endpoint
var users = api.endpoint('users', {
  customMethod: function () {
    // You can have custom functionality
  }
});

users.list(function (err, usersList) {

});

// OR

users.create({name: 'frank'}, function (err, response) {
  // User created
});

// OR

users.customMethod():
```

Also, see [Narrator Examples](https://github.com/scottcorgan/narrator/tree/master/examples)


## Multi-item endpoint

Example:

```javascript
var users = api.endpoint('users');

// users.url();
// users.list();
// users.create();
// users.one();

```

### url()

Returns the url for the current endpoint

### list(callback)

Performs a ` GET ` request to the api for the given path name

* ` callback ` - gets called with the arguments
  * **err** - error object if one exists
  * **response** - the response from the server

### create(payload, callback)

Performs a ` POST ` request to the api for the given path name

* ` payload ` - the key-value object to send with the request
* ` callback ` - gets called with the arguments
  * **err** - error object if one exists
  * **response** - the response from the server

### one(id)

Creates an new single item endpoint with the given id from the mult-item endpoint path. This method returns a new object with the single item methods (see below)

* ` id ` - the id of the single item to create and endpoint form

## Single-item endpoint

Example:

```javascript
var users = api.endpoint('users');
var user = users.one(123);

// user.url();
// user.get();
// user.update();
// user.remove();
// user.endpoint();
```

### url()

Returns the url for the current endpoint

### get(callback)

### update(payload, callback)

### remove(callback)

### endpoint(name, customMethods)


## Run Tests

```
npm test
```
