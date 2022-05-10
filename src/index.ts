import { readFileSync } from 'node:fs';
import http from 'node:http';
import playSound from 'play-sound';

const player = playSound();
const html = readFileSync('./static/index.html', 'utf8');

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.writeHead(200);
		res.end(html);
		return;
	}

	if (req.method !== 'GET' || !req.url?.startsWith('/play/'))
		return res.end('invalid request');

	const audio = req.url.replace('/play/', '');

	player.play(`./static/${audio.replace(/[^a-zA-Z]/g, '')}.mp3`, {});

	res.writeHead(200);
	res.end('playing');
});

const port = parseInt(process.env.PORT || '3000', 10);
const host = '0.0.0.0';

server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
});
