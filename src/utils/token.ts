export const parseJwt = (token: string): any | undefined | null => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    } catch (err) {
        return undefined;
    }
}
