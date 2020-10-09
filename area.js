
document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('fileSelector');
    fileInput.addEventListener('change', handleFileSelect);
});

function calcBlackArea() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    var image = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    console.log(image.data);
}

const handleFileSelect = () => {
    const fileInput = document.getElementById('fileSelector');
    const file = fileInput.files[0];
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = file.name;
    console.log(image.src);
    console.log(image.src);
    image.onload = () => {
        ctx.drawImage(image, 0, 0);
    }
}


