const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/db');
require('./config/passport');

const app = express();
app.use(express.json());
app.use(passport.initialize());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = process.env.SERVER_PORT || 8000;

(async () => {
    try {
      await sequelize.sync();
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
      console.error('Error syncing Sequelize models:', error);
    }
  })();
