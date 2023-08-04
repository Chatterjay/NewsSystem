const NewsModule = require('../../modules/NewsModule');
const NewsService = {
  getList: async ({ _id }) => {
    return _id ? NewsModule.find({ _id, isPublish: 1 }) : NewsModule.find({ isPublish: 1 }).sort({ editTime: -1 });
  },
  getTopList: async ({ limit }) => {
    return NewsModule.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit);
  },
};
module.exports = NewsService;
