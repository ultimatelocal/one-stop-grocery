# one-stop-grocery

One stop grocery a simple shopping (ember project using SASS pre processor) with ember-cli-mirage server data mocking layer.

## Prerequisites:

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## How to install ember-cli and clone repository to local machine:

## Installation
* `npm install -g ember-cli`
* `git clone <repository-url>` this repository
* `cd one-stop-grocery`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4099](http://localhost:4099).

## Quick Tour:

### Database Layer:
* JSONAPI compliant model mapping (serializer and adapter)
* All data and informations are under `one-stop-grocery/mirage/fixtures`
* Routes for models are under `one-stop-grocery/mirage/config.js`

### Application Layer:
* Using pods MVC structure for hierarchical file structure
* View, Controller,Components and Helpers are under `one-stop-grocery/app/pods/..`

### SCSS FILES:
* All scss files colors and variables are under `one-stop-grocery/app/styles/..`

### Implemented Custom Cart
* Under `one-stop-grocery/app/services/cart.js`
