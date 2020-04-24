export function registerPastLocation(state = 0, action) {
    switch (action.type) {
        case 'ADD_MORE_ONE_LOCATION_IN_STACK':
            state = state+1;
            return state;
        default:
            return 0;
    }   
}