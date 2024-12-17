export interface User {
    email: string;
    token: string;
    tokenExpiration: number;
}

export interface UserAuth {
    email: string;
    password: string;
}