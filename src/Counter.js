import React, { Component } from 'react';

export default class Counter extends Component {
  state = {
    count: 0,
  };

  count = () => {
    this.setState(prev => ({
      count: prev.count + 1,
    }));
  };

  render() {
    const { count } = this.state;
    return (
      <div className="hello">
        <button type="button" data-testid="counter-button" onClick={this.count}>
          {count}
        </button>
      </div>
    );
  }
}
