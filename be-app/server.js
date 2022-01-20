require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var corsOptions = {
//     origin: 'http://localhost:8080',
//     optionsSuccessStatus: 200,// For legacy browser support,
//     methods: "GET, PUT"
// }
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/package', require('./users/package.controller'));
app.use('/role', require('./role/role.controller'));

// global error handle
app.use(errorHandler);

// start server
const port = process.env.PORT;
const server = app.listen(port, function () {
	console.log('user-management server listening on port ' + port);
});
