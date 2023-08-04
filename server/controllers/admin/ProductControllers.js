const ProductService = require('../../services/admin/ProductService');

const ProductControllers = {
  add: async (req, res) => {
    // 调用service进行添加数据
    const cover = req.file ? `/ProductUploads/${req.file.filename}` : '';
    const { title, detail, introduction } = req.body;
    await ProductService.add({
      editTime: new Date(),
      createTime: new Date(),
      title,
      detail,
      introduction,
      cover,
    });
    res.send({
      ActionType: 'OK',
    });
  },
  getList: async (req, res) => {
    const result = await ProductService.getList({ _id: req.params.id });
    res.send({
      ActionType: 'OK',
      data: result,
    });
  },
  updateList: async (req, res) => {
    const cover = req.file ? `/productUploads/${req.file}` : '';
    const { title, detail, introduction, _id } = req.body;
    await ProductService.updateList({
      title,
      detail,
      introduction,
      cover,
      _id,
      editTime: new Date(),
    });
    res.send({
      ActionType: 'OK',
    });
  },
  delList: async (req, res) => {
    await ProductService.delList({ _id: req.params.id });
    res.send({
      ActionType: 'OK',
    });
  },
  updateList: async (req, res) => {
    const cover = req.file ? `/ProductUploads/${req.file}` : '';
    const { title, detail, introduction, _id } = req.body;
    await ProductService.updateList({
      _id,
      title,
      cover,
      editTime: new Date(),
      detail,
      introduction,
    });
    res.send({
      ActionType: 'OK',
    });
  },
};
module.exports = ProductControllers;
