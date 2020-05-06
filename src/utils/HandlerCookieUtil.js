export function removeAllCookieAppToLogout(cookies) {
    cookies.remove('isUpdateUserNextTime', { path: '/' });
}