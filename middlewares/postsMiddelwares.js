export const createPostValidate = (req, res, next) => {
    const { text } = req.body;
    if (!text || text.length > 10000)
        res.status(400).send({ success: false, message: "Post text missing!" });

    next();
};