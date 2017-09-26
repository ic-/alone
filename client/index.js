import React, { Component } from 'react';
import { render } from 'react-dom';

class MyComponent extends Component {
    render() {
        const params = 'Hello World';
        return <div>{params}</div>;
    }
}

render(<MyComponent />, document.getElementById('root'));
