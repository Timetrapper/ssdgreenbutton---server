import './App.css';
import { Bar } from 'nivo';
import { withAlert } from 'react-alert';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import classNames from 'classnames';
import GraphIcon from 'material-ui/svg-icons/file/bar-chart';
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';
import greenButtonImageHeader from './images/green-button-image-header.png';
import titleImageHeader from './images/title-image-header.png';
import githubLogoFooter from './images/github-logo-footer.png';
import greenButtonLogoFooter from './images/green-button-logo-footer.png'
import plasmaticLogoFooter from './images/plasmatic-logo-footer.png';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import React, { Component } from 'react';

/* TODO:
- Header Images Responsive (page)
- Footer Images Responsive (page)
- Footer Images Margin
- Graph Responsive (page)
- Graph Axis (show)
- Graph Bars (possible syling change)

- Graph Responsive (data & onClick)

- Graphing Functions (based on buttons)
- Graphing Functions (onClick)
*/

const styles = {
  button: {
    margin: 10,
    width: 240,
  },
  inputButton: {
    margin: 10,
    width: 400,
  },
  xmlFileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};


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
        <img src={greenButtonImageHeader} className="App-green-button-image-header" alt="greenButtonImageHeader"/>
        <img src={titleImageHeader} className="App-title-image-header" alt="titleImageHeader"/>
      </header>

      <div className="Main-body-container">    

        <div className="App-upload-button-wrapper">

          <RaisedButton className="App-upload-button"
            label="UPLOAD MY GREEN BUTTON XML FILE"
            labelPosition="before"
            style={styles.inputButton}
            containerElement="label"
            icon={<FileDownloadIcon />}
            >
            <input type="file" style={styles.xmlFileInput} />
          </RaisedButton>

        </div> {/*upload button wrapper*/}

        <div className="Bar-chart-wrapper">
          <Bar
            data={this.state.data}
            keys={this.state.data.value} // This isn't working...
            width={1000}
            height={500}
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
        </div> {/*bar chart wrapper*/}
        <div className="App-button-wrapper">

          <RaisedButton className="App-buttons"
                      label="Display 24 Hours"
                      labelPosition="before"
                      style={styles.button}
                      icon={<GraphIcon />}
            onClick={() => {(window.confirm('Display 24 Hour Period (by Hour)')), (window.confirm('** CHANGE GRAPH FUNCTION**')) } }
            ></RaisedButton>

          <RaisedButton className="App-buttons"
                      label="Display 7 Days"
                      labelPosition="before"
                      style={styles.button}
                      icon={<GraphIcon />}
            onClick={() => {(window.confirm('Display 7 Day Period (by Daily Average)')), (window.confirm('** CHANGE GRAPH FUNCTION**')) } }
            ></RaisedButton>

          <RaisedButton className="App-buttons"
                      label="Display 30 Days"
                      labelPosition="before"
                      style={styles.button}
                      icon={<GraphIcon />}
            onClick={() => {(window.confirm('Display 30 Day Period (by Daily Average)')), (window.confirm('** CHANGE GRAPH FUNCTION**')) } }
            ></RaisedButton>

          <RaisedButton className="App-buttons"
                      label="Display 365 Days"
                      labelPosition="before"
                      style={styles.button}
                      icon={<GraphIcon />}
            onClick={() => {(window.confirm('Display 365 Day Period (by Monthly Average)')), (window.confirm('** CHANGE GRAPH FUNCTION**')) } }
            ></RaisedButton>

          <RaisedButton className="App-buttons"
                      label="Display All-Time"
                      labelPosition="before"
                      style={styles.button}
                      icon={<GraphIcon />}
            onClick={() => {(window.confirm('Display All-Time (by Monthly Average)')), (window.confirm('** CHANGE GRAPH FUNCTION**')) } }
            ></RaisedButton>

        </div> {/*button wrapper*/}

      </div> {/*main body tontainer*/}

      <footer className="App-footer">
        <div className="App-footer-images-container">
          <a href="https://plasmatic.ai/">
            <img src={plasmaticLogoFooter} className="App-plasmatic-logo-footer" alt="plasmaticLogo"/>
          </a>
          <a href="http://greenbuttondata.org/">
            <img src={greenButtonLogoFooter} className="App-green-button-logo-footer" alt="greenButtonLogo"/>
          </a>
          <a href="https://github.com/Timetrapper/ssdgreenbutton">
            <img src={githubLogoFooter} className="App-github-logo-footer" alt="githubLogo"/>
          </a>
        </div>
      </footer>

  </div> //App wrapper (whole page)
  ); // Close return
} // Close render
} // close class App

export default App;
