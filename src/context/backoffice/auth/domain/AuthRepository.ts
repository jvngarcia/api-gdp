import { User } from "./User";

export interface AuthRepository {
	findByEmail(user: User): Promise<User | null>;
}
