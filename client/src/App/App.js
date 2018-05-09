import './App.css';
import { Bar } from 'nivo';
import { withAlert } from 'react-alert';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import classNames from 'classnames';
import greenButtonImageHeader from './images/green-button-image-header.png';
import titleImageHeader from './images/title-image-header.png';
import githubLogoFooter from './images/github-logo-footer.png';
import greenButtonLogoFooter from './images/green-button-logo-footer.png'
import plasmaticLogoFooter from './images/plasmatic-logo-footer.png';
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
          <img src={greenButtonImageHeader} className="App-green-button-image-header" alt="greenButtonImageHeader" />
          <img src={titleImageHeader} className="App-title-image-header" alt="titleImageHeader" />
        </header>

  <div className="Main-body-container">    

        <div className="Bar-chart-wrapper">
          <Bar
            data={this.state.data}
            keys={this.state.data.value} // This isn't working...
            width={1000}
            height={600}
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

        </div> {/*main body wrapper*/}

        <footer className="App-footer">
          <a href="https://www.plasmatic.ai/">
            <img src={plasmaticLogoFooter} className="App-plasmatic-logo-footer" alt="plasmaticLogo"/>
          </a>
          <a href="http://www.greenbuttondata.org//">
            <img src={greenButtonLogoFooter} className="App-green-button-logo-footer" alt="greenButtonLogo"/>
          </a>
          <a href="https://www.github.com/"> {/*add respository*/}
            <img src={githubLogoFooter} className="App-github-logo-footer" alt="githubLogo"/>
          </a>
        </footer>
      </div> 
    );
  }
}

export default App;