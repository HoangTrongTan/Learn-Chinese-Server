"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const connect_1 = require("./db/connect");
const not_found_1 = require("./middleware/not-found");
const error_handler_1 = require("./middleware/error-handler");
const auth_1 = __importDefault(require("./routes/auth"));
const protected_1 = __importDefault(require("./routes/protected"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const testSchema = new mongoose_1.default.Schema({
    hello: {
        type: String,
        required: true,
    },
});
const modelTest = mongoose_1.default.model("Test", testSchema);
dotenv_1.default.config();
const port = process.env.PORT || 3000;
console.log("process.env.PORT", process.env.PORT);
app.use(express_1.default.json());
app.use("/api/user", auth_1.default);
app.use("/api/protected", protected_1.default);
app.use("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield modelTest.find({});
        console.log("data", data);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}));
app.use(not_found_1.notFound);
app.use(error_handler_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.connectDB)(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port}...`));
    }
    catch (err) {
        console.log(err);
    }
});
start();
