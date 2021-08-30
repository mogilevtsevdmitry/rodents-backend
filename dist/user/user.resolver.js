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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const user_input_1 = require("./user.input");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserById(id) {
        return await this.userService.getById(id);
    }
    async getUserByEmail(email) {
        return await this.userService.getByEmail(email);
    }
    async createUser(user) {
        return await this.userService.create(user);
    }
    async deleteUser(id) {
        return await this.userService.delete(id);
    }
};
__decorate([
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    graphql_1.Query(() => user_entity_1.UserEntity),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    graphql_1.Query(() => user_entity_1.UserEntity),
    __param(0, graphql_1.Args('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserByEmail", null);
__decorate([
    graphql_1.Mutation(() => user_entity_1.UserEntity),
    __param(0, graphql_1.Args('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    graphql_1.Mutation(returns => Boolean),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    graphql_1.Resolver('Users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map