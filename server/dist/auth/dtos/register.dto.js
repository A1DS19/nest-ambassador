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
exports.RegisterDTO = void 0;
const class_validator_1 = require("class-validator");
class RegisterDTO {
}
__decorate([
    (0, class_validator_1.Length)(2, 20, {
        message: 'first name must be between 2 and 20 characters',
    }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.Length)(2, 20, {
        message: 'last name must be between 2 and 20 characters',
    }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({
        host_blacklist: [
            'mailinator.com',
            'guerrillamail.com',
            '10minutemail.com',
        ],
    }, {
        message: 'invalid email',
    }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'password is too weak, it must be at least 8 characters, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol',
    }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'password is too weak, it must be at least 8 characters, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol',
    }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "password_confirm", void 0);
exports.RegisterDTO = RegisterDTO;
//# sourceMappingURL=register.dto.js.map