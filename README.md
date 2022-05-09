# note-app-node-js
In this repo I have created the restful api using nodejs, express and mongodb

### Author : Bhagyesh Patel

### `Mongo and Project configuration`
Please execute `setup.sh` file.

In the project directory, you can run:

### `npm install`

This will install the dependencies inside `node_modules`

### `node server.js`

Runs the app in the development mode.<br>
Open [http://localhost:9052](http://localhost:9052) to view it in the browser.

### Install using Docker

### Create Image
`docker build -f docker/Dockerfile -t note_app_node:1.0.0 .`

### Create Container
If Mongo is locally Installed
`docker-compose -f docker-compose.yml up -d`

If not, then
`docker-compose -f docker/docker-compose.yml up -d`
