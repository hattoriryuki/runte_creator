document.addEventListener('DOMContentLoaded',()=> {
  let canvas = document.getElementById('js-drawPicture');
  let ctx = canvas.getContext('2d'); // canvas要素に2Dの描画を行うことができるようになる
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
  let drawJudgement = 0 // 0:白紙、 1:何かしら記入している
  let drawMode = 1;
  let x = 0;
  let y = 0;
  let clickFlag = 0; // クリック判定 0:クリック終了、1：クリック開始、2：クリック中
  let object = { handleEvent: DrawWithMause }; // イベントが発生するたびに呼び出される

  canvas.style.border = "1px solid"; // canvas要素の枠線

  function draw(x,y) {
    drawJudgement = 1;
    if (clickFlag === 1) {
      clickFlag = 2;
      ctx.beginPath(); // 現在のパスをリセットする
      ctx.moveTo(x,y); // パスの開始座標を指定する
    } else {
    ctx.lineTo(x,y); // 座業を指定してラインを引く
    }
    ctx.stroke(); // 現在のパスを輪郭表示する
  }

  function drawStart() {
    clickFlag = 1;
    canvas.addEventListener('mousemove', object);
  }

  function drawEnd() {
    clickFlag = 0;
    ctx.closePath();
    canvas.removeEventListener('mousemove', object);
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

  function DrawWithMause(event) {
    let rect = event.currentTarget.getBoundingClientRect(); // 座標情報取得
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    draw(x,y);
  }

  canvas.addEventListener('mousedown',drawStart);
  canvas.addEventListener('mouseout', drawEnd); // 要素からカーソルが出たときに発行
  canvas.addEventListener('mouseup', drawEnd);  // マウスのクリックを離すと発行

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
          if (comment.length < 50){
          window.location.replace('/pictures');
          }else{
            document.getElementById("js-flash-notice").classList.remove("hidden");
          }
        }
      }, 'image/png');
    };
  });
});
