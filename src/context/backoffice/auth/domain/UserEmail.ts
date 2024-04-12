export class UserEmail {
	private readonly value: string;

	constructor(value: string) {
		this.value = value;
		this.ensureIsValidEmail();
	}

	public getValue(): string {
		return this.value;
	}

	private ensureIsValidEmail(): void {
		if (!this.value.includes("@")) {
			throw new Error("Invalid email");
		}
	}
}
