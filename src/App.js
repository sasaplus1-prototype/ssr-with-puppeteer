import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      hello: '',
    };
  }

  async componentDidMount() {
    const res = await fetch('/api/data');
    const json = await res.json();

    this.setState({
      hello: json.hello,
    });
  }

  render() {
    const {
      hello = '',
    } = this.state;

    return (
      <div>
        <h1>{hello}</h1>
        <p>see view-source:localhost:3000/</p>
      </div>
    );
  }
}
