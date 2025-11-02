// readText = (text) => {
//   if (!("speechSynthesis" in window)) {
//     console.log("Why tf is the speechSynthesis not supported");
//     return;
//   }
//   const tts = new SpeechSynthesisUtterance(text);
//   tts.lang = "en-US";
//   tts.pitch = 1;
//   tts.rate = 1;
//   tts.volume = 1;

//   console.log(tts);
printText = async (data) => {
  const response = await fetch("https://monke.gay/", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: data,
  });
  return response;
};

playtts = async (data) => {
  const response = await fetch("https://monke.gay/tts", {
    method: "POST",
    headers: { "Content-type": "text/plain" },
    body: data,
  });
  const reader = response.body.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const blob = new Blob(chunks, { type: "audio/mpeg" });
  const audioUrl = URL.createObjectURL(blob);

  const audio = new Audio(audioUrl);
  await audio.play();
};

document.getElementById("send").addEventListener("click", async () => {
  const text_value = document.getElementById("prompt").value.trim();
  const text = document.getElementById("prompt");
  const response = document.getElementById("response");

  if (!text_value) {
    response.textContent = "Enter SOMETHING";
    text.value = "";
    return;
  }

  response.textContent = "Wait for either the slow connection or server";

  try {
    console.log("The start of the program");
    res = await printText(text_value);

    if (!res.ok) alert("Stay tuned till I figure this error out");
    console.log("got response");

    const data = await res.text();
    console.log("got plain text from gemini");

    if (!data.ok) alert("Stay tuned till I figure this error out");
    console.log("got data");

    await playtts(data);
    console.log("got audio");
    response.textContent = data;
    console.log(
      "typed out the text. This is lowkey visual so i don't know why I log it"
    );

    text.value = "";
  } catch (err) {
    console.error("Error:", err);
    response.textContent = "Stay tuned till I figure this error out";
    text.value = "";
    console.log("text changed");
  }
});
