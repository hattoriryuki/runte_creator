document.addEventListener('DOMContentLoaded',()=> {
  var canvas = document.getElementById('js-drawPicture'),
    ctx = canvas.getContext('2d'),
    moveflg = 0,
    Xpoint,
    Ypoint,
    temp = [],
    bgColor = 'rgb(255,255,255)';

  const canvasWidth = 1000,
    canvasHeight = 550,
    pictureUpload = document.getElementById('js-pictureUpload'),
    download = document.getElementById('js-downloadCanvas'),
    elaser = document.getElementById('js-eraser'),
    color = document.getElementById('js-colorBox'),
    tooltips = document.getElementById('js-tooltips'),
    canvasClear = document.getElementById('js-clear'),
    undoButton = document.getElementById('undo'),
    redoButton = document.getElementById('redo');

  let lineColor = '#000000',
    drawMode = 1,
    drawJudgement = 0,
    currentLineWidth = 1;

  canvas.style.border = "1px solid"; 

  setBgColor();

  ctx.lineWidth = 5;

  var myStorage = localStorage;
  window.onload = initLocalStorage();

  canvas.addEventListener('mousedown', startPoint, false);
  canvas.addEventListener('mousemove', movePoint, false);
  canvas.addEventListener('mouseup', endPoint, false);

  canvas.addEventListener('touchstart', touchStartPoint, false);
  canvas.addEventListener('touchmove', touchMovePoint, false);
  canvas.addEventListener('touchend', endPoint, false);

  function setBgColor(){
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  function startPoint(e){
    e.preventDefault();
    ctx.beginPath();
    let rect = e.target.getBoundingClientRect();
    Xpoint = e.clientX - rect.left;
    Ypoint = e.clientY - rect.top;
    ctx.moveTo(Xpoint, Ypoint);
  }

  function movePoint(e){
    if (e.buttons === 1 || e.witch === 1 || e.type == 'touchmove'){
      let rect = e.target.getBoundingClientRect();
      Xpoint = e.clientX - rect.left;
      Ypoint = e.clientY - rect.top;
      moveflg = 1;
      drawJudgement = 1;
      ctx.lineTo(Xpoint, Ypoint);
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }

  function endPoint(e){
    if (moveflg === 0){
      ctx.lineTo(Xpoint-1, Ypoint-1);
      ctx.lineCap = "round";
      ctx.stroke();
    }
    moveflg = 0;
    setLocalStoreage();
  }

  function touchStartPoint(e){
    e.preventDefault();
    ctx.beginPath();
    Xpoint = e.layerX;
    Ypoint = e.layerY;
    ctx.moveTo(Xpoint, Ypoint);
  }

  function touchMovePoint(e){
    if (e.buttons === 1 || e.witch === 1 || e.type == 'touchmove'){
      Xpoint = e.layerX;
      Ypoint = e.layerY;
      moveflg = 1;
      drawJudgement = 1;
      ctx.lineTo(Xpoint, Ypoint);
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }

  function resetCanvas(){
    drawJudgement = 0;
    ctx.fillStyle = bgColor;
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  }

  function initLocalStorage(){
    myStorage.setItem("__log", JSON.stringify([]));
  }

  function setLocalStoreage(){
    var png = canvas.toDataURL();
    var logs = JSON.parse(myStorage.getItem("__log"));

    setTimeout(function(){
      logs.unshift({png:png});
      myStorage.setItem("__log", JSON.stringify(logs));
      temp = [];
    }, 0);
  }

  function prevCanvas(){
    var logs = JSON.parse(myStorage.getItem("__log"));
    if (logs.length > 0){
      temp.unshift(logs.shift());

      setTimeout(function(){
        myStorage.setItem("__log", JSON.stringify(logs));
        resetCanvas();
        if (logs[0]){
          draw(logs[0]['png']);
        }
      }, 0);
    }
  }

  function nextCanvas(){
    var logs = JSON.parse(myStorage.getItem("__log"));
    if (temp.length > 0){
      logs.unshift(temp.shift());
      
      setTimeout(function(){
        myStorage.setItem("__log", JSON.stringify(logs));
        resetCanvas();
        draw(logs[0]['png']);
      }, 0);
    }
  }

  function draw(src){
    drawJudgement = 1;
    var img = new Image();
    img.src = src;

    img.onload = function(){
        ctx.drawImage(img, 0, 0);
    }
  }

  function changeDrawMode(){
    if (drawMode === 1){
      drawMode = 2
      ctx.strokeStyle = '#FFFFFF';
      elaser.textContent  = '描画モード'
    } else {
      ctx.globalCompositeOperation = 'source-over'; 
      drawMode = 1;
      ctx.strokeStyle = lineColor;
      elaser.textContent = '消しゴム';
    }
  }

  function downloadPicture(){
    let dataURL = canvas.toDataURL();
    download.href = dataURL;
  }

  function initConfigOfLineWidth(){
    const textForCurrentSize = document.querySelector('#line-width');
    const rangeSelector = document.querySelector('#range-selector');
    currentLineWidth = rangeSelector.value;
    rangeSelector.addEventListener('input', event => {
      const width = event.target.value;
      currentLineWidth = width;
      ctx.lineWidth = currentLineWidth;
      textForCurrentSize.innerText = width;
    });
  }

  initConfigOfLineWidth();

  color.addEventListener('change', ()=> {
    lineColor = color.value;
    ctx.strokeStyle = lineColor;
  });

  color.addEventListener('mouseenter', ()=> {
    tooltips.classList.remove('hidden');
  })
  color.addEventListener('mouseleave', ()=> {
    tooltips.classList.add('hidden');
  })

  elaser.addEventListener('click', changeDrawMode);

  canvasClear.addEventListener('click', ()=> {
    if (confirm('イラストをリセットしますか？')){
      drawJudgement = 0;
      initLocalStorage();
      temp = [];
      resetCanvas();
      setBgColor();

    }
  });

  undoButton.addEventListener('click', prevCanvas);
  redoButton.addEventListener('click', nextCanvas);

  download.addEventListener('click', downloadPicture);

  pictureUpload.addEventListener('click', ()=> {
    const comment = document.getElementById("picture_comment").value;
    if (drawJudgement === 0){
      window.alert('何か記入してください')
    } else {
      canvas.toBlob((blob) => {
        let reader = new FileReader();
        let formData = new FormData();
        const token = document.getElementsByName("csrf-token")[0].content;
        reader.readAsDataURL(blob);

        reader.onload = async function(){
          let dataUrlBase64 = reader.result;
          let base64 = dataUrlBase64.replace(/data:.*\/.*;base64,/, '');
          formData.append("picture[image]", base64);
          formData.append("picture[picture_comment]", comment);
          let response = await fetch('/pictures', {
            method: 'POST',
            headers: {'X-CSRF-Token': token},
            body: formData
          });
          if (comment.length <= 50){
          window.location.replace('/pictures');
          } else {
            document.getElementById("js-flash-notice").classList.remove("hidden");
          }
        }
      }, 'image/png');
    };
  });
});
