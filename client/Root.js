import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Router, useRouterHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Immutable from 'immutable';
import {isMobile} from './utils/device-env';

if (isMobile) {
  // 初始化调整字体大小
  require('./utils/perfect').adjustFontSize();
}

// 预加载 scss
import './common/scss/main.scss';

// 开发环境
let DevTools;
if (process.env.NODE_ENV === 'development') {
  const {createDevTools} = require('redux-devtools');
  const LogMonitor = require('redux-devtools-log-monitor').default;
  const DockMonitor = require('redux-devtools-dock-monitor').default;

  /*eslint-disable indent*/
  DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h"
                 changePositionKey="ctrl-w"
                 defaultIsVisible={false}
                 defaultPosition="right">
      <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
    </DockMonitor>
  );

  // 引入 eruda
  const eruda = require('eruda');
  eruda.init();
}

/**
 * 配置 store
 * @param history
 * @param reducers
 * @param initialState
 * @returns {*}
 */
export function configureStore(history, reducers, initialState) {

  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV === 'development') { //开发环境
    const {createLogger} = require('redux-logger');
    middleware.push(createLogger());
  }

  let devTools = [];
  if (DevTools && typeof document !== 'undefined') {
    devTools = [DevTools.instrument()];
  }

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...devTools
    ));

  return store;
}

/**
 * Create enhanced history object for router
 * 使用 Immutable 后，需要重写该方法，替换 syncHistoryWithStore 中的默认 selectLocationState
 * 详情看源代码
 * @returns {function(*)}
 */
function createSelectLocationState() {
  let prevRoutingState, prevRoutingStateJS;
  return (state) => {
    const routingState = state.get('routing'); // or state.routing
    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
}

const Root = ({routes, reducers, basename}) => {
  // 路由转换配置
  // Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
  const browserHistory = useRouterHistory(createBrowserHistory)({
    basename: basename ? basename : '/'
  });
  //初始化 store
  const store = configureStore(browserHistory, reducers, Immutable.fromJS(window.__initialState__ || {}));
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: createSelectLocationState(),
    adjustUrlOnReplay: true
  });

  const _routes = typeof routes === 'function' ? routes(store) : routes;
  return DevTools ? (
    <Provider store={store}>
      <div>
        <Router history={history}>
          {_routes}
        </Router>
        <DevTools/>
      </div>
    </Provider>
  )
    : (
      <Provider store={store}>
        <Router history={history}>
          {_routes}
        </Router>
      </Provider>
    );
};

Root.propTypes = {
  routes: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  reducers: PropTypes.func,
  basename: PropTypes.string
};

export default Root;
