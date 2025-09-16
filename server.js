require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const bcryptjs = require('bcryptjs');
const app = express();

const login = require("./api/routes/login/loginGroup.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/signup-portal", register);
app.use("/api/signin-portal", login);
// app.use(
//     expressSession({
//         secret: secretKey,
//         store: connectMongo.create({
//             mongoUrl: mongoConnect,
//             ttl: sessionDuration,
//             autoRemove: "native",
//         }),
//         resave: false,
//         saveUninitialized: false,
//         rolling: true,
//         cookie: {
//             sameSite: "strict",
//             httpOnly: true,
//             maxAge: sessionDuration * 1000,
//         },
//     })
// );


app.get("/", (req, res) => {
    res.status(200).json({ message: "ok" });
});

app.listen(port, () => console.log(`http://localhost:${port}`));