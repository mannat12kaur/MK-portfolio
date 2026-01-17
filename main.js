// Page fade in/out
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");

  // internal nav fade-out
  document.querySelectorAll("a[data-nav]").forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
      e.preventDefault();
      document.body.classList.remove("page-loaded");
      document.body.classList.add("page-leave");
      setTimeout(() => { window.location.href = href; }, 220);
    });
  });

  // scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) ent.target.classList.add("show");
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  // footer year (if present)
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
});

/* Toast */
function showToast(text){
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = text;
  t.style.display = "block";
  setTimeout(() => { t.style.display = "none"; }, 1600);
}

/* Copy helper */
function copyText(text){
  navigator.clipboard.writeText(text).then(() => showToast("Copied!"));
}

/* Modal */
function openModal(data){
  const back = document.getElementById("modalBackdrop");
  if (!back) return;

  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalDesc").textContent = data.desc;
  document.getElementById("modalImg").src = data.img || "assets/project1.png";
  document.getElementById("modalTech").textContent = data.tech;

  const badges = document.getElementById("modalBadges");
  badges.innerHTML = "";
  (data.tags || []).forEach(tag => {
    const s = document.createElement("span");
    s.className = "badge";
    s.textContent = tag;
    badges.appendChild(s);
  });

  back.classList.add("open");
}

function closeModal(){
  const back = document.getElementById("modalBackdrop");
  if (!back) return;
  back.classList.remove("open");
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* Safe “Ask Mannat” Chat (no API) */
const faq = [
  {
    q: ["roles", "target", "job", "looking for"],
    a: "I’m targeting entry-level roles like Data Analyst, Reporting/BI, Junior Analytics, and data-focused support roles. Long-term, I’m building toward Data Engineering."
  },
  {
    q: ["tech", "stack", "tools", "skills"],
    a: "My main tools are Python, SQL, Git/GitHub, and Firebase. I’m building analytics workflows, dashboards, and ETL-style projects. I also use light AI logic (recommendations/adaptive difficulty)."
  },
  {
    q: ["education", "study", "degree"],
    a: "I’m studying Computer Science. My focus is using that foundation to build data-driven projects in analytics, AI-assisted systems, and data engineering basics."
  },
  {
    q: ["ai learning buddy", "learning buddy", "project 1"],
    a: "AI Learning Buddy is an adaptive quiz app that tracks accuracy, speed, and weak topics, then recommends what to practice next. It’s “AI-assisted” using safe, practical logic (not deep ML)."
  },
  {
    q: ["data engineering", "pipeline", "etl"],
    a: "I’m building data engineering foundations through small pipelines: cleaning, transforming, validating data, storing it in tables, and producing reliable metrics—basically ETL/ELT thinking at a starter level."
  },
  {
    q: ["contact", "email", "reach"],
    a: "You can reach me through the Contact page. If you want, I can also add a button here that copies my email in one click."
  }
];

function findAnswer(text){
  const t = text.toLowerCase();
  for (const item of faq){
    if (item.q.some(k => t.includes(k))) return item.a;
  }
  return "Good question 🙂 I’m still updating this portfolio. Try asking about my roles, tech stack, education, or projects.";
}

function typeReply(container, text){
  const bubble = document.createElement("div");
  bubble.className = "msg bot";
  bubble.innerHTML = `<div class="bubble"></div>`;
  container.appendChild(bubble);

  const target = bubble.querySelector(".bubble");
  let i = 0;
  const timer = setInterval(() => {
    target.textContent = text.slice(0, i++);
    container.scrollTop = container.scrollHeight;
    if (i > text.length) clearInterval(timer);
  }, 12);
}

function addUserMsg(container, text){
  const m = document.createElement("div");
  m.className = "msg user";
  m.innerHTML = `<div class="bubble"></div>`;
  m.querySelector(".bubble").textContent = text;
  container.appendChild(m);
  container.scrollTop = container.scrollHeight;
}

function toggleChat(){
  const chat = document.getElementById("chat");
  if (!chat) return;
  chat.classList.toggle("open");
}

function ask(text){
  const body = document.getElementById("chatBody");
  if (!body) return;
  addUserMsg(body, text);
  const ans = findAnswer(text);
  setTimeout(() => typeReply(body, ans), 220);
}

// expose functions for HTML onclick
window.openModal = openModal;
window.closeModal = closeModal;
window.copyText = copyText;
window.toggleChat = toggleChat;
window.ask = ask;
