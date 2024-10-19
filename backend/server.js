const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authenticate = require('./routes/authRoutes');
const cors = require('cors');
const sequelize = require('./utils/database');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/' , authenticate);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => console.log(err));
