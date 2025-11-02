require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
	let prompt = "[] " + req.body;

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
	}
});

app.listen(8686, () => {
	console.log("GONADS hosting on 8686");
});
