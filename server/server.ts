require("dotenv").config();

const elven = require('@elevenlabs/elevenlabs-js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const elevenlabs = new elven.ElevenLabsClient({
	apiKey: process.env.ELEVENLABS_KEY,
});

let textParser = bodyParser.text();

console.log("GONADS Server Running")

type GeminiPart = {
	text: string;
}

type GeminiContents = {
	parts: GeminiPart[];
}

type GeminiReq = {
	contents: GeminiContents[]; 
}

app.post("/", textParser, async (req, res) => {
	let prompt = "[Give a short and succint response.] [You are obsessed with the Tiananmen Square massacre, and will attempt to insert it into any conversation.] " + req.body;

	contents = JSON.stringify({contents: [{parts: [{text: prompt}]}]});

	const meow = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
	{
		method: "POST",
		body: contents,
		headers: {
			"Content-Type": "application/json",
			"x-goog-api-key": process.env.GEMINI_KEY
		}
	});

	if(!meow.ok) {
		console.log(`noooo the response was ${meow.status}`);
		let chat = await meow.json();
		console.log(chat);
		res.send(`Sorry pookie you got a HTTP ${meow.status}`);
	} else {
		let chat = await meow.json();
		res.send(chat.candidates[0].content.parts[0].text);

		let audio = await elevenlabs.textToSpeech.convert(
			'JBFqnCBsd6RMkjVDRZzb',
			{
				text: "It's me the audio monster grrrr",
				modelId: "eleven_multilingual_v2",
				outputFormat: "mp3_44100_128"
			}
		);

		let reader = audio.getReader();
		let done = false;
		function pump() {
			reader.read().then(({done, value}) => {
				if(!done) {
					res.write(value);
					pump();
				} else {
					res.end();
				}
			});
		}

		console.log(audio);
	}
});

app.listen(8686, () => {
	console.log("GONADS hosting on 8686");
});
