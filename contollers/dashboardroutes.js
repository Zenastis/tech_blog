const router = require("express").Router();
const {Post} = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        const data = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });
        const posts = data.map((post) => post.get({plain: true}));

        res.render("all-posts-admin", {
            layout: "dashboard", 
            posts,
        });
    } catch (err) {
        res.redirect("login");
    }
});

router.get("/new", withAuth, (req, res) => {
    res.render("new-post", {
        layout: "dashboard",
    });
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const data = await Post.findByPk(req.params.id);

        if (data) {
            const post = data.get({plain: true});

            res.render("edit-post", {
                layout: "dashboard",
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect("login");
    }
});
