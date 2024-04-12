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
        if (this.value === null || this.value === "" || this.value === undefined){
            throw new Error("Email could not empty");
        }
    }

    private ensureIsValidEmail(): void {
        if (!this.value.includes("@")) {
            throw new Error("Invalid email");
        }
    }
}
