/**
 * TODO: I'm going with a _really_ basic authorization scheme here.
 * I should do something more advanced if this project is successful.
 * Maybe use JWTs and session tokens?
 *
 * In development, the password is an empty string (since it doesn't exist
 * in the environment)
 */
const ADMIN_PASSWORD = process.env.TS_DATABASE_PASSWORD;

const adminOnly = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res
      .sendStatus(401)
      .json({ message: 'Please supply a password in an Authorization header' });
  }

  const password = auth.split('basic ')[1];

  if (password !== ADMIN_PASSWORD) {
    return res.sendStatus(401);
  }

  next();
};

export default adminOnly;
