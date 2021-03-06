export const databaseStatus = {
    ENTITY_CREATED: 'Entity Created',
    ENTITY_MODIFIED: 'Entity Modified',
    ENTITY_FETCHED: 'Entity Fetched',
    ENTITY_DELETED: 'Entity Deleted',
    DATABASE_CONNECTED: 'Database connected successfully',
    DATABASE_ERROR: 'Database error'
};

export const controllerStatus = {
    BAD_REQUEST: 'Required fields missing',
    TOKEN_MISSING: 'Token missing from header',
    TOKEN_INVALID: 'Invalid token'
};

export const serviceStatus = {
    USER_CREATED_SUCCESSFULLY: 'User created successfully',
    USER_LIST_FETCHED_SUCCESSFULLY: 'User list fetched successfully',
    USER_FETCHED_SUCCESSFULLY: 'User fetched successfully',
    USER_UPDATED_SUCCESSFULLY: 'User updated successfully',
    USER_DELETED_SUCCESSFULLY: 'User deleted successfully',
    USER_AUTHENTICATED_SUCCESSFULLY: 'User authenticated successfully',
    INVALID_CREDENTIALS: 'Name or password is incorrect'
};

export const errorResponseObject = {
    status: 500,
    message: 'Internal server error',
    body: {}
}
