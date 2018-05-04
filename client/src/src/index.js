import React from 'react';
import logo from './green-button.png';
//import ReactDOM from 'react-dom';
import './index.css';
// import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { render } from "react-dom";
import { Bar } from "@nivo/bar";

const styles = {
  fontFamily: "sans-serif",
  fontSize: "14px",
  textAlign: "center"
};

const sampleData = [
  {
    id: "A",
    value: 1230
  },
  {
    id: "B",
    value: 1460
  },
  {
    id: "C",
    value: 2020
  },
  {
    id: "D",
    value: 1850
  }
];

const commonProperties = {
  width: 500,
  height: 320,
  data: sampleData,
  keys: ['value'],
  indexBy: 'id',
  margin: {
    top: 10,
    right: 10,
    bottom: 60,
    left: 80
  }
};

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Green Button Data</h1>
    </header>
    <div style={styles}>
      <Bar
        {...commonProperties}
        axisLeft={{
          // using custom function
          format: d => `${d} custom`
        }}
      />
      {/* <Bar
        {...commonProperties}
        axisLeft={{
          // using d3-format
          // see https://github.com/d3/d3-format for available formats
          format: '.2s'
        }}
      /> */}
    </div>
  </div>
);

render(<App />, document.getElementById("root"));
//ReactDOM.render(<App />,document.getElementById('root'));

registerServiceWorker();
