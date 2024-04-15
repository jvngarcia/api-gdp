import { User } from "./User";
import { UserCode } from "./UserCode";
import { UserId } from "./UserId";

export interface AuthRepository {
	findByEmail(user: User): Promise<User | null>;
	findByCode(code: UserCode, userId: UserId): Promise<User | null>;
	save(user: User): Promise<User>;
}
