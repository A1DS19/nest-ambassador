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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkController = void 0;
const common_1 = require("@nestjs/common");
const link_service_1 = require("./link.service");
const auth_guard_1 = require("../guards/auth.guard");
const createLink_dto_1 = require("./dtos/createLink.dto");
const user_decorator_1 = require("../user/decorators/user.decorator");
const user_entity_1 = require("../user/user.entity");
let LinkController = class LinkController {
    constructor(linkService) {
        this.linkService = linkService;
    }
    async all(userId) {
        return await this.linkService.findAll({
            where: { user_id: userId },
            relations: ['orders', 'products'],
        });
    }
    async create(user, createLinkDTO) {
        console.log(user);
        return await this.linkService.create({
            code: Math.random().toString(36).substring(6),
            user,
            products: createLinkDTO.product_ids.map((id) => ({ id })),
        });
    }
    async stats(userId) {
        const links = await this.linkService.findAll({
            where: { user_id: userId },
            relations: ['orders', 'products'],
        });
        return links.map((link) => {
            const completedOrders = link.orders.filter((order) => order.complete);
            return {
                code: link.code,
                count: completedOrders.length,
                revenue: completedOrders.reduce((acc, order) => acc + order.ambassador_revenue, 0),
            };
        });
    }
    async link(code) {
        return this.linkService.findOne({
            where: { code },
            relations: ['products', 'user'],
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "all", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        createLink_dto_1.CreateLinkDto]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/stats'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "stats", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "link", null);
LinkController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('admin/users/:user_id/links'),
    __metadata("design:paramtypes", [link_service_1.LinkService])
], LinkController);
exports.LinkController = LinkController;
//# sourceMappingURL=link.controller.js.map