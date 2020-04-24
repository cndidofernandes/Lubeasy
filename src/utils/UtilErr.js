//Login


export function getErrDescriptionLoginInPT(err) {
    switch (err) {
        case 'access_denied':
            return 'Credencias de acesso incorrectas.';

        case 'invalid_user_password':
            return 'Email ou senha inválidos.';
        
        case 'password_leaked':
            return 'Esta senha foi vazou e precisa ser altera.';
        
        case 'PasswordStrengthError':
            return 'A senha fornecida não corresponde aos requisitos de força da conexão.';
                    
        case 'too_many_attempts':
            return 'A conta está bloqueada devido a muitas tentativas de login.';
    
        case 'unauthorized':
            return 'O usuário com o qual você está tentando entrar está bloqueado.';

        default:
            return 'Ophs! Um erro desconhecido ocorreu, por favor tente novamente.';;
    }
}

//BadRequestError
export function getErrDescriptionSignUpInPTByCode(code, description) {
    switch (code) {
    
        case 'invalid_signup':
            return 'O nome de usúario ou email já foram utilizados.';
        
        case 'invalid_password':
            return 'A senha utilizada é muito fraca. Por favor tente outra.';

        case 'missing_property':
            return 'O nome de usuário apenas pode ter caracteres alfanuméricos e os seguintes caracteres: _, +, -,. ,!, #, $, ^, ~ e @.';    

        default:
            return description;
    }
}

//Resumo das vendas:
//Total de ingressos vendidos:
//Ingressos Vip vendido:
//Ingressos Normal vendido:


//SELECT COUNT(pulseira.id) as total_de_ingressos_vendido, pulseira.tipo FROM pulseira WHERE pulseira.idEvento = 7 GROUP BY pulseira.tipo