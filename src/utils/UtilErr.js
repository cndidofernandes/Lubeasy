//Login


export function getErrDescriptionLoginInPT(err) {
    switch (err) {
        case 'access_denied':
            return 'Credencias de acesso incorrectas.';

        case 'invalid_user_password':
            return 'Email ou senha inválidos.';
        
        case 'password_leaked':
            return 'Esta senha vazou e precisa ser altera.';
        
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
            return 'O nome de usúario ou email já foram utilizados na criação de uma conta. Por favor utilize outro email ou nome de usúario.';
        
        case 'invalid_password':
            return 'A senha utilizada é muito fraca. Por favor, tente outra colocando alguns símbolos, letras e números.';

        case 'missing_property':
            return 'Nome de usuário inválido. O nome de usuário não pode conter espaços nem acentuação.';

        default:
            return description;
    }
}

//Resumo das vendas:
//Total de ingressos vendidos:
//Ingressos Vip vendido:
//Ingressos Normal vendido:


//SELECT COUNT(pulseira.id) as total_de_ingressos_vendido, pulseira.tipo FROM pulseira WHERE pulseira.idEvento = 7 GROUP BY pulseira.tipo