import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory, Router, Route } from 'react-router';
import Immutable from 'immutable';

// import routing from './common/reducers/routing';
import App from './common/App';
import './common/scss/main.scss';

const env = process.env.NODE_ENV;


// 开发环境
let DevTools;
// if (env === 'development') {
//   const {createDevTools} = require('redux-devtools');
//   const LogMonitor = require('redux-devtools-log-monitor').default;
//   const DockMonitor = require('redux-devtools-dock-monitor').default;

//   /*eslint-disable indent*/
//   DevTools = createDevTools(
//     <DockMonitor toggleVisibilityKey="ctrl-h"
//                  changePositionKey="ctrl-w"
//                  defaultIsVisible={false}
//                  defaultPosition="right">
//       <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
//     </DockMonitor>
//   );

//   // 引入 eruda
//   const eruda = require('eruda');
//   eruda.init();
// }

function configStore(reducers, initialState) { // store:[tool, middleware, history, reducers, initialState]
  const middleware = [thunk, history];
  if (env == 'development') {
    const { createLogger } = require('redux-logger');
    middleware.push(createLogger());
  }

  let devTools = [];
  if (DevTools && typeof document !== 'undefined') {
    devTools = [DevTools.instrument()];
  }
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...devTools
    )
  );
}

const Root = ({routers, reducers}) => {
  const store = configStore(reducers, Immutable.fromJS(window.__initialState__ || {}));
  const _routes = typeof routes === 'function' ? routes(store) : routers;
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          {_routes}
        </Route>
      </Router>
      {env == 'development' && <DevTools />}
    </Provider>
  );
};

Root.propTypes = {
  routes: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  reducers: PropTypes.func
};

module.exports = Root;
