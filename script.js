let taskState = {
  title: "Implement Authentication Flow",
  description: "Ensure OAuth2 and JWT implementations are completed for the new user dashboard login process. This requires updating the auth middleware, handling token refresh logic safely in the browser via HttpOnly cookies, and ensuring CORS policies are correctly configured for the production environments across both the API and client-side applications.",
  priority: "High",
  status: "Pending", 
  dueDate: new Date(Date.now() + (2 * 60 * 60 * 1000) + (15 * 60 * 1000)) 
};

const elements = {
  card: document.getElementById('task-card'),
  viewMode: document.getElementById('view-mode'),
  editMode: document.getElementById('edit-mode'),
  
  displayTitle: document.getElementById('display-title'),
  displayDesc: document.getElementById('display-desc'),
  displayPriority: document.getElementById('display-priority'),
  displayStatus: document.getElementById('display-status'),
  displayDueDate: document.getElementById('display-due-date'),
  timeRemainingText: document.getElementById('time-remaining'),
  overdueBadge: document.getElementById('overdue-badge'),
  
  completeToggle: document.getElementById('complete-toggle'),
  statusControl: document.getElementById('status-control'),
  expandBtn: document.getElementById('expand-btn'),
  collapsibleSection: document.getElementById('desc-collapsible'),
  
  editTitle: document.getElementById('edit-title'),
  editDesc: document.getElementById('edit-desc'),
  editPriority: document.getElementById('edit-priority'),
  editDue: document.getElementById('edit-due'),
  
  editBtn: document.getElementById('edit-btn'),
  deleteBtn: document.getElementById('delete-btn'),
  cancelBtn: document.getElementById('cancel-btn'),
  saveBtn: document.getElementById('save-btn'),
  editForm: document.getElementById('edit-mode')
};

function renderUI() {
  elements.displayTitle.textContent = taskState.title;
  elements.displayDesc.textContent = taskState.description;
  elements.displayPriority.textContent = taskState.priority;
  elements.displayStatus.textContent = taskState.status;
  elements.statusControl.value = taskState.status;
  elements.completeToggle.checked = (taskState.status === "Done");

  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  elements.displayDueDate.textContent = taskState.dueDate.toLocaleDateString('en-US', dateOptions);
  elements.displayDueDate.setAttribute('datetime', taskState.dueDate.toISOString());

  elements.card.className = 'todo-card'; 
  elements.card.classList.add(`priority-${taskState.priority.toLowerCase()}`);
  
  if (taskState.status === "Done") elements.card.classList.add('status-done');
  if (taskState.status === "In Progress") elements.card.classList.add('status-in-progress');

  elements.displayPriority.className = `badge ${taskState.priority.toLowerCase()}`;

  updateTimeLogic();
}

function updateTimeLogic() {
  if (taskState.status === "Done") {
    elements.timeRemainingText.textContent = "Completed";
    elements.timeRemainingText.classList.remove('is-overdue');
    elements.overdueBadge.classList.add('hidden');
    return;
  }

  const now = Date.now();
  const diffMs = taskState.dueDate.getTime() - now;
  const isOverdue = diffMs < 0;
  
  const absMs = Math.abs(diffMs);
  const diffMins = Math.floor(absMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  let timeText = "";
  if (diffDays > 0) {
    timeText = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  } else if (diffHours > 0) {
    timeText = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
  } else {
    timeText = `${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
  }

  if (isOverdue) {
    elements.timeRemainingText.textContent = `Overdue by ${timeText}`;
    elements.timeRemainingText.classList.add('is-overdue');
    elements.overdueBadge.classList.remove('hidden');
  } else {
    elements.timeRemainingText.textContent = `Due in ${timeText}`;
    elements.timeRemainingText.classList.remove('is-overdue');
    elements.overdueBadge.classList.add('hidden');
  }
}

setInterval(updateTimeLogic, 30000); 

elements.expandBtn.addEventListener('click', () => {
  const isExpanded = elements.expandBtn.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    elements.collapsibleSection.classList.add('collapsed');
    elements.expandBtn.setAttribute('aria-expanded', 'false');
    elements.expandBtn.textContent = 'Show more';
  } else {
    elements.collapsibleSection.classList.remove('collapsed');
    elements.expandBtn.setAttribute('aria-expanded', 'true');
    elements.expandBtn.textContent = 'Show less';
  }
});

elements.completeToggle.addEventListener('change', (e) => {
  if (e.target.checked) {
    taskState.status = "Done";
  } else {
    taskState.status = "Pending"; 
  }
  renderUI();
});

elements.statusControl.addEventListener('change', (e) => {
  taskState.status = e.target.value;
  renderUI();
});

function openEditMode() {
  elements.editTitle.value = taskState.title;
  elements.editDesc.value = taskState.description;
  elements.editPriority.value = taskState.priority;
  
  const tzoffset = taskState.dueDate.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(taskState.dueDate.getTime() - tzoffset)).toISOString().slice(0,16);
  elements.editDue.value = localISOTime;

  elements.viewMode.classList.remove('active');
  elements.editMode.classList.add('active');
  elements.editTitle.focus();
}

function closeEditMode() {
  elements.editMode.classList.remove('active');
  elements.viewMode.classList.add('active');
  elements.editBtn.focus();
}

elements.editBtn.addEventListener('click', openEditMode);
elements.cancelBtn.addEventListener('click', closeEditMode);

elements.editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  taskState.title = elements.editTitle.value;
  taskState.description = elements.editDesc.value;
  taskState.priority = elements.editPriority.value;
  taskState.dueDate = new Date(elements.editDue.value);
  
  renderUI();
  closeEditMode();
});

elements.deleteBtn.addEventListener('click', () => {
  alert('Delete action triggered!');
});

renderUI();