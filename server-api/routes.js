const db = require('monk')(process.env.MONGODB_URI);
const items = db.get('items');

module.exports.ping = async ctx => ctx.body = 'pong';

module.exports.findById = async (ctx, next) => {
  const params = ctx.params || {};
  if (!params.id) ctx.throw(422, 'id is required');
  if (!Number(params.id)) ctx.throw(422, 'id has to be a number');
  ctx.body = await items.findOne({ id: Number(params.id) });
};