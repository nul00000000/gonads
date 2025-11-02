printText = async (data) => {
  const response = await fetch("https://monke.gay/gonadsapi/", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: data,
  });
  return response;
};

playtts = async (data) => {
  const response = await fetch("https://monke.gay/gonadsapi/tts/", {
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
    const res = await printText(text_value);

    if (!res.ok) alert("Stay tuned till I figure this error out");
    console.log("got response");

    const data = await res.text();
    console.log("got plain text from gemini");

    // if (!data.ok) alert("2 Stay tuned till I figure this error out");
    // console.log("got data");

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
