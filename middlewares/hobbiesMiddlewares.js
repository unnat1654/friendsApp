export const setHobbiesValidate = (req, res, next) => {
    try {
        const { hobbies } = req.body;
        if (!Array.isArray(hobbies))
            return res.status(400).send({
                success: false,
                message: "Hobbies should be an array!"
            });
        if (!hobbies.every(hobby => typeof hobby === 'string'))
            return res.status(400).send({
                success: false,
                message: "All hobbies must be strings!"
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
        const {hobby} = req.body;
        if(!hobby || typeof hobby !== 'string')
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