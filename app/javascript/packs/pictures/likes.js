function rgtm_btnClick(e){
  party.confetti(e,{
    count: party.variation.range(10, 20),
    lifetime: 2,
  });
}
const rgtm_btns = document.getElementsByClassName('rgtm_btn');
for(let i = 0; i < rgtm_btns.length; i++){
  rgtm_btns[i].addEventListener('mousedown', rgtm_btnClick, false);
}

function buttonClick(e){
  this.classList.remove("jump");
  void this.offsetWidth;
  this.classList.add("jump");
}
const buttons = document.getElementsByClassName('button');
for(let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('mousedown', buttonClick, false);
}
