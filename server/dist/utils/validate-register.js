"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    const emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (options.name.length <= 2) {
        return [
            {
                field: "name",
                message: "Length must be greater than 3",
            },
        ];
    }
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "Length must be greater than 3",
            },
        ];
    }
    if (!/^[a-zA-Z0-9_]+$/.test(options.username)) {
        return [
            {
                field: "username",
                message: "Username can only contain letters, numbers, and underscores",
            },
        ];
    }
    if (options.username.length > 30) {
        return [
            {
                field: "username",
                message: "Username must not exceed 30 characters",
            },
        ];
    }
    if (options.username.includes(" ")) {
        return [
            {
                field: "username",
                message: "Username cannot include spaces",
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