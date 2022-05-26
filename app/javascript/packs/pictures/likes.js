document.querySelector(".rgtm_btn").addEventListener("mousedown", function (e) {
  party.confetti(e,{
    count: party.variation.range(10, 20),
    lifetime: 2,
  });
});
const button = document.getElementById("button");
button.addEventListener("mousedown", () => {
button.classList.remove("jump");
void button.offsetWidth;
button.classList.add("jump");
});
