import {AuthRepository} from "../domain/AuthRepository";
import {User} from "../domain/User";
import {UserEmail} from "../domain/UserEmail";

export class PrismaAuthRepository implements AuthRepository{
    findByEmail(user: User): Promise<User | null> {
        return new Promise<User | null>((resolve, _): void => {
            resolve(user);
        });
    }
}