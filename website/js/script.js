readText = (text) => {
  if (!("speechSynthesis" in window)) {
    console.log("Why tf is the speechSynthesis not supported");
    return;
  }
  const tts = new SpeechSynthesisUtterance(text);
  tts.lang = "en-US";
  tts.pitch = 1;
  tts.rate = 1;
  tts.volume = 1;

  window.speechSynthesis.speak(tts);
};

document.getElementById("send").addEventListener("click", async () => {
  const text_value = document.getElementById("prompt").value.trim();
  const text = document.getElementById("prompt");
  const response = document.getElementById("response");

  if (!text_value) {
    response.textContent = "Enter SOMETHING";
    readText(response.textContent);
    text.value = "";
    return;
  }

  response.textContent = "Wait for either the slow connection or server";

  try {
    console.log("The start of the program");
    const res = await fetch("https://monke.gay/gonads/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { text_value },
    });

    if (!res.ok) alert("Stay tuned till I figure this error out");
    console.log("breakpoint 1 worked");

    const data = await res.json();
    console.log("breakpoint 2 worked");

    response.textContent = data.reply;
    readText(response.textContent);
    console.log("breakpoint 3 worked");
    text.value = "";
  } catch (err) {
    console.error("Fetch error:", err);
    response.textContent = "Stay tuned till I figure this error out";
    readText(response.textContent);
    console.log("before text change");
    text.value = "";
    console.log("after text change");
  }
});
