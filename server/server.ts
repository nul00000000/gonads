require("dotenv").config();

const express = require('express');
const app = express();

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

app.post("/", async (req, res) => {
	let prompt = req.body;

	console.log(prompt);
	
	contents = JSON.stringify({contents: [{parts: [{text: "what the frickity frack why isnt this working"}]}]});

	console.log(`gonna blow up ${contents}`);

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
		console.log(chat.candidates[0]);
	} else {
		let chat = await meow.json();
		console.log(chat);
	}
	res.send("fuck you");
});

app.listen(8686, () => {
	console.log("GONADS hosting on 8686");
});
