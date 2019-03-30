const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const compress = require('koa-compress');
const serve = require('koa-static');
const routes = require('./routes');

const app = new Koa();
const router = new Router();

router.prefix('/v1');
router.get('/ping', routes.ping);
router.get('/package', routes.findById);
router.get('/repos', routes.findRepos);

app.use(cors({ origin: '*' }));
app.use(compress()); // compress has to stay before routes
app.use(serve('public'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3000);