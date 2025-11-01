document.getElementById("send").addEventListener("click", async () => {
  const text = document.getElementById("prompt").value.trim();
  const response = document.getElementById("response");

  if (!text) {
    response.textContent = "Enter Something Dumbass";
    return;
  }

  response.textContent = "Wait for either the slow connection or server";

  try {
    const res = await fetch("https://monke.gay/gonads/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) alert("Stay tuned till I figure this error out");

    const data = await res.json();

    response.textContent = data.reply;
  } catch (err) {
    console.error("Fetch error:", err);
    response.textContent = "Im error handling in my head";
  }
});
