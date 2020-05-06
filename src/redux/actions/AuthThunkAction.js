import { isAuthenticated, getUser } from "../../utils/Auth-spa";
import {updateUser} from "../../services/Cliente";

export function callIsAuthentication() {
    
    return (dispatch) => {
        isAuthenticated().then((value) => {
            if(value)
                dispatch({type: 'USER_IS_AUTHENTICATED'});
            else
                dispatch({type: 'USER_IS_NOT_AUTHENTICATED'});
        }).catch(function () {
            dispatch({type: 'USER_IS_NOT_AUTHENTICATED'});
        });
    }
}

export function callGetUser() {
    return (dispatch) => {
        getUser().then( (value) => {
            if (value['https://other.info.user/loginsCount'] <= 2) updateUser(value);

            dispatch({type: 'GET_USER', user: value ? value : null});
        }).catch(function () {
            dispatch({type: 'GET_USER', user: null});
        });
        
    }
}