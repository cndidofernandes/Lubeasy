export function getErrorResponse(error) {
    
    if(error.response){
        
        if(error.response.status === 401){
            return 'Algo muito estranho está a passar-se, por favor recarrege saia da sua conta e volte a fazer o login.'
        }else if(error.response.data){
            return error.response.data.description;
        }else{
            return 'Ophs, ocorreu um erro desconhecido.';
        }

    }else if(error.request){
        return 'Ophs, estamos com problemas na conexão com o servidor, por favor verifique a sua conexão com internet.';
    }else{
        return 'Ophs, ocorreu um erro desconhecido.';
    }

}