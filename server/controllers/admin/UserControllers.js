const UserService = require('../../services/admin/UserService');
const JWT = require('../../util/jwt');

const UserControllers = {
  login: async (req, res) => {
    const result = await UserService.login(req.body);
    if (result.length === 0) {
      res.send({
        code: '-1',
        err: '用户或密码不存在',
      });
      return;
    }
    // 生成token
    const token = JWT.generate({ _id: result[0]._id, username: result[0].username }, '3d');
    res.header('authorization', token);
    const { username, gender, introduction, avatar, role } = result[0];
    res.send({
      ActionType: 'OK',
      data: {
        username,
        gender,
        introduction,
        avatar,
        role,
      },
    });
  },
  upload: async (req, res) => {
    const { username, gender, introduction } = req.body;
    const token = req.headers['authorization'].split(' ')[1];
    // 判断用户的是否传过来file更改头像
    const avatar = req.file ? `/avatarUploads/${req.file.filename}` : '';
    // 获取token _id 辨别用户
    const payload = JWT.verify(token);
    // 调用 service 模块更新数据
    await UserService.upload({ _id: payload._id, introduction, username, gender: Number(gender), avatar });
    if (avatar) {
      res.send({
        ActionType: 'OK',
        data: {
          username,
          gender: Number(gender),
          introduction,
          avatar,
        },
      });
    } else {
      res.send({
        ActionType: 'OK',
        data: {
          username,
          gender: Number(gender),
          introduction,
        },
      });
    }
  },
  add: async (req, res) => {
    const { username, gender, introduction, password, role } = req.body;
    // 判断用户的是否传过来file更改头像
    const avatar = req.file ? `/avatarUploads/${req.file.filename}` : '';
    // 调用 service 模块添加数据
    await UserService.add({ introduction, username, gender: Number(gender), avatar, password, role: Number(role) });
    if (avatar) {
      res.send({
        ActionType: 'OK',
      });
    }
  },
  getList: async (req, res) => {
    const result = await UserService.getList(req.params);
    res.send({
      ActionType: 'OK',
      data: result,
    });
  },
  delList: async (req, res) => {
    await UserService.delList({ _id: req.params.id });
    res.send({
      ActionType: 'OK',
    });
  },
  putList: async (req, res) => {
    const result = await UserService.putList(req.body);
    res.send({
      ActionType: 'OK',
    });
  },
};
module.exports = UserControllers;
