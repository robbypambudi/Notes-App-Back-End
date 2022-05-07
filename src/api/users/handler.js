/* eslint no-underscore-dangle: 0 */

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const ClientError = require('../../exceptions/ClientError');

class UserHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        // Prototype
        this.postUserHandler = this.postUserHandler.bind(this);
        this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
        this.getUsersByUsernameHandler = this.getUsersByUsernameHandler.bind(this);
    }

    async postUserHandler(request, h) {
        try {
            this._validator.validatorUserPayload(request.payload);
            const { username, password, fullname } = request.payload;

            const userId = await this._service.addUser({ username, password, fullname });

            return h
                .response({
                    status: 'success',
                    message: 'User berhasil ditambahkan',
                    data: {
                        userId,
                    },
                })
                .code(201);
        } catch (error) {
            if (error instanceof InvariantError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });

                response.code(error.statusCode);
                return response;
            }

            // Server Error
            console.log(error);
            return h
                .response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                })
                .code(500);
        }
    }

    async getUserByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const user = await this._service.getUserById(id);

            const response = h.response({
                status: 'success',
                data: {
                    user,
                },
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof NotFoundError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });

                response.code(error.statusCode);
                return response;
            }

            // Server Error
            console.log(error);
            return h
                .response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                })
                .code(500);
        }
    }

    async getUsersByUsernameHandler(request, h) {
        try {
            const { username = '' } = request.query;
            const users = await this._service.getUsersByUsername(username);
            return {
                status: 'success',
                data: {
                    users,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = UserHandler;
