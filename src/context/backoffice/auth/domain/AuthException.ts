export class AuthException extends Error {
	readonly code: number;
	constructor(code: number, message: string) {
		super(message);
		this.name = "AuthException";
		this.code = code;
	}
}
