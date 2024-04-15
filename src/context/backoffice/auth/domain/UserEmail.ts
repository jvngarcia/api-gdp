import { AuthException } from "./AuthException";

export class UserEmail {
	private readonly value: string;

	constructor(value: string) {
		this.value = value;
		this.ensureIsNotNull();
		this.ensureIsValidEmail();
	}

	public getValue(): string {
		return this.value;
	}

	private ensureIsNotNull(): void {
		if (this.value === "") {
			throw new AuthException(400, "Email could not empty");
		}
	}

	private ensureIsValidEmail(): void {
		if (!this.value.includes("@")) {
			throw new AuthException(400, "Invalid email");
		}
	}
}
