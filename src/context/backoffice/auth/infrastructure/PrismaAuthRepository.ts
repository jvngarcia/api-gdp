import { PrismaClient } from "@prisma/client";

import { AuthRepository } from "../domain/AuthRepository";
import { User } from "../domain/User";

export class PrismaAuthRepository implements AuthRepository {
	private readonly bd: PrismaClient;

	constructor() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
		this.bd = new PrismaClient();
	}

	async findByEmail(user: User): Promise<User | null> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		const userFound: { email: string; id: string } | null = await this.bd.user.findFirst({
			select: {
				email: true,
				id: true,
			},
			where: {
				email: user.getEmail(),
			},
		});

		if (!userFound) {
			return null;
		}

		return User.create(userFound.email, userFound.id, null);
	}

	async save(user: User): Promise<User> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		await this.bd.user.create({
			data: {
				id: user.getId(),
				email: user.getEmail(),
			},
		});

		return user;
	}
}
