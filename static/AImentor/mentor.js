/* ==========================================
   AI CHATBOT - DECISION TWIN
========================================== */

const container = document.getElementById("container");
const chatSection = document.getElementById("chatSection");
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Local Logo Path
const logoPath = "file:///c:/Users/pvyaw/Downloads/logo.jpeg";

let started = false;

/* ==========================================
   EVENT LISTENERS
========================================== */
input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});

sendBtn.addEventListener("click", sendMessage);

function askQuestion(question){
    input.value = question;
    sendMessage();
}

function startChat(){
    started = true;
    container.classList.add("chat-mode");
    chatSection.classList.add("active");
}

function sendMessage(){
    const text = input.value.trim();
    if(text === "") return;

    if(!started){
        startChat();
    }

    addUserMessage(text);
    input.value = "";
    showTyping();

    setTimeout(() => {
        removeTyping();
        addAIMessage(getReply(text));
    }, 1000);
}

/* ==========================================
   USER MESSAGE
========================================== */
function addUserMessage(text){
    const div = document.createElement("div");
    div.className = "message user";
    div.innerHTML = `
        <div class="bubble user-bubble">${text}</div>
        <div class="avatar user-avatar">👤</div>
    `;
    chatBox.appendChild(div);
    scrollBottom();
}

/* ==========================================
   AI MESSAGE WITH LOGO AVATAR
========================================== */
function addAIMessage(text){
    const div = document.createElement("div");
    div.className = "message ai";
    div.innerHTML = `
        <div class="avatar ai-avatar">
            <img src="${logoPath}" alt="Decision Twin Avatar" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/4712/4712109.png';">
        </div>
        <div class="bubble ai-bubble">${text}</div>
    `;
    chatBox.appendChild(div);
    scrollBottom();
}

