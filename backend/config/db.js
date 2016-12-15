module.exports = {
	dbname: 'testAws',
	uri: 'mongodb://localhost/testAws',
	mocked_db: false,
	opts: {
		server: {
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}
};