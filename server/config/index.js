module.exports = {

  // Database connection information
  'database_mlb':'mongodb://greenbuttonadmin:bcit123@ds259089.mlab.com:59089/greenbuttonapi',
  'database_local': 'users',
  // Setting port for server
  'port': process.env.PORT || 3000,
  // Setting mongo host name
  'mongo_host': process.env.MONGO_HOST || 'localhost',
  // Setting mongo port number
  'mongo_port': process.env.MONGO_PORT || 27017,
  // Setting mongo database name
  'mongo_database': process.env.MONGO_DATABASE_NAME || 'users',
  // set passphrase
  'secret': 'super secret passphrase',
};