/* ==========================================
   TYPING INDICATOR
========================================== */
function showTyping(){
    const typing = document.createElement("div");
    typing.id = "typing";
    typing.className = "message ai";
    typing.innerHTML = `
        <div class="avatar ai-avatar">
            <img src="${logoPath}" alt="Decision Twin Avatar" onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/4712/4712109.png';">
        </div>
        <div class="bubble ai-bubble">
            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatBox.appendChild(typing);
    scrollBottom();
}

function removeTyping(){
    const typing = document.getElementById("typing");
    if(typing){
        typing.remove();
    }
}

function scrollBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* ==========================================
   EXPANDED AI REPLY ENGINE
========================================== */
function getReply(question){
    question = question.toLowerCase().trim();

    // AI
    if(question.includes("ai") || question.includes("artificial intelligence")){
        return `
        <h3>🤖 Artificial Intelligence</h3>
        <p>AI is leading the current tech revolution. It involves training systems to reason, solve problems, and optimize tasks autonomously.</p>
        <br><b>Popular Roles:</b>
        <ul>
            <li>AI Engineer</li>
            <li>Machine Learning Engineer</li>
            <li>Data Scientist</li>
            <li>Prompt Engineer</li>
        </ul>
        <br><b>Key Skills:</b> Python, Math & Linear Algebra, TensorFlow, PyTorch, LangChain.
        `;
    }

    // Cybersecurity
    if(question.includes("cyber")){
        return `
        <h3>🔒 Cybersecurity</h3>
        <p>Protects computer systems, networks, and data from digital attacks and unauthorized access.</p>
        <br><b>Career Roles:</b>
        <ul>
            <li>Ethical Hacker / Pen Tester</li>
            <li>Security Analyst</li>
            <li>Cloud Security Specialist</li>
        </ul>
        <br><b>Certifications:</b> CompTIA Security+, CEH, CISSP.
        `;
    }

    // MS vs Job
    if(question.includes("ms")){
        return `
        <h3>🎓 MS or Job?</h3>
        <b>Choose MS if:</b>
        <ul>
            <li>You plan to specialize or research deeply.</li>
            <li>You want global career exposure (USA, UK, Germany, etc.).</li>
        </ul>
        <br><b>Choose Job if:</b>
        <ul>
            <li>You prioritize financial independence now.</li>
            <li>You prefer gaining industry skills practically.</li>
        </ul>
        `;
    }

    // Web Development
    if(question.includes("web") || question.includes("frontend") || question.includes("backend")){
        return `
        <h3>🌐 Web Development</h3>
        <p>Web engineering ranges from building interactive user interfaces to robust server architectures.</p>
        <br><b>Tech Stack:</b>
        <ul>
            <li><b>Frontend:</b> HTML, CSS, JavaScript, React / Next.js</li>
            <li><b>Backend:</b> Node.js, Express, Python, Java</li>
            <li><b>Database:</b> MongoDB, PostgreSQL, MySQL</li>
        </ul>
        `;
    }

    // Data Science
    if(question.includes("data science") || question.includes("data analyst")){
        return `
        <h3>📊 Data Science Career</h3>
        <p>Data Science involves extracting meaningful insights from complex data to drive business decisions.</p>
        <br><b>Core Topics to Learn:</b>
        <ul>
            <li>Python (Pandas, NumPy, Matplotlib)</li>
            <li>SQL & Relational Databases</li>
            <li>Statistics & Probability</li>
            <li>Power BI / Tableau</li>
        </ul>
        `;
    }

    // Cloud Computing
    if(question.includes("cloud") || question.includes("aws") || question.includes("devops")){
        return `
        <h3>☁️ Cloud Computing & DevOps</h3>
        <p>Managing scalable web platforms and automating software deployment pipelines.</p>
        <br><b>Key Platforms & Tools:</b> AWS, Google Cloud (GCP), Microsoft Azure, Docker, Kubernetes, Terraform.
        `;
    }

    // Internship vs Job
    if(question.includes("internship")){
        return `
        <h3>💼 Internship vs Full-Time Job</h3>
        <p>Internships build your resume and provide practical work exposure. If you are in college or transitioning careers, securing 1-2 internships before applying for full-time jobs increases your hiring chances significantly!</p>
        `;
    }

    // Resume
    if(question.includes("resume") || question.includes("cv")){
        return `
        <h3>📄 Resume Preparation Tips</h3>
        <ul>
            <li>Keep it concise (1 page for freshers).</li>
            <li>Highlight 2–3 major projects with GitHub links.</li>
            <li>Use action verbs (e.g., "Developed", "Optimized", "Designed").</li>
            <li>Tailor skills according to the job description (ATS-friendly).</li>
        </ul>
        `;
    }

    // Programming
    if(question.includes("programming") || question.includes("language")){
        return `
        <h3>💻 Best Programming Languages</h3>
        <ol>
            <li><b>Python</b> (AI, Data Science, Scripting)</li>
            <li><b>JavaScript</b> (Web Development)</li>
            <li><b>Java / C++</b> (Data Structures & Core Software Engineering)</li>
            <li><b>SQL</b> (Database Queries)</li>
        </ol>
        `;
    }

    // Best Career
    if(question.includes("career") || question.includes("b.tech") || question.includes("btech")){
        return `
        <h3>🚀 Top Careers After Graduation</h3>
        <ul>
            <li>Software Engineer / Web Developer</li>
            <li>AI / Machine Learning Engineer</li>
            <li>Cloud & DevOps Engineer</li>
            <li>Cybersecurity Analyst</li>
            <li>Data Scientist</li>
        </ul>
        `;
    }

    // Certifications
    if(question.includes("certification")){
        return `
        <h3>📜 Recommended Certifications</h3>
        <ul>
            <li>AWS Certified Cloud Practitioner</li>
            <li>Meta Frontend/Backend Developer (Coursera)</li>
            <li>CompTIA Security+</li>
            <li>Google Data Analytics Professional</li>
        </ul>
        `;
    }

    // Highest Paying
    if(question.includes("highest") || question.includes("salary") || question.includes("paying")){
        return `
        <h3>💰 Top Paying IT Roles</h3>
        <ol>
            <li>AI / ML Architect</li>
            <li>Cloud Architect</li>
            <li>DevOps Lead</li>
            <li>Cybersecurity Architect</li>
            <li>Full Stack Engineer</li>
        </ol>
        `;
    }

    // Greeting
    if(question.includes("hi") || question.includes("hello") || question.includes("hey")){
        return `
        <h3>👋 Welcome to Decision Twin!</h3>
        <p>I'm your AI career mentor. Ask me about career paths, tech stacks, higher education, or interview prep!</p>
        `;
    }

    // Default Reply
    return `
    <h3>🤖 Decision Twin Assistant</h3>
    <p>Thanks for your question! I can guide you on topics like AI, Web Dev, Data Science, Cybersecurity, Resumes, and MS opportunities.</p>
    `;
}

window.onload = function(){
    input.focus();
};