import {User} from "./User";
import {UserEmail} from "./UserEmail";

export interface AuthRepository {
    findByEmail(user: User): Promise<User | null>;
}