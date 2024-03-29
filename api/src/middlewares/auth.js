const UnauthorizedException = require('../services/errors/UnauthorizedException');

module.exports = (req, res, next) => {
  let auth = false;

  // if (req.cookies && req.cookies.profileid) {
  //   auth = true;
  //   req.profileid = +req.cookies.profileid;
  // }

  // заглушка - start
  const profileid = 1;

  if (profileid) {
    req.profileid = +profileid;
    auth = true;
  }
  // заглушка - end

  if (!auth) {
    next(new UnauthorizedException());
  }
  next();
};
