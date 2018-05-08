import React, { Component } from 'react';
import greenButtonLogo from './green-button.png';
import plasmaticLogo from './plasmatic.png';
import githubLogo from './github.png';

import './App.css';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import RaisedButton from 'material-ui/RaisedButton';
import { withAlert } from 'react-alert'

import { Bar } from "@nivo/bar";


const sampleData = [
  {
    id: "A",
    value: 10
  },
  {
    id: "B",
    value: 14
  },
  {
    id: "C",
    value: 20
  },
  {
    id: "D",
    value: 18
  },
  {
    id: "E",
    value: 12
  },
  {
    id: "F",
    value: 14
  },
  {
    id: "G",
    value: 20
  },
  {
    id: "H",
    value: 18
  },
  {
    id: "I",
    value: 12
  },
  {
    id: "J",
    value: 14
  },
  {
    id: "K",
    value: 20
  },
  {
    id: "L",
    value: 18
  }
];

const commonProperties = {
  width: 1200,
  height: 400,
  data: sampleData,
  keys: ['value'],
  indexBy: 'id',
  margin: {
    top: 10,
    right: 10,
    bottom: 80,
    left: 80
  },
};

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Green Button Data</h1>
          <img src={greenButtonLogo} className="App-green-button-logo" alt="greenButtonLogo" />
        </header>

      <div>  
        <RaisedButton
            name="file" 
            id="file"
            class="inputfile"
            className="App-buttons"
            containerElement='label'
            label='UPLOAD MY GREEN BUTTON XML FILE HERE'>
              <input for="file" type="file"/>
        </RaisedButton>
      </div> 
        
        <div class="Bar-chart-wrapper">
        <Bar
            padding={0.2}
            //axisBottom={{legend: "USERS", legendPosition: "center"}}
            colors={["#61cdbb", "#97e3d5", "#f47560", "#e25c3b"]}
            {...commonProperties}
            axisLeft={{
              // using custom function
              format: d => `${d} kWh`
            }}
          />
        </div>  


          <RaisedButton className="App-buttons"
                onClick={() => {(window.confirm('Display 24 Hour Period')) } }
          >Display 24 Hours</RaisedButton>

          <RaisedButton className="App-buttons"
                onClick={() => {(window.confirm('Display 7 Day Period')) } }
          >Display 7 Days</RaisedButton>

          <RaisedButton className="App-buttons"
                onClick={() => {(window.confirm('Display 365 Day Period')) } }
          >Display 30 Days</RaisedButton>

          <RaisedButton className="App-buttons"
                onClick={() => {(window.confirm('Display 365 Day Period')) } }
          >Display 365 Days</RaisedButton>

          <RaisedButton className="App-buttons"
                onClick={() => {(window.confirm('Display All-Time')) } }
          >Display All-Time</RaisedButton>


        <footer className="App-footer">
        <a href="https://www.plasmatic.ai/">
          <img src={plasmaticLogo} className="App-plasmatic-logo" alt="plasmaticLogo"/>
        </a>
        <a href="https://www.github.com/"> {/*add respository*/}
          <img src={githubLogo} className="App-github-logo" alt="githubLogo"/>
        </a>
        </footer>

      </div> 
    );
  }
}

export default App;
