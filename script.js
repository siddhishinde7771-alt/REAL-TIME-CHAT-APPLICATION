let currentUser = null;
let userColor = "#6366f1";
let messages = [];

const avatarColors = [
  "#ef4444","#f97316","#eab308","#22c55e",
  "#14b8a6","#06b6d4","#3b82f6",
  "#6366f1","#8b5cf6","#ec4899"
];

// JOIN CHAT
document.getElementById("join-btn").onclick = () => {
  const name = document.getElementById("username-input").value.trim();
  if(!name) return;

  currentUser = name;

  document.getElementById("username-setup").classList.add("hidden");
  document.getElementById("message-input-container").classList.remove("hidden");
};

// SEND MESSAGE
document.getElementById("message-form").onsubmit = (e) => {
  e.preventDefault();
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if(!text) return;

  messages.push({
    sender: currentUser,
    message: text,
    color: userColor,
    time: new Date().toLocaleTimeString()
  });

  input.value="";
  renderMessages();
};

// RENDER
function renderMessages(){
  const container=document.getElementById("messages-container");
  container.innerHTML="";

  if(messages.length===0){
    container.innerHTML='<div class="text-center text-white/40 mt-10">No messages yet</div>';
    return;
  }

  messages.forEach(msg=>{
    const div=document.createElement("div");
    div.className="message-bubble flex items-start gap-2";

    div.innerHTML=`
      <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
           style="background:${msg.color}">
        ${msg.sender.charAt(0).toUpperCase()}
      </div>
      <div class="bg-white/10 p-3 rounded-xl text-white">
        <strong>${msg.sender}</strong>
        <p>${msg.message}</p>
        <small class="text-white/40">${msg.time}</small>
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById("message-count").innerText =
    messages.length+" messages";
}

// ================= SETTINGS =================

const modal=document.getElementById("settings-modal");
const settingsBtn=document.getElementById("settings-btn");
const closeBtn=document.getElementById("close-settings");
const saveBtn=document.getElementById("save-settings");
const editUsername=document.getElementById("edit-username");
const colorOptions=document.getElementById("color-options");

let selectedColor=userColor;

// OPEN MODAL
settingsBtn.onclick=()=>{
  if(!currentUser) return alert("Join chat first!");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  editUsername.value=currentUser;
  renderColors();
};

// CLOSE
closeBtn.onclick=()=>{
  modal.classList.add("hidden");
};

// RENDER COLORS
function renderColors(){
  colorOptions.innerHTML="";
  avatarColors.forEach(color=>{
    const div=document.createElement("div");
    div.className="color-circle";
    div.style.background=color;

    if(color===userColor){
      div.classList.add("selected");
      selectedColor=color;
    }

    div.onclick=()=>{
      selectedColor=color;
      userColor=color;
      renderColors();
    };

    colorOptions.appendChild(div);
  });
}

// SAVE
saveBtn.onclick=()=>{
  const newName=editUsername.value.trim();
  if(!newName) return;

  messages.forEach(msg=>{
    if(msg.sender===currentUser){
      msg.sender=newName;
      msg.color=selectedColor;
    }
  });

  currentUser=newName;
  userColor=selectedColor;

  modal.classList.add("hidden");
  renderMessages();
};