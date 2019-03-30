const db = require('monk')(process.env.MONGODB_URI);
const items = db.get('items');
const readmes = db.get('readmes');

module.exports.ping = async ctx => ctx.body = 'pong';

module.exports.findById = async (ctx, next) => {
  const qs = ctx.query;
  const id = qs.id
  if (!id) ctx.throw(422, 'id is required');
  if (!Number(id)) ctx.throw(422, 'id has to be a number');
  ctx.body = await items.findOne({ id: Number(id) });
};

module.exports.findRepos = async (ctx, next) => {
  const qs = ctx.query;
  const limit = parseInt(qs.limit) > 0 ? parseInt(qs.limit) : 10;
  // 1 or -1
  const sort = Math.abs(parseInt(qs.sort)) === 1 ? parseInt(qs.sort) : null;
  const sortBy = qs.sortBy || '_id';

  const options = {};
  options.fields = { _id: 0 };
  options.limit = limit;
  if (sort) options.sort = { [sortBy]: sort };

  ctx.body = await items.find({}, options);
}

module.exports.findReadmeById = async (ctx, next) => {
  const qs = ctx.query;
  const id = qs.id
  if (!id) ctx.throw(422, 'id is required');
  if (!Number(id)) ctx.throw(422, 'id has to be a number');
  ctx.body = await readmes.findOne({ id: Number(id) });
}