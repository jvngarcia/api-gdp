import { AuthException } from "../domain/AuthException";
import { AuthRepository } from "../domain/AuthRepository";
import { User } from "../domain/User";
import { UserCode } from "../domain/UserCode";
import { UserId } from "../domain/UserId";

export class UserValidation {
	constructor(private readonly repository: AuthRepository) {}

	async run(code: string, id: string): Promise<User> {
		const userCode: UserCode = new UserCode(code);
		const userId: UserId = new UserId(id);

		const user: User | null = await this.repository.findByCode(userCode, userId);

		if (!user) {
			throw new AuthException(400, "Invalid code");
		}

		return user;
	}
}
