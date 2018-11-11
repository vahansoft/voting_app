require('dotenv').config();

module.exports = {
	HTTP_PORT: 3000,
	mongoose: {
		get url() {
			const credentials = this.username ? `${this.username}:${this.password}@` : ''

			return `mongodb://${credentials}localhost:27017/${this.database}`;
		},
		username: process.env.MONGO_USERNAME || null,
		password: process.env.MONGO_PASSWORD || null,
		database: process.env.MONGO_DATABASE || 'admin'
	}
}