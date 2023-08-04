const ProductModule = require('../../modules/ProductModule');
const ProductService = {
  add: async ({ title, detail, introduction, cover, editTime, createTime }) => {
    return ProductModule.create({
      title,
      detail,
      introduction,
      cover,
      editTime,
      createTime,
    });
  },
  getList: async ({ _id }) => {
    return _id ? ProductModule.find({ _id }) : ProductModule.find({});
  },
  delList: async ({ _id }) => {
    return ProductModule.deleteOne({ _id });
  },
  updateList: async ({ title, detail, introduction, editTime, cover, _id }) => {
    if (cover) {
      return ProductModule.updateOne({ _id }, { title, detail, introduction, editTime, cover });
    }
    return ProductModule.updateOne({ _id }, { title, detail, introduction, editTime });
  },
};
module.exports = ProductService;
