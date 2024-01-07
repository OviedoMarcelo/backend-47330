// UsersController.js
// This file defines the controller class for handling user-related actions.
// The controller methods communicate with the UserService class to interact with the MongoDB database.

import UserService from '../dao/user.mongodb.dao.js';

import { NotFoundException } from '../utils.js';

export default class UsersController {
    // Method to retrieve all users from the database.
    static getAll = () => {
        return UserService.getAll();
    };

    // Method to create a new user in the database.
    static create = (data) => {
        return UserService.create(data);
    };

    // Method to retrieve a user by their unique identifier (uid).
    static getById = async (uid) => {
        const user = await UserService.getById(uid);
        if (!user) {
            throw new NotFoundException('Not found');
        }
        return user;
    };

    // Method to update a user by their unique identifier (uid).
    static updateById = (uid, data) => {
        return UserService.updateById(uid, data);
    };
}