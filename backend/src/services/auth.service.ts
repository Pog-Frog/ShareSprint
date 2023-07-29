import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { JWT_SECRET } from '../config';
import { HttpException } from '../exceptions/httpsExceptions';
import { UserModel } from '../models/user.model';
import { User } from '../interfaces/user.interface';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { sendEmailVerification } from "../utils/emailer";
import { VerificationTokenModel } from '../models/verification_tokens.model';


const createToken = (user: User): TokenData => {
    const expiresIn = 60 * 60 * 24 * 7; // 7 days
    const DataStoredInToken: DataStoredInToken = {
        _id: user._id
    };
    return {
        expiresIn,
        token: sign(DataStoredInToken, JWT_SECRET, { expiresIn })
    };
}

const creatHTTPCookie = (tokenData: TokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}

@Service()
export class AuthService {
    public async signup(userData: User): Promise<User> {
        const findUser: User = await UserModel.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `The email ${userData.email} already exists`);

        const findUsername: User = await UserModel.findOne({ username: userData.username });
        if (findUsername) throw new HttpException(409, `The username ${userData.username} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const createdUser: User = await UserModel.create({
            ...userData,
            password: hashedPassword
        });

        const token = sign({ _id: createdUser._id }, JWT_SECRET, { expiresIn: '30m' });
        await sendEmailVerification(createdUser.username, createdUser.email, token).catch((err) => {
            throw new HttpException(409, "Email Verification not sent");
        }).then(async () => {
            const verificationToken = await VerificationTokenModel.create({
                token: token,
                email: createdUser.email
            }).catch((err) => {
                throw new HttpException(409, "Email Verification not sent");
            });
        });

        return createdUser;
    }

    public async login(userData: User): Promise<{ findUser: User; cookie: string; tokenData: TokenData }> {
        const findUser: User = await UserModel.findOne({ email: userData.email });
        if (!findUser) throw new HttpException(409, `The email you entered doesn't belong to an account.`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "Invalid email or password");

        if (!findUser.email_verified) throw new HttpException(409, "Please verify your email");

        const tokenData = createToken(findUser);
        const cookie = creatHTTPCookie(tokenData);

        return { findUser, cookie, tokenData };
    }

    public async logout(userData: User) {
        const findUser: User = await UserModel.findOne({ email: userData.email });
        if (!findUser) throw new HttpException(409, `The email you entered doesn't belong to an account.`);

        return "Logged out successfully";
    }
}
