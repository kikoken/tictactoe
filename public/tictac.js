$(document).ready(()=>{
    new Vivus('svg', {duration: 200, file: 'svg/icon-x.svg'}, ()=>{
        console.log('Lanzado el svg');
    });
})