const Category = require('../models/category');
const { create } = require('../models/user');

module.exports = {
    async create(req, res, next){
        try {
            const category = req.body;
            console.log(`categoria enviada: ${category}`);

            const data =await Category.create(category);

            return res.status(201).json({
                message: 'categoria creada correctamente',
                success: true,
                data: data.id
            });
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al crear la categoria',
                success: false,
                error: error
            });
        }
    }
}