import { AuthRepository } from "../domain/AuthRepository";
import { User } from "../domain/User";

export class UserLogin {
	constructor(private readonly repository: AuthRepository) {}

	async run(email: string): Promise<boolean> {
		const userTemp: User = User.create(email, null, null);
		let user: User | null = await this.repository.findByEmail(userTemp);

		if (!user) {
			user = await this.repository.save(userTemp);
		}

		// TODO: send email - domain event with code to access

		// eslint-disable-next-line no-console
		console.log(user.getEmail());
		// eslint-disable-next-line no-console
		console.log(user.getCode());

		return true;
	}
}
