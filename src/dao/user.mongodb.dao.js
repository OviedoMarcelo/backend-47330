// User DAO module. It contains functions for CRUD operations.

import UserModel from '../models/user.model.js'

export default class UserDao {

    // Create a new user in the database.
    create = (data) => {
        return UserModel.create(data)
    }

    // Get all users from the database.
    getall = () => {
        return UserModel.find();
    }

    // Get a user by ID from the database.
    getById = (uid) => {
        return UserModel.findById(uid);
    }

    // Update a user by ID in the database.
    updateById = (uid, data) => {
        return UserModel.updateOne({ _id: uid }, { $set: data })
    }

    // Delete a user by ID from the database.
    deleteById = (uid) => {
        return UserModel.deleteOne({ _id: uid })
    }

}