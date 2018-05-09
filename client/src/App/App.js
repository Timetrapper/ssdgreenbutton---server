import './App.css';
import { Bar } from 'nivo';
import { withAlert } from 'react-alert';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import classNames from 'classnames';
import githubLogo from './github.png';
import greenButtonLogo from './green-button-logo.png';
import greenButtonLogoFooter from './green-button.png'
import plasmaticLogo from './plasmatic.png';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = { data: [
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
    ] };
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Green Button Data</h1>
          <img src={greenButtonLogo} className="App-green-button-logo" alt="greenButtonLogo" />
        </header>

  <div className="Main-body-container">    

        <div>  
          <RaisedButton
            name="file" 
            id="file"
            className="App-upload-button"
            containerElement='label'
            label='UPLOAD MY GREEN BUTTON XML FILE HERE'>
            <input htmlFor="file" type="file"/>
          </RaisedButton>
        </div> 

        <div className="Bar-chart-wrapper">
          <Bar
            data={this.state.data}
            keys={this.state.data.value} // This isn't working...
            width={1200}
            height={800}
            margin={{
              "top": 20,
              "right": 10,
              "bottom": 20,
              "left": 10
            }}
            indexBy='id'
            padding={0.2}
            //axisBottom={{legend: "USERS", legendPosition: "center"}}
            colors={["#61cdbb", "#97e3d5", "#f47560", "#e25c3b"]}
            axisLeft={{
              // using custom function
              format: d => `${d} kWh`
            }}
          />
        </div>

        <RaisedButton className="App-buttons"
          onClick={() => {(window.confirm('Display 24 Hour Period')) } }
          >Display 24 Hours
        </RaisedButton>

        <RaisedButton className="App-buttons"
          onClick={() => {(window.confirm('Display 7 Day Period')) } }
          >Display 7 Days
        </RaisedButton>

        <RaisedButton className="App-buttons"
          onClick={() => {(window.confirm('Display 365 Day Period')) } }
          >Display 30 Days
        </RaisedButton>

        <RaisedButton className="App-buttons"
          onClick={() => {(window.confirm('Display 365 Day Period')) } }
          >Display 365 Days
        </RaisedButton>

        <RaisedButton className="App-buttons"
          onClick={() => {(window.confirm('Display All-Time')) } }
          >Display All-Time
        </RaisedButton>

        </div> {/*main body wrapper*/}

        <footer className="App-footer">
          <a href="https://www.plasmatic.ai/">
            <img src={plasmaticLogo} className="App-plasmatic-logo" alt="plasmaticLogo"/>
          </a>
          <a href="http://www.greenbuttondata.org//">
            <img src={greenButtonLogoFooter} className="App-green-button-logo-footer" alt="greenButtonLogo"/>
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