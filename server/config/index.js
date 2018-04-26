module.exports = {
    // Database connection information
  'database_mlab': 'mongodb://bcit:bcit123@ds249269.mlab.com:49269/plasmatic',
  'database_local': 'greenbutton',
  //'database': process.env.MONGODB_URI || 'mongodb://WillB:Kaya2015@ds231749.mlab.com:31749/boatsdb',
  //exports.DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost/local-app';

  // Setting port for server
  'port': process.env.PORT || 3000, 

  // Setting mongo host name
  'mongo_host': process.env.MONGO_HOST || 'localhost',

  // Setting mongo port number
  'mongo_port': process.env.MONGO_PORT || 27017,

  // Setting mongo database name
  'database': 'mongo ds259109.mlab.com:59109/greenbuttondata -u bcitssd -p Bcit123!',

  'secret': 'super secret passphrase',
};