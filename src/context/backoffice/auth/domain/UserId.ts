import { v4 } from "uuid";

export class UserId {
	private readonly value: string;

	constructor(value: string | null) {
		this.value = value ?? this.generateRandomUuid();
	}

	public getValue(): string {
		return this.value;
	}

	private generateRandomUuid(): string {
		return v4();
	}
}
