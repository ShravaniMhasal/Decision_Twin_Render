// ======================================================
// DECISION TWIN
// Main JavaScript (100% Client-Side)
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Decision Twin Loaded Successfully");

// ================================================
// Resume Upload
// ================================================

const resumeInput = document.getElementById("resume");

if(resumeInput){

resumeInput.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file) return;

const uploadBox=document.querySelector(".upload-box");

uploadBox.innerHTML=`

<i class="fa-solid fa-file-circle-check"></i>

<h3>${file.name}</h3>

<p style="color:#2EC4B6">

Resume Uploaded Successfully

</p>

<label for="resume" class="primary-btn">

Change Resume

</label>

<input type="file" id="resume">

`;

});

}

// ================================================
// Resume Analysis Animation
// ================================================

const analyzeBtn=document.getElementById("analyzeBtn");

const loading=document.getElementById("loadingSection");

const result=document.getElementById("resultSection");

if(analyzeBtn){

analyzeBtn.addEventListener("click",()=>{

loading.classList.remove("hidden");

result.classList.add("hidden");

analyzeBtn.disabled=true;

analyzeBtn.innerHTML="Analyzing...";

setTimeout(()=>{

loading.classList.add("hidden");

result.classList.remove("hidden");

analyzeBtn.disabled=false;

analyzeBtn.innerHTML="Analyze Again";

animateScore();

animateBars();

},2500);

});

}

// ================================================
// Circular Score Animation
// ================================================

function animateScore(){

const score=document.getElementById("score");

if(!score) return;

let current=0;

const target=89;

const timer=setInterval(()=>{

current++;

score.innerHTML=current+"%";

if(current>=target){

clearInterval(timer);

}

},20);

}

// ================================================
// Progress Bars
// ================================================

function animateBars(){

const bars=document.querySelectorAll(".progress-fill");

bars.forEach(bar=>{

const width=bar.style.width;

bar.style.width="0";

setTimeout(()=>{

bar.style.width=width;

},200);

});

}
// ================================================
// Timeline Completion
// ================================================

const completeButtons = document.querySelectorAll(".complete-btn");

let completedSteps = 0;

completeButtons.forEach(button => {

    button.addEventListener("click", function () {

        if (this.classList.contains("done")) return;

        this.classList.add("done");

        this.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        Completed
        `;

        this.style.background = "#22C55E";

        completedSteps++;

        updateRoadmapProgress();

        showToast("Step Completed Successfully 🎉");

    });

});

// ================================================
// Roadmap Progress
// ================================================

function updateRoadmapProgress() {

    const progress = document.querySelector(".career-card .progress-fill");

    const percentage = document.querySelector(".career-card strong");

    if (!progress || !percentage) return;

    let percent = 35 + completedSteps * 10;

    if (percent > 100) percent = 100;

    progress.style.width = percent + "%";

    percentage.innerHTML = percent + "%";

}

// ================================================
// Download Roadmap
// ================================================

const downloadBtn = document.querySelector(".fa-download");

if (downloadBtn) {

    downloadBtn.parentElement.addEventListener("click", () => {

        showToast("Generating local download package...");

    });

}

// ================================================
// Print Roadmap
// ================================================

const printBtn = document.querySelector(".fa-print");

if (printBtn) {

    printBtn.parentElement.addEventListener("click", () => {

        window.print();

    });

}

// ================================================
// Course Buttons
// ================================================

const exploreButtons = document.querySelectorAll(".secondary-btn");

exploreButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        showToast("Course details available in roadmap view.");

    });

});

// ================================================
// Skill Hover Animation
// ================================================

const skills = document.querySelectorAll(".skill");

skills.forEach(skill => {

    skill.addEventListener("mouseenter", () => {

        skill.style.transform = "scale(1.08)";

    });

    skill.addEventListener("mouseleave", () => {

        skill.style.transform = "scale(1)";

    });

});
// ================================================
// Toast Notification
// ================================================

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=`
<i class="fa-solid fa-circle-check"></i>
${message}
`;

document.body.appendChild(toast);

setTimeout(()=>{

toast.style.opacity="0";

toast.style.transform="translateY(20px)";

},2500);

setTimeout(()=>{

toast.remove();

},3000);

}

// ================================================
// Scroll Reveal Animation
// ================================================

const revealElements=document.querySelectorAll(

".glass-card,.course-card,.project-card,.timeline-item"

);

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-up");

}

});

},

{

threshold:.15

}

);

revealElements.forEach(el=>{

observer.observe(el);

});

// ================================================
// Counter Animation
// ================================================

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

const target=Number(counter.dataset.target)||0;

let current=0;

const speed=20;

const timer=setInterval(()=>{

current++;

counter.innerHTML=current;

if(current>=target){

clearInterval(timer);

}

},speed);

});

// ================================================
// Navbar Active Link
// ================================================

const links=document.querySelectorAll("nav a");

links.forEach(link=>{

link.addEventListener("click",()=>{

links.forEach(l=>l.classList.remove("active"));

link.classList.add("active");

});

});

// ================================================
// Button Ripple Effect
// ================================================

const buttons=document.querySelectorAll(

".primary-btn,.secondary-btn"

);

buttons.forEach(button=>{

button.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

const rect=button.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

button.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

// ================================================
// Fake AI Recommendation Update
// ================================================

const careerSelect=document.getElementById("career");

if(careerSelect){

careerSelect.addEventListener("change",()=>{

showToast(

"AI recommendations updated for " +

careerSelect.value

);

});

}

console.log("Decision Twin UI Loaded Successfully 🚀");

});