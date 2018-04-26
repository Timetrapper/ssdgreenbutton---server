module.exports = {
  // Setting mlab database name
  'database': 'mongo ds259109.mlab.com:59109/greenbuttondata -u bcitssd -p Bcit123!',

  // Setting port for server
  'port': process.env.PORT || 3000, 

  // Setting mongo host name
  'mongo_host': process.env.MONGO_HOST || 'localhost',

  // Setting mongo port number
  'mongo_port': process.env.MONGO_PORT || 27017,

  'secret': 'super secret passphrase',
};