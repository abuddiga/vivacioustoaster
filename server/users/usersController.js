const User = require('./users/usersController.js');
const Q = require('q');
const jwt = require('jwt-simple');
const helper = require('./config/helpers.js');

module.exports = {
  findOrCreate: (profile) => {
    const name = profile.displayName;
    const picture = profile.photos[0].value;
    const fbId = {
      fbId: profile.id,
    };

    User.findOne(fbId)
      .then((match) => {
        // create user if there's no match
        if (!match) {
          const newUser = {
            name,
            fbId,
            picture,
          };
          return User.create(newUser);
        }
        // if user already exists, update user entry in the database
        const updatedInfo = {
          name,
          picture,
        };
        return match.update(updatedInfo)
        .then((data) => data)
        .catch(error => {console.error('findOrCreate error: ', error);});
      })
      .fail((error) => {
        console.error('findOrCreate error: ', error);
      });
  },
};
