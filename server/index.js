const express = require('express');
const { resolve } = require('path');

const server = express();

// Serve any static files
server.use(express.static(resolve(__dirname, '../client/dist')));

// Handle React routing, return all requests to React app
server.get('*', (req, res) => {
	res.sendFile(resolve(__dirname, '../client/dist/index.html'));
});

server.listen(5000, () => console.log('Server is listening on port 5000'));
