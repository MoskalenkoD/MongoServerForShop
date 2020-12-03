const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});
const mongoose = require('mongoose');
const GoodsMiddleware = require('./middlewares/goodMiddleware');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const URL = process.env.MONGODB_URI || "mongodb://localhost:27017/mongo-proj";

mongoose.connect(URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true
}, function (err) {
	if (err) {
		console.log("Error", err);
		console.log('DB Connection Failed!');
	}
	console.log('DB Successfully Connected!');
});

const app = vertex.app();

const api = require('./routes/api');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/goods', api(new GoodsMiddleware())) ;


module.exports = app;