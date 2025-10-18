const Category = require('../models/category');
const { create } = require('../models/user');
const { getAll } = require('./usersController');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await Category.getAll();
            console.log(`Categorias: ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener las categorias',
                success: false,
                error: error
            });
        }
    },


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