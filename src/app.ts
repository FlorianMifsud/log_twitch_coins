import tmi from "tmi.js";
import dotenv from "dotenv";
import debug from "debug";
import mongoose from "mongoose";
const { Schema } = mongoose;
const logs = mongoose.model(
    "logs_chat",
    new Schema(
        {
            logs: { type: Object },
            channel: { type: String },
        },
        { timestamps: true }
    )
);
const error = debug.debug("app:error");
debug.enable(process.env.DEBUG);
dotenv.config();
const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    },
    channels: process.env.CHANNEL.split(","),
});

client.connect().then(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

client.on("message", (channel, tags, message, self) => {
    if (self) return;
    tags.message = message;
    const log = new logs({ logs: tags, channel });
    log.save().catch(error);
});
