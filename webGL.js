
var rotateSeconds = 1000;         
var revolve = 10;
var rotate = 1000;
var nowDrawing = false;

function main() {
    if (nowDrawing) {
        alert('描画中です');
    } else {
        nowDrawing = true;
        drowMovementLocus();
    } 
}

function drowMovementLocus() {
    const canvas = document.querySelector("#glCanvas");
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setRotateSeconds();
    setRevolve();
    setRotate();
    const intervalSecond = 1;
    var progressSeconds = 0;
    var timer = setInterval(function() {
        progressSeconds += intervalSecond;
        drowArc(progressSeconds, intervalSecond);
        if (progressSeconds === rotateSeconds) {
            clearInterval(timer);
            alert('終了');
            nowDrawing = false;
        }
    }, intervalSecond);
}

function drowArc(progressSeconds, intervalSecond) {
    const canvas = document.querySelector("#glCanvas");
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
        alert("error");
        return;
    }

    var revolveVelocity = revolve/60;      // r/s
    var rotateVelocity = rotate/60;       // r/s
    const revolveRadius = 150;
    const rotateRadius = 150;
    const startX = 300;
    const startY = 300;
    const roundAngle = 360;

    //回転開始時間・終了時間の計算
    var startSeconds = (progressSeconds - intervalSecond) / 1000;
    var endSeconds = progressSeconds / 1000;
    
    //自転中心座標の計算
    var revolveAngle = decimalPart(revolveVelocity * startSeconds) * roundAngle * Math.PI / 180; 
    var x = revolveRadius * Math.cos(revolveAngle) + startX;
    var y = revolveRadius * Math.sin(revolveAngle) + startY;
    
    //自転　開始角・終了角の計算
    var startAngle = decimalPart(rotateVelocity * startSeconds) * roundAngle * Math.PI / 180;
    var endAngle = decimalPart(rotateVelocity * endSeconds) * roundAngle * Math.PI / 180;
    var startAngle180 = ((decimalPart(rotateVelocity * startSeconds) * roundAngle) + 180) * Math.PI / 180;
    var endAngle180 = ((decimalPart(rotateVelocity * endSeconds) * roundAngle) + 180) * Math.PI / 180;
    //var startAngle = rotateVelocity * startSeconds * roundAngle;
    //var endAngle = rotateVelocity * endSeconds * roundAngle;

    //１つ目の羽
    ctx.beginPath();
    ctx.arc(x, y, rotateRadius, startAngle, endAngle);
    ctx.stroke();
    //2つ目の羽
    ctx.beginPath();
    ctx.arc(x, y, rotateRadius, startAngle180, endAngle180);
    ctx.stroke();
}

function decimalPart(num) {
    var decPart = num - ((num >= 0) ? Math.floor(num) : Math.ceil(num));
    return decPart;
}

function setRotateSeconds() {
    if (Number.isFinite(document.getElementById('rotateSeconds'))) {
        rotateSeconds = 13000;
        alert('回転時間を変更できませんでした');
    } else {
        rotateSeconds = document.getElementById('rotateSeconds').value * 1000;
    }
}

function setRevolve() {
    if (Number.isFinite(document.getElementById('revolve'))) {
        revolve = 18;
        alert('公転速度を変更できませんでした');
    } else {
        revolve = document.getElementById('revolve').value;
    }
}

function setRotate() {
    if (Number.isFinite(document.getElementById('rotate'))) {
        rotate = 1350;
        alert('自転速度を変更できませんでした');
    } else {
        rotate = document.getElementById('rotate').value;
    }
}

function findBlackArea() {
    const canvas = document.querySelector('#glCanvas');
    const ctx = canvas.getContext('2d');
    var image = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.width);
    count = 0;
    for (var i = 0; i < image.data.length; i += 4) {
        if (image.data[i] == 0 && image.data[i + 1] == 0 && image.data[i + 2] == 0) {
            count++;
        }
    }
    alert(count);
}

function saveCanvas() {
    const canvas = document.getElementById('glCanvas');
    var filename = document.getElementById('filename').value;
    if (filename === '') {
        filename = 'canvas';
    }
    var a = document.createElement('a');
    a.href = canvas.toDataURL();
    a.download = filename + '.png';
    a.click();
}

function countBlack() {
    const canvas = document.querySelector("#glCanvas");
    const ctx = canvas.getContext("2d");
    var image = ctx.getImageData(0, 0, 300, 300);
    var count = 0;
    for (var y = 0; y < image.height; y++) {
        for (var x = 0; x < image.width; x++) {
            var i = (x + y * image.width) * 4;
            var r = image.data[i];
            var g = image.data[i + 1];
            var b = image.data[i + 2];
            
            if (r !== 0 && g !== 0 && b !== 0) {
                count++;
                console.log('a');
            } 
        }
    }
    console.log(count);
}
