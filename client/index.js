import 'babel-polyfill';
import React from 'react';
import render from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aaa: 1111
        };
    }
    render() {
        const { aaa } = this.state;
        return (
            <div>{aaa}</div>
        );
    }
}


render(
    App,
    document.getElementById('app')
);
