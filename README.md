# Green Button "Download My Data" Graphed

#### This repo contains the Node.Js backend of this project.
#### For the React frontend, [visit that repo](GITHUB ADDRESS).

Takes a "Green Button" data XML and parses it to JSON in a Node.Js backend. It stores the data in a MongoDB. The data is presented in graphs in a React frontend.

Created for the [BCIT SSD](https://www.bcit.ca/study/programs/699ccertt) 2018 industry project, in collaboration with [Plasmatic Technologies Inc.](https://www.plasmatic.ai/)

# Installation

1. Download the server (GITHUB ADDRESS).

2. Download the client (GITHUB ADDRESS).

3. Run `npm install` in the directory containing "package.json" for each.

# Usage

1. Download your Green Button data in an XML from your power utility company's website.
For example, here are instructions for downloading your Green Button data [from BC Hydro](https://www.bchydro.com/search.html?q=Where+can+I+get+my+billing+and+electricity+use+history%3F&qid=1348&ir_type=3).

2. Create a local MongoDB (or host one on mLab) and give it a collection named "greenbuttonapi".
Insert the connection string as the value matching key 'database_mlb' in *server -> config -> index.js*

3. Start the client (`npm start`).

4. Start the server (`npm start` or `nodemon`).

5. Navigate to the client, log in, and upload your Green Button data XML. Your data will then be displayed as a chart. The data is stored in the MongoDB.

# Credits

This project would not have been possible without the generous support of [Plasmatic Technologies Inc.](https://www.plasmatic.ai/)

Plasmatic is working to unleash the power of a smart home, in part through their **Alana Connected Home System**, and they focus on the intersection of power systems, connected devices, and consumer needs.

Plasmatic provided this team with the project parameters and continual support to see it reach release.

# MIT License

Copyright (c) 2018 BCIT SSD Plasmatic Industry Project Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.