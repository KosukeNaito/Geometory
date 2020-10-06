
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
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
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
    const revolveRadius = 70;
    const rotateRadius = 70;
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

