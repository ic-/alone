import 'babel-polyfill';
import { React } from 'react';
import { render } from 'react-dom';

class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

render(<MyComponent />, document.getElementById('root'));
