import React from 'react';
import { render } from 'react-dom';
import { combineReducers } from 'redux-immutable';
import { Route, IndexRoute } from 'react-router';

import Root from '../../Root';
import routing from '../../common/reducers/routing';
import toast from '../../common/reducers/toast';
import home from './reducer';
import App from '../../common/App';
import HomePage from './HomePage';
import { context } from '../../utils/config';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
  </Route>
);

const reducers = combineReducers({
  routing,
  toast,
  home
});

render(
  <Root routes={routes} reducers={reducers}/>,
  document.getElementById('layout')
);
