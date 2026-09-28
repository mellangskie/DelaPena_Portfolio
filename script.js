const profileImg = document.getElementById('profileImg');
const profileUpload = document.getElementById('profileUpload');
const editProfileBtn = document.getElementById('editProfileBtn');
const editModal = document.getElementById('editModal');
const closeBtn = document.querySelector('.close-btn');
const inputName = document.getElementById('inputName');
const inputSection = document.getElementById('inputSection');
const inputBio = document.getElementById('inputBio');
const confirmSaveBtn = document.getElementById('confirmSaveBtn');
const fullName = document.getElementById('fullName');
const courseSection = document.getElementById('courseSection');
const bio = document.getElementById('bio');

const DEFAULT_NAME = "Ma. Carmela L. Dela Peña";
const DEFAULT_SECTION = "3rd Year — Bachelor of Science in Computer Science";
const DEFAULT_BIO = "A dedicated Computer Science student passionate about technology, coding, and building useful digital solutions. I am eager to learn, committed to excellence, and excited to grow in the field of computing.";

if(localStorage.getItem('profilePhoto')) {
  profileImg.src = localStorage.getItem('profilePhoto');
}
fullName.textContent = localStorage.getItem('fullName') || DEFAULT_NAME;
courseSection.textContent = localStorage.getItem('courseSection') || DEFAULT_SECTION;
bio.textContent = localStorage.getItem('bio') || DEFAULT_BIO;

profileUpload.addEventListener('change', e => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    profileImg.src = ev.target.result;
    localStorage.setItem('profilePhoto', ev.target.result);
    alert('   Profile photo saved!');
  };
  reader.readAsDataURL(file);
});

editProfileBtn.addEventListener('click', () => {
  inputName.value = fullName.textContent;
  inputSection.value = courseSection.textContent;
  inputBio.value = bio.textContent;
  editModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => editModal.style.display = 'none');
window.addEventListener('click', e => {
  if(e.target === editModal) editModal.style.display = 'none';
});

confirmSaveBtn.addEventListener('click', () => {
  fullName.textContent = inputName.value.trim() || DEFAULT_NAME;
  courseSection.textContent = inputSection.value.trim() || DEFAULT_SECTION;
  bio.textContent = inputBio.value.trim() || DEFAULT_BIO;
  
  localStorage.setItem('fullName', fullName.textContent);
  localStorage.setItem('courseSection', courseSection.textContent);
  localStorage.setItem('bio', bio.textContent);
  
  editModal.style.display = 'none';
  alert('✅ Profile updated successfully!');
});

// ========== FILE UPLOAD SYSTEM ==========
const categories = ['quizzes', 'examinations', 'activities', 'projects'];

categories.forEach(cat => renderFiles(cat));

document.querySelectorAll('.save-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const category = this.getAttribute('data-category');
    let inputId;
    if(category === 'quizzes') inputId = 'quizFiles';
    else if(category === 'examinations') inputId = 'examFiles';
    else if(category === 'activities') inputId = 'activityFiles';
    else inputId = 'projectFiles';
    
    const input = document.getElementById(inputId);
    const files = input.files;
    
    if(files.length === 0) {
      alert('⚠️ Please select files first!');
      return;
    }
    
    saveFiles(category, files);
    input.value = '';
  });
});

function saveFiles(category, files) {
  const stored = JSON.parse(localStorage.getItem(category) || '[]');
  let loaded = 0;
  
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = ev => {
      stored.push({
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(1) + ' KB',
        data: ev.target.result,
        uploadedAt: new Date().toLocaleString()
      });
      
      loaded++;
      if(loaded === files.length) {
        localStorage.setItem(category, JSON.stringify(stored));
        renderFiles(category);
        alert(' ' + files.length + ' file(s) saved!');
      }
    };
    reader.readAsDataURL(file);
  });
}

function renderFiles(category) {
  const list = document.getElementById(category + 'List');
  const items = JSON.parse(localStorage.getItem(category) || '[]');
  list.innerHTML = '';

  if(items.length === 0) {
    list.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #8B7355; padding: 1rem;">No files uploaded yet.</p>';
    return;
  }

  items.forEach((item, index) => {
    const isImage = item.type.startsWith('image/');
    const card = document.createElement('div');
    card.className = 'file-card';
    
    let content = '';
    if(isImage) {
      content = '<img src="' + item.data + '" alt="' + item.name + '">';
    } else {
      const ext = item.name.split('.').pop().toUpperCase();
      content = '<div class="file-icon-placeholder">📄 ' + ext + '<br><small>' + item.size + '</small></div>';
    }
    
    const displayName = item.name.length > 28 ? item.name.substring(0, 25) + '...' : item.name;
    
    card.innerHTML = content +
      '<span class="file-name">' + displayName + '</span>' +
      '<small style="color:#888; font-size:0.7rem;">' + item.uploadedAt + '</small>' +
      '<div style="margin-top: 0.5rem;">' +
        '<a href="' + item.data + '" target="_blank" class="file-link"> View</a>' +
        '<a href="' + item.data + '" download="' + item.name + '" class="file-link"> Download</a>' +
      '</div>' +
      '<button class="delete-file-btn" data-cat="' + category + '" data-idx="' + index + '"> Delete</button>';
    
    list.appendChild(card);
  });

  document.querySelectorAll('.delete-file-btn').forEach(delBtn => {
    delBtn.addEventListener('click', function() {
      const cat = this.getAttribute('data-cat');
      const idx = parseInt(this.getAttribute('data-idx'));
      if(confirm('Delete this file?')) {
        let all = JSON.parse(localStorage.getItem(cat) || '[]');
        all.splice(idx, 1);
        localStorage.setItem(cat, JSON.stringify(all));
        renderFiles(cat);
      }
    });
  });
}
