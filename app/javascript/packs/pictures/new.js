document.addEventListener('DOMContentLoaded',()=> {
  var canvas = document.getElementById('js-drawPicture'),
    ctx = canvas.getContext('2d'),
    moveflg = 0,
    Xpoint,
    Ypoint,
    temp = [];

  const canvasWidth = 1000,
    canvasHeight = 550,
    download = document.getElementById('js-downloadCanvas'),
    lineWidth1 = document.getElementById('js-lineWidth-1'),
    lineWidth3 = document.getElementById('js-lineWidth-3'),
    lineWidth5 = document.getElementById('js-lineWidth-5'),
    lineWidth10 = document.getElementById('js-lineWidth-10'),
    pictureUpload = document.getElementById('js-pictureUpload'),
    elaser = document.getElementById('js-eraser'),
    color = document.getElementById('js-colorBox'),
    canvasClear = document.getElementById('js-clear'),
    undoButton = document.getElementById('undo'),
    redoButton = document.getElementById('redo');

  let lineColor = '#000000'
  let drawJudgement = 0;
  let drawMode = 1;

  canvas.style.border = "1px solid";

  var myStorage = localStorage;
  window.onload = initLocalStorage();

  canvas.addEventListener('mousedown', startPoint, false);
  canvas.addEventListener('mousemove', movePoint, false);
  canvas.addEventListener('mouseup', endPoint, false);

  function startPoint(e){
    e.preventDefault();
    ctx.beginPath();
    let rect = e.target.getBoundingClientRect();
    Xpoint = e.clientX - rect.left;
    Ypoint = e.clientY - rect.top;
    ctx.moveTo(Xpoint, Ypoint);
  }

  function movePoint(e) {
    if (e.buttons === 1 || e.witch === 1 || e.type == 'touchmove') {
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

  function endPoint(e) {
    if (moveflg === 0) {
      ctx.lineTo(Xpoint-1, Ypoint-1);
      ctx.lineCap = "round";
      ctx.stroke();
    }
    moveflg = 0;
    setLocalStoreage();
  }

  function resetCanvas() {
    drawJudgement = 0;
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  }

  function initLocalStorage(){
    myStorage.setItem("__log", JSON.stringify([]));
  }

  function setLocalStoreage() {
    var png = canvas.toDataURL();
    var logs = JSON.parse(myStorage.getItem("__log"));

    setTimeout(function() {
      logs.unshift({png:png});
      myStorage.setItem("__log", JSON.stringify(logs));
      temp = [];
    }, 0);
  }

  function prevCanvas() {
    var logs = JSON.parse(myStorage.getItem("__log"));
    if (logs.length > 0) {
      temp.unshift(logs.shift());

      setTimeout(function() {
        myStorage.setItem("__log", JSON.stringify(logs));
        resetCanvas();
        draw(logs[0]['png']);
      }, 0);
    }
  }

  function nextCanvas() {
    var logs = JSON.parse(myStorage.getItem("__log"));
    if (temp.length > 0) {
      logs.unshift(temp.shift());
      
      setTimeout(function() {
        myStorage.setItem("__log", JSON.stringify(logs));
        resetCanvas();
        draw(logs[0]['png']);
      }, 0);
    }
  }

  function draw(src) {
    var img = new Image();
    img.src = src;

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
  }

  function downloadPicture() {
    let dataURL = canvas.toDataURL();
    download.href = dataURL;
  }

  function changeDrawMode() {
    if (drawMode === 1) {
      drawMode = 2
      ctx.globalCompositeOperation = 'destination-out'; // 新たな図形を描くときに適用する合成演算の種類⇨透明化
      elaser.textContent  = '描画モード'
    } else {
      ctx.globalCompositeOperation = 'source-over'; // 新たな図形をすでにあるCanvasの内容の上に描く
      drawMode = 1;
      ctx.strokeStyle = lineColor;
      elaser.textContent = '消しゴム';
    }
  }

  function changeLineWidth(e) {
    ctx.lineWidth = this.width;
  }

  download.addEventListener('click', downloadPicture);

  canvasClear.addEventListener('click', ()=> {
    drawJudgement = 0;
    ctx.clearRect(0,0, canvasWidth, canvasHeight); // 四角形の形にクリアするメソッド
  });

  elaser.addEventListener('click', changeDrawMode);

  lineWidth1.addEventListener('click', { width: 1, handleEvent: changeLineWidth});
  lineWidth3.addEventListener('click', { width: 3, handleEvent: changeLineWidth});
  lineWidth5.addEventListener('click', { width: 5, handleEvent: changeLineWidth});
  lineWidth10.addEventListener('click', { width: 10, handleEvent: changeLineWidth});

  color.addEventListener('change', ()=> {
    lineColor = color.value;
    ctx.strokeStyle = lineColor;
  });

  undoButton.addEventListener('click', prevCanvas);
  redoButton.addEventListener('click', nextCanvas);

  pictureUpload.addEventListener('click', ()=> {
    const comment = document.getElementById("picture_comment").value;
    if (drawJudgement === 0) {
      window.alert('何か記入してください')
    } else {
      canvas.toBlob((blob) => {
        let reader = new FileReader();
        let formData = new FormData();
        const token = document.getElementsByName("csrf-token")[0].content;
        reader.readAsDataURL(blob);

        reader.onload = async function() {
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
          }else{
            document.getElementById("js-flash-notice").classList.remove("hidden");
          }
        }
      }, 'image/png');
    };
  });
});
