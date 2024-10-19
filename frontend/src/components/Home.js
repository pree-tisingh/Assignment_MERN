import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../store/userSlice';
import '../styles/Home.css'; 

const HomePage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    const [editingUserId, setEditingUserId] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({ username: '', email: '' });

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handleEdit = (user) => {
        setEditingUserId(user.id);
        setUpdatedUser({ username: user.username, email: user.email }); 
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (editingUserId) {
            dispatch(updateUser({ id: editingUserId, user: updatedUser }));
            setEditingUserId(null); 
            setUpdatedUser({ username: '', email: '' });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <h1>User List</h1>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <span>{user.username} - {user.email}</span>
                        <div>
                            <button className="edit" onClick={() => handleEdit(user)}>Edit</button>
                            <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingUserId && (
                <form className="update-form" onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div>
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={updatedUser.username}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={updatedUser.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit">Update User</button>
                    <button type="button" className="cancel" onClick={() => setEditingUserId(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default HomePage;
