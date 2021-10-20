export type TokenProps = {
    full_name: string,
    uid: string,
    exp: number,
    role: string,
    place: string
}

export const parseJwt = (token: string): TokenProps | undefined | null => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    } catch (err) {
        return undefined;
    }
}
