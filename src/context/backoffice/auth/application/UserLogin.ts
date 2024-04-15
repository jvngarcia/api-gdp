import { AuthRepository } from "../domain/AuthRepository";
import { User } from "../domain/User";

export class UserLogin {
	constructor(private readonly repository: AuthRepository) {}

	async run(email: string): Promise<User> {
		const userTemp: User = User.create(email, null, null);
		const user: User | null = await this.repository.findByEmail(userTemp);

		if (!user) {
			throw new Error("User not found");
		}

		// TODO: send email - domain event with code to access

		return user;
	}
}
