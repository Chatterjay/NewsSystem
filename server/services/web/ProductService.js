const ProductModule = require('../../modules/ProductModule');
const ProductService = {
  getList: async () => {
    return  ProductModule.find();
  },
};
module.exports = ProductService;
