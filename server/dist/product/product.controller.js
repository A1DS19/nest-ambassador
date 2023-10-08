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
var ProductController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_dto_1 = require("./dtos/create.dto");
const auth_guard_1 = require("../guards/auth.guard");
const update_dto_1 = require("./dtos/update.dto");
const cache_manager_1 = require("@nestjs/cache-manager");
const event_emitter_1 = require("@nestjs/event-emitter");
let ProductController = ProductController_1 = class ProductController {
    constructor(productService, cacheManager, eventEmitter) {
        this.productService = productService;
        this.cacheManager = cacheManager;
        this.eventEmitter = eventEmitter;
    }
    async getProducts(request) {
        const params = request.query;
        if (params) {
            if (params.page && params.limit) {
                const page = Number(params.page);
                const limit = Number(params.limit);
                return await this.productService.paginate(page, limit);
            }
            if (params.title) {
                return await this.productService.findAll({
                    where: { title: params.title },
                });
            }
        }
        return await this.productService.findAll();
    }
    async createProduct(createProductDTO) {
        const product = await this.productService.create(createProductDTO);
        this.eventEmitter.emit('product.created', product);
        return product;
    }
    async updateProduct(id, updateProductDTO) {
        await this.eventEmitter.emit('product.updated', id);
        return await this.productService.update(id, updateProductDTO);
    }
    async getProduct(id) {
        return await this.productService.findOneBy('id', id);
    }
    async deleteProduct(id) {
        await this.eventEmitter.emit('product.deleted', id);
        await this.productService.delete(id);
    }
    async getProductsFrontend() {
        const products = await this.productService.findAll();
        return products;
    }
    async getProductsBackend() {
        let products = await this.cacheManager.get('products_backend');
        if (!products) {
            products = await this.productService.findAll();
            await this.cacheManager.set('products_backend', products, ProductController_1.cacheTTL);
        }
        return products;
    }
};
ProductController.cacheTTL = 30 * 60 * 1000;
__decorate([
    (0, common_1.Get)('paginate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.UpdateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('one/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, cache_manager_1.CacheKey)('products_frontend'),
    (0, common_1.CacheTTL)(ProductController_1.cacheTTL),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, common_1.Get)('frontend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsFrontend", null);
__decorate([
    (0, common_1.Get)('/backend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsBackend", null);
ProductController = ProductController_1 = __decorate([
    (0, common_1.Controller)('admin/products'),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [product_service_1.ProductService, Object, event_emitter_1.EventEmitter2])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map