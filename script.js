const startScreen=document.getElementById("startScreen");
const lettersContainer=document.getElementById("lettersContainer");
const finale=document.getElementById("finale");
const question=document.getElementById("question");
const music=document.getElementById("music");

const word="I LOVE YOU";
let letters=[];

// Fill letters
for(let i=0;i<word.length;i++){
 const span=document.createElement("span");
 span.className="letter";
 span.innerText=word[i];
 span.style.top=Math.random()*80+"%";
 span.style.left=Math.random()*90+"%";
 lettersContainer.appendChild(span);
 letters.push(span);
}

// Start game
startScreen.onclick=()=>{
 startScreen.style.display="none";
 music.play();
 letters.forEach((el,i)=>{
   el.style.pointerEvents="auto";
   el.onclick=()=>moveLetter(el,i);
 });
};

// Track order
let currentIndex=0;
function moveLetter(el,i){
 if(i===currentIndex){
   el.style.top="50%";
   el.style.left=20+currentIndex*60+"px";
   currentIndex++;
   if(currentIndex===letters.length){
     setTimeout(showFinale,500);
   }
 }
}

// Finale show
function showFinale(){
 lettersContainer.classList.add("hidden");
 finale.classList.remove("hidden");
}

// Effects: hearts and flowers
const canvas=document.getElementById("effects");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let items=[];
class Effect{
 constructor(type){
  this.x=Math.random()*canvas.width;
  this.y=-10;
  this.size=Math.random()*10+5;
  this.speed=Math.random()*2+1;
  this.type=type;
 }
 draw(){
  if(this.type==='heart') ctx.fillStyle="#ff3366";
  else if(this.type==='flower') ctx.fillStyle="#ff99cc";
  else ctx.fillStyle="#ffd700";
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill();
  this.y+=this.speed;
 }
}
function startEffects(){
 setInterval(()=>{
   const types=['heart','flower','butterfly'];
   items.push(new Effect(types[Math.floor(Math.random()*types.length)]));
 },200);
 animate();
}
function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 items.forEach(item=>item.draw());
 requestAnimationFrame(animate);
}
startEffects();

// Buttons
document.addEventListener("click",(e)=>{
 if(e.target.id==="yes1"||e.target.id==="yes2"){
   question.style.display="none";
   alert("Të dua pafund ❤️\nMë fal për çdo gjë që të kam merzit 💌");
 }
});
