/**
 * Uses sqlite via Sequelize
 */

import Sequelize from 'sequelize';

import config from './config';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.DATABASE_PATH,
});

// Tinkersynth has no authentication process.
// Instead, a unique ID is created on the client and stored in localStorage.
// There is no authorization process; I use this model purely to group art
// together, so that I can easily find all pieces created by a specific user
// ID.
export const User = sequelize.define('user', {
  id: { type: Sequelize.UUID, primaryKey: true },
  email: Sequelize.STRING,
});

export const Order = sequelize.define('order', {
  id: { type: Sequelize.UUID, primaryKey: true },
  artParams: Sequelize.JSON,
  format: Sequelize.ENUM('print', 'vector'),
  size: Sequelize.ENUM('small', 'medium', 'large'),
  cost: Sequelize.INTEGER,
  stripeToken: Sequelize.STRING,
});

User.hasMany(Order);

// prettier-ignore
sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database created!');
  });

export default sequelize;
