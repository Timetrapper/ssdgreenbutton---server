module.exports = {
    // Database connection information
  'database_mlab': 'mongodb://bcit:bcit123@ds249269.mlab.com:49269/prismatic',
  'database_local': 'prismatic',

  // Setting port for server
  'port': process.env.PORT || 3000, 

    // Setting mongo host name
    'mongo_host': process.env.MONGO_HOST || 'localhost',

    // Setting mongo port number
    'mongo_port': process.env.MONGO_PORT || 27017,

    // Setting mongo database name
    'mongo_database': process.env.MONGO_DATABASE_NAME || 'prismatic',

    'secret': 'super secret passphrase',
};