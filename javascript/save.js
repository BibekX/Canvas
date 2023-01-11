document.getElementById('save').addEventListener('click', (e) => {
    let link = document.createElement('a');
    link.href = canvasReal.toDataURL();
    link.download = 'my-masterpiece.png';
    link.click();
})