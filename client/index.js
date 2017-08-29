import React from 'react';
import render from 'react-dom';
import bbb from './aa'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aaa: 6666
        };
    }
    render() {
        const { aaa } = this.state;
        return (
            <div>444444{aaa} {bbb}</div>
        );
    }
}

render(
    App,
    document.getElementById('root')
);
