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
	contents: GeminiContents; 
}

app.post("/", (req, res) => {
	let prompt = req.body;
	
	let meow = new XMLHttpRequest();
	meow.open("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", true);
	meow.setRequestHeader("Content-type", "application/json");
	meow.setRequestHeader("x-goog-api-key", process.env.GEMINI_KEY);
	meow.onreadystatechange = () => {
		if(meow.readyState == 4 && meow.status == 200) {
			let chat = JSON.parse(meow.responseText);
			console.log(meow.responseText);
			res.send("tweakering");
		} else if(meow.readyState == 4) {
			console.log("ruh roh! not OK 200!!!");
		}
	}
	meow.send(JSON.stringify({contents: {parts: [{text:prompt}]}}));

	console.log(prompt);
	res.send("fuck you");
});

app.listen(8686, () => {
	console.log("GONADS hosting on 8686");
});
