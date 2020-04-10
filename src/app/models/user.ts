import { Role } from './role';

export class User {
    userId: string;
    name: string;
    username: string;
    role: Role;
    token?: string;
}
