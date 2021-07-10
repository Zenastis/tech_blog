const router = require("express").router();
const {User} = require("../../modals");

router.post("/", async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
        req.session.userId = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;
        res.json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username;
            },
        });
        if (!user) {
            res.status(400).json({message: "no account found"});
            return;
        }

        const correctPass = user.checkPassword(req.body.password);
            if (!correctPass) {
                res.status(400).json({message: "no account found"});
                return;
            }
            req.session.save(() => {
                req.session.userId = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true;
            res.json({user, message: "your logged in"});
            });
    } catch (err) {
        res.status(400).json({message: "no account found"});
    }
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;