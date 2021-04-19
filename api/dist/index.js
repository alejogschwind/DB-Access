"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var course_routes_1 = __importDefault(require("./routes/course.routes"));
var PORT = 5002;
var app = express_1.default();
typeorm_1.createConnection();
// Middlewares
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.get("/", function (req, res) {
    return res.json({ "ok": true });
});
// Routes
app.use("/users", user_routes_1.default);
app.use("/courses", course_routes_1.default);
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(PORT, function () {
    console.log("Server listeing at http://localhost:" + PORT);
});
//# sourceMappingURL=index.js.map