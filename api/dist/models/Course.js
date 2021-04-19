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
exports.Course = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Course = /** @class */ (function () {
    function Course() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Course.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Course.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Course.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Course.prototype, "startDate", void 0);
    __decorate([
        typeorm_1.Column({
            nullable: true,
        }),
        __metadata("design:type", Date)
    ], Course.prototype, "endDate", void 0);
    __decorate([
        typeorm_1.ManyToMany(function () { return User_1.User; }, function (user) { return user.courses; }, {
            cascade: true,
            eager: true
        }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Course.prototype, "instructors", void 0);
    Course = __decorate([
        typeorm_1.Entity()
    ], Course);
    return Course;
}());
exports.Course = Course;
//# sourceMappingURL=Course.js.map