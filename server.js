var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var middleware = require('./controllers/middleware.js');
var mainCtrl = require('./controllers/mainCtrl.js');

app.use(middleware.addHeaders);

app.get('/name', mainCtrl.getName)
app.get('/location', mainCtrl.getLocation)
app.get('/occupations', mainCtrl.getOccupations)
app.get('/occupations/latest', mainCtrl.getLatestOcc);
app.get('/hobbies', mainCtrl.getHobbies)
app.get('/hobbies/:type', mainCtrl.getHobbiesType)
app.get('/family', mainCtrl.getFamily);
app.get('/family/:gender', mainCtrl.getFamilyGender);
app.get('/restaurants', mainCtrl.getRestaurants);
app.get('/restaurants/:name', mainCtrl.getRestaurantsName);

app.put('/name', mainCtrl.updateName)
app.put('/location', mainCtrl.updateLocation)
app.post('/hobbies', mainCtrl.addHobby)
app.post('/family', mainCtrl.addFamily)
app.post('/restaurants', mainCtrl.addRestaurant)

app.get('/skills', mainCtrl.getSkills)
app.post('/skills', middleware.generateId, mainCtrl.addSkill)

app.get('/secrets/:username/:pin', middleware.verifyUser, mainCtrl.getSecrets)

app.listen(3000, function() {
  console.log('listening');
});
