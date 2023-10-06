"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(user, isAmbassador) {
        const foundUser = await this.userService.findUserByField('email', user.email);
        if (foundUser) {
            throw new common_1.BadRequestException('Email is already taken');
        }
        const hashedPassword = await this.hashPassword(user.password);
        delete user.password_confirm;
        const formattedUser = Object.assign(Object.assign({}, user), { is_ambassador: isAmbassador, password: hashedPassword });
        const newUser = await this.userService.save(formattedUser);
        return newUser;
    }
    async login(user) {
        const foundUser = await this.userService.findUserByField('email', user.email);
        if (!foundUser) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const isPasswordMatching = await this.comparePasswords(user.password, foundUser.password);
        if (!isPasswordMatching) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const jwt = await this.jwtService.signAsync({
            id: foundUser.id,
            scope: foundUser.is_ambassador ? 'ambassador' : 'admin',
        }, {
            secret: this.configService.get('JWT.SECRET'),
            expiresIn: this.configService.get('JWT.EXPIRATION_DELTA'),
        });
        return { token: jwt };
    }
    async getAuthenticatedUser(token) {
        if (!token) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const { id } = await this.jwtService.verifyAsync(token);
        const user = await this.userService.findUserByField('id', id);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async hashPassword(password) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    async comparePasswords(password, storedPasswordHash) {
        const match = await bcrypt.compare(password, storedPasswordHash);
        return match;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map