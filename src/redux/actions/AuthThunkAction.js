import {getUserCookie, isAuthenticated} from "../../services/Cliente";

export function callIsAuthentication() {
    
    return (dispatch) => {
        
        if(isAuthenticated())
            dispatch({type: 'USER_IS_AUTHENTICATED'});
        else
            dispatch({type: 'USER_IS_NOT_AUTHENTICATED'});    
            
    }
}

export function callGetUser() {
    return (dispatch) => {

        dispatch({type: 'GET_USER', user: getUserCookie()});        
        
    }
}
