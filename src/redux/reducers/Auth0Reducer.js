export function isAuthenticated(state = null, action) {

    switch (action.type) {
        case 'USER_IS_AUTHENTICATED':
            state = true;
            return state;
        case 'USER_IS_NOT_AUTHENTICATED':
            state = false;
            return state;
        default:
            return state;
    }
}

export function getUser(state = {nickname: 'Buscando...', email: 'Buscando...'}, action) {

    switch (action.type) {
        case 'GET_USER':
            state = action.user;
            return state;
        default:
            return state;
    }
}