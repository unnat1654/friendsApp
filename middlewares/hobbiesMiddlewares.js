export const addHobbyValidate = (req, res, next) => {
    try {
        const { hobby } = req.body;
        if (!hobby || typeof hobby !== 'string')
            return res.status(400).send({
                success: false,
                message: "Hobby missing!"
            });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while setting hobbies!"
        });
    }
};


export const removeHobbyValidate = (req, res, next) => {
    try {
        const { hobby } = req.body;
        if (!hobby || typeof hobby !== 'string')
            return res.status(400).send({
                success: false,
                message: "Hobby missing!"
            });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while removing hobbies!"
        });
    }
};