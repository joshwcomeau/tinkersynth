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
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  format: Sequelize.ENUM('print', 'vector', 'combo'),
  size: Sequelize.ENUM('small', 'medium', 'large'),
  cost: Sequelize.INTEGER,
  artParams: Sequelize.JSON,
  chargeId: Sequelize.STRING,
  // Shipping address
  shipTo: Sequelize.STRING,
  streetAddress: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  country: Sequelize.STRING,
  zipCode: Sequelize.STRING,
});

User.hasMany(Order);
Order.belongsTo(User);

// prettier-ignore
sequelize
  .sync({ force: true })
  .then(() => {
    console.info('Database created!');
  });

export default sequelize;
