const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.updateUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const updatedUser = await User.findOne({ where: { id: req.params.id } });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        updatedUser.username = username !== undefined ? username : updatedUser.username;
        updatedUser.email = email !== undefined ? email : updatedUser.email;

        if (password !== undefined) {
            updatedUser.password = await bcrypt.hash(password, 10);
        }

        await updatedUser.save();
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id },
        });

        if (deleted) {
            return res.status(204).send();
        }

        res.status(404).json({ error: 'User not found' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
