"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelper = void 0;
const bcrypt_1 = require("bcrypt");
class AuthHelper {
    static validate(password, hashedPassword) {
        return bcrypt_1.compare(password, hashedPassword);
    }
    static hash(password) {
        const salt = bcrypt_1.genSaltSync(10);
        return bcrypt_1.hash(password, salt);
    }
}
exports.AuthHelper = AuthHelper;
//# sourceMappingURL=auth.helper.js.map