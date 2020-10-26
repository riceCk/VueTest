import Vue from 'vue';
import VueRouter from 'vue-router';
import routesConfig from '../conf/routes';

Vue.use(VueRouter);

let routes = []; // 路由配置i表

// 处理路由配置
routesConfig.map(nav => {
  let route = handleRouterConfig(nav);
  routes.push(route)
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 处理路由配置项
 * @param {} conf 配置项
 */
function handleRouterConfig (conf) {
  let path = '/' + conf.path;
  let name = conf.path.replace(new RegExp('\\/', 'g'), '_');
  let component = resolve => require(['../view/' + conf.component], resolve);

  let route = {path, name, component}
  if (conf.children && conf.children instanceof Array) {
    route.children = []
    for (let child of conf.children) {
      let childRoute = handleRouterConfig(child);
      if (typeof childRoute !== 'undefined') {
        route.children.push(childRoute);
      }
    }
  }
  return route;
}

export default router