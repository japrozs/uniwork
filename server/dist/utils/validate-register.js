"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    const emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (options.name.length <= 5) {
        return [
            {
                field: "name",
                message: "Length must be greater than 4",
            },
        ];
    }
    if (!options.email.match(emailRegexp)) {
        return [
            {
                field: "email",
                message: "Invalid email",
            },
        ];
    }
    if (options.password.length <= 6) {
        return [
            {
                field: "password",
                message: "Length must be greater than 6",
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validate-register.js.map