import { UserCode } from "./UserCode";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";

export class User {
	private readonly id: UserId;
	private readonly email: UserEmail;
	private readonly code: UserCode;

	private constructor(id: UserId, email: UserEmail, code: UserCode) {
		this.id = id;
		this.email = email;
		this.code = code;
	}

	public static create(email: string, id: string | null, code: string | null): User {
		return new User(new UserId(id), new UserEmail(email), new UserCode(code));
	}

	public getId(): string {
		return this.id.getValue();
	}

	public getEmail(): string {
		return this.email.getValue();
	}

	public getCode(): string {
		return this.code.getValue();
	}
}
