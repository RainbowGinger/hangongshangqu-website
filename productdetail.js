//session images switch
var images=document.querySelectorAll('.div1 img');
for (let i=0;i<images.length;i++){
    images[i].onclick=function(){
        document.querySelector('.div2 img').src=images[i].src;
    }
}

//sizechart
var sizechart=document.querySelector('.div3 a');
var btn=document.querySelector('#sizechart-image button')
sizechart.onclick=function(){
    document.getElementById('sizechart-image').style.display="block";
}

btn.onclick=function(){
    document.getElementById('sizechart-image').style.display="none";
}