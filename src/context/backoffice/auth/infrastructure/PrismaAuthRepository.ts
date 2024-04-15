import { PrismaClient } from "@prisma/client";

import { AuthRepository } from "../domain/AuthRepository";
import { User } from "../domain/User";
import { UserCode } from "../domain/UserCode";
import { UserId } from "../domain/UserId";

export class PrismaAuthRepository implements AuthRepository {
	private readonly bd: PrismaClient;

	constructor() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
		this.bd = new PrismaClient();
	}

	async findByEmail(user: User): Promise<User | null> {
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
		await this.bd.user.create({
			data: {
				id: user.getId(),
				email: user.getEmail(),
			},
		});

		await this.bd.authCodes.create({
			data: {
				user_id: user.getId(),
				code: user.getCode(),
				expires_at: new Date(Date.now() + 300000),
			},
		});

		return user;
	}

	async findByCode(code: UserCode, userId: UserId): Promise<User | null> {
		const userFound: { user: { email: string } } | null = await this.bd.authCodes.findFirst({
			select: {
				user: {
					select: {
						email: true,
					},
				},
			},
			where: {
				code: code.getValue(),
				user_id: userId.getValue(),
				expires_at: {
					gt: new Date(),
				},
			},
			orderBy: {
				created_at: "desc",
			},
		});

		if (!userFound) {
			return null;
		}

		return User.create(userFound.user.email, userId.getValue(), code.getValue());
	}
}
