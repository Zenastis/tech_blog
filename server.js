const path = require("path");
const express = require("express");
const session = require("express-session");
const expressHandleBars = require("express-handlebars");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3006;

const sequelize = require("./config/config");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sessions = {
    secret: "secret",
    cookkie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sessions));

const hBars = expressHandleBars.create({helpers});

app.engine("handlebars", hBars.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

app.listen(PORT, () => {
    console.log(`App listenting on port ${PORT}`);
    sequelize.sync({force: false});
});