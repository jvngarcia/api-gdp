export class UserCode {
	private readonly value: string;

	constructor(value: string | null) {
		this.value = value ?? this.generateCodeSixDigits();
	}

	getValue(): string {
		return this.value;
	}

	private generateCodeSixDigits(): string {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}
}
