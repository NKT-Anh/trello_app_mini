export interface User{
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
    googleId?: string;
    createdAt?: string;
    updatedAt?: string;
}
