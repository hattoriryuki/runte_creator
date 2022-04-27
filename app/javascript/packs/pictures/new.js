document.addEventListener('DOMContentLoaded',()=> {
  var canvas = document.getElementById('js-drawPicture'),
    ctx = canvas.getContext('2d'),
    moveflg = 0,
    Xpoint,
    Ypoint,
    temp = [];

  const canvasWidth = 1000;
  const canvasHeight = 550;
  const download = document.getElementById('js-downloadCanvas');
  const pictureUpload = document.getElementById('js-pictureUpload');
  const canvasClear = document.getElementById('js-clear');
  const elaser = document.getElementById('js-eraser');
  const color = document.getElementById('js-colorBox');
  const lineWidth1 = document.getElementById('js-lineWidth-1')
  const lineWidth3= document.getElementById('js-lineWidth-3')
  const lineWidth5 = document.getElementById('js-lineWidth-5')
  const lineWidth10 = document.getElementById('js-lineWidth-10')
  let lineColor = '#000000'
  let drawJudgement = 0;
  let drawMode = 1;

  canvas.style.border = "1px solid";

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
