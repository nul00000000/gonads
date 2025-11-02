const ERROR = "Stay tuned till I figure this error out";

const printText = async (data) => {
  const response = await fetch("https://monke.gay/gonadsapi/", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: data,
  });
  return response;
};

const playtts = async (data) => {
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

  await new Promise((resolve) => {
    audio.addEventListener("ended", resolve);
    audio.play();
  });
};

const clickBehavior = async () => {
  const sendBtn = document.getElementById("send");
  const text_value = document.getElementById("prompt").value.trim();
  const text = document.getElementById("prompt");
  const response = document.getElementById("response");

  if (!text_value) {
    response.textContent = "Enter SOMETHING";
    text.value = "";
    return;
  }

  response.textContent = "Just Be Patient...";
  sendBtn.disabled = true;
  text.disabled = true;
  text.style.opacity = 0.5;

  try {
    const res = await printText(text_value);
    if (!res.ok) alert(ERROR);

    const data = await res.text();
    response.textContent = data;

    await playtts(data);
  } catch (err) {
    console.error("Error:", err);
    response.textContent = ERROR;
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send";
    text.value = "";
    text.disabled = false;
    text.style.opacity = 1;
  }
};

document.getElementById("send").addEventListener("click", clickBehavior);

document.getElementById("prompt").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    clickBehavior();
  }
});
