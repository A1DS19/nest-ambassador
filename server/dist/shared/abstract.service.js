"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
class Id {
}
class AbstractService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(options) {
        return await this.repository.find(options);
    }
    async findOne(options) {
        return await this.repository.findOne(options);
    }
    async findOneBy(field, value) {
        return await this.repository.findOneBy({
            [field]: value,
        });
    }
    async create(createDTO) {
        return await this.repository.save(createDTO);
    }
    async update(id, updateDTO) {
        await this.repository.update(id, updateDTO);
        return await this.repository.findOneBy({ id });
    }
    async delete(id) {
        await this.repository.delete(id);
    }
}
exports.AbstractService = AbstractService;
//# sourceMappingURL=abstract.service.js.map