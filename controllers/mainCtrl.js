var user = require('../user.js');
var skills = require('../skillz.js');
var secrets = require('../secrets.js');


module.exports = {
  getSkills: function(req,res,next) {
    if(req.query.experience) {
      res.json({skills:skills.filter(function(skill) {
        return req.query.experience === skill.experience
      })})
    }
    else {
      res.json({skills:skills})
    }
  },
  addSkill: function(req,res,next) {
    skills.push(req.body);
    res.json({skills:skills})
  },
  getSecrets: function(req,res,next) {
    res.json({secrets: secrets})
  },
  getName: function(req, res, next) {
    res.json({name:user.name});
  },
  getLocation: function(req,res,next) {
    res.json({location:user.location});
  },
  getOccupations: function(req,res,next) {
    if(req.query.order === 'desc') {
      res.json({occupations:user.occupations.sort()})
    }
    if(req.query.order === 'asc') {
      res.json({occupations:user.occupations.sort().reverse()})
    }
    else {
    res.json({occupations:user.occupations})
  }
  },

  getLatestOcc: function(req,res,next) {
    res.json({occupations:user.occupations[user.occupations.length -1]})
  },
  getHobbies: function(req,res,next) {
    res.json({hobbies:user.hobbies})
  },
  getHobbiesType: function(req,res,next) {
    var reqtype = req.params.type;
    var typed = user.hobbies.filter(function(hobby) {
      return reqtype === hobby.type;
  })
    res.json({hobbies: typed});
  },
  getFamily: function(req,res,next) {
    if(req.query.relation) {
      var reqrel = req.query.relation;
      var found = user.family.filter(function(rel) {
        return rel.relation === reqrel;
      })
      res.json({family: found})
    }
    else {
    res.json({family:user.family})
  }
  },
  getFamilyGender: function(req,res,next) {
    res.json({family:user.family.filter(function(rel) {
      return rel.gender === req.params.gender
    })})
  },
  getRestaurants: function(req,res,next) {
    if(req.query.rating) {
      res.json({restaurants:user.restaurants.filter(function(restaurant) {
        return parseFloat(restaurant.rating) >= req.query.rating
      })})
    }
    else {
      res.json({restaurants:user.restaurants})
    }
  },
  getRestaurantsName: function(req,res,next) {
    res.json({restaurant:user.restaurants.filter(function(restaurant) {
      return req.params.name === restaurant.name;
    })})
  },
  updateName: function(req,res,next) {
    user.name = req.body.name;
    res.json({name:user.name})
  },
  updateLocation: function(req,res,next) {
    user.location = req.body.location;
    res.json({location:user.location})
  },
  addHobby: function(req,res,next) {
    user.hobbies.push(req.body.hobby)
    res.json({hobbies:user.hobbies})
  },
  addFamily: function(req,res,next) {
    user.family.push(req.body.family)
    res.json({family:user.family})
  },
  addRestaurant: function(req,res,next) {
    user.restaurants.push(req.body.restaurant)
    res.json({restaurants:user.restaurants})
  }


}
