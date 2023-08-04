const ProductService = require('../../services/web/ProductService');

const ProductControllers = {
  getList: async (req, res) => {
    const result = await ProductService.getList();
    res.send({
      ActionType: 'OK',
      data: result,
    });
  },
};
module.exports = ProductControllers;
