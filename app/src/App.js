import React, { Component } from 'react';
import Presentacion from './components/home';

// https://github.com/electron/electron/issues/7300
// We don't want to bundle electron in the webpack process so we use it's globally exposed require method.

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="text-center">
            <Presentacion />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
