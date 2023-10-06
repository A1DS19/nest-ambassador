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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, userService, configService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            const token = request.cookies['jwt'];
            if (!token) {
                return false;
            }
            const { id, scope } = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT.SECRET'),
                maxAge: this.configService.get('JWT.EXPIRATION_DELTA'),
            });
            if (!id) {
                return false;
            }
            const user = await this.userService.findUserByField('id', id);
            if (!user) {
                return false;
            }
            request.user = user;
            if (request.path.includes('admin') && scope !== 'admin') {
                return false;
            }
            if (request.path.includes('ambassador') &&
                scope !== 'ambassador' &&
                !user.is_ambassador) {
                return false;
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        config_1.ConfigService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map