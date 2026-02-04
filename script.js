let currentText = "";
let currentCategory = "categories";

const categories = {
    feelings: [
        { word: 'happy', emoji: '😊', label: 'Happy' },
        { word: 'sad', emoji: '😢', label: 'Sad' },
        { word: 'tired', emoji: '😴', label: 'Tired' },
        { word: 'hurt', emoji: '🤕', label: 'Hurt' },
        { word: 'angry', emoji: '😠', label: 'Angry' },
        { word: 'scared', emoji: '😨', label: 'Scared' }
    ],
    needs: [
        { word: 'water', emoji: '💧', label: 'Water' },
        { word: 'food', emoji: '🍕', label: 'Food' },
        { word: 'bathroom', emoji: '🚻', label: 'Bathroom' },
        { word: 'hungry', emoji: '🍽️', label: 'Hungry' },
        { word: 'thirsty', emoji: '🥤', label: 'Thirsty' },
        { word: 'cold', emoji: '🥶', label: 'Cold' },
        { word: 'hot', emoji: '🥵', label: 'Hot' }
    ],
    words: [
        { word: 'yes', emoji: '✅', label: 'Yes' },
        { word: 'no', emoji: '❌', label: 'No' },
        { word: 'please', emoji: '🙏', label: 'Please' },
        { word: 'thank you', emoji: '🙌', label: 'Thank You' },
        { word: 'I', emoji: '👤', label: 'I' },
        { word: 'want', emoji: '👉', label: 'Want' },
        { word: 'need', emoji: '❗', label: 'Need' },
        { word: 'help', emoji: '🆘', label: 'Help' }
    ],
    actions: [
        { word: 'go', emoji: '🚶', label: 'Go' },
        { word: 'stop', emoji: '🛑', label: 'Stop' },
        { word: 'sit', emoji: '🪑', label: 'Sit' },
        { word: 'stand', emoji: '🧍', label: 'Stand' },
        { word: 'sleep', emoji: '😴', label: 'Sleep' },
        { word: 'eat', emoji: '🍴', label: 'Eat' }
    ],
    people: [
        { word: 'mom', emoji: '👩‍🦰', label: 'Mom' },
        { word: 'dad', emoji: '👨‍🦰', label: 'Dad' },
        { word: 'sister', emoji: '👧', label: 'Sister' },
        { word: 'brother', emoji: '👦', label: 'Brother' },
        { word: 'friend', emoji: '🧑‍🤝‍🧑', label: 'Friend' },
        { word: 'teacher', emoji: '👩‍🏫', label: 'Teacher' },
        { word: 'therapist', emoji: '👨‍⚕️', label: 'Therapist' },
        { word: 'doctor', emoji: '👩‍⚕️', label: 'Doctor' },
        { word: 'grandma', emoji: '👵', label: 'Grandma' }
    ],
    quickPhrases: [
        { word: 'I want to go home', emoji: '🏠', label: 'Go Home' },
        { word: 'I need help please', emoji: '🆘', label: 'Need Help' },
        { word: 'I am feeling sick', emoji: '🤒', label: 'Feeling Sick' },
        { word: 'Can we take a break', emoji: '⏸️', label: 'Take a Break' },
        { word: 'Thank you very much', emoji: '🙏', label: 'Thank You' },
        { word: 'I want to eat', emoji: '🍽️', label: 'Want to Eat' },
        { word: 'I need to use the bathroom', emoji: '🚻', label: 'Bathroom' },
        { word: 'I am happy', emoji: '😊', label: 'I am Happy' },
        { word: 'I am sad', emoji: '😢', label: 'I am Sad' },
        { word: 'I want water please', emoji: '💧', label: 'Want Water' }
    ]
};

const categoryInfo = {
    feelings: { emoji: '😊', label: 'Feelings' },
    needs: { emoji: '🍕', label: 'Needs' },
    words: { emoji: '💬', label: 'Words' },
    actions: { emoji: '🚶', label: 'Actions' },
    people: { emoji: '👨‍👩‍👧', label: 'People' },
    quickPhrases: { emoji: '⭐', label: 'Quick Phrases' }
};

function showCategory(categoryName) {
    currentCategory = categoryName;
    document.getElementById('backBtn').style.display = 'block';
    
    const grid = document.getElementById('symbolGrid');
    const items = categories[categoryName];
    
    grid.innerHTML = '';
    
    items.forEach(item => {
        const button = document.createElement('button');
        button.className = 'symbol-btn';
        button.onclick = () => addWord(item.word);
        
        if (item.isImage) {
            button.innerHTML = `
                <img src="${item.emoji}" alt="${item.label}" class="symbol-image">
                <span class="label">${item.label}</span>
            `;
        } else {
            button.innerHTML = `
                <span class="symbol">${item.emoji}</span>
                <span class="label">${item.label}</span>
            `;
        }
        
        grid.appendChild(button);
    });
}

function addWord(word) {
    if (currentText === "Tap symbols to communicate") {
        currentText = "";
    }
    
    if (word.includes(' ')) {
        currentText = word;
    } else {
        currentText += word + " ";
    }
    
    document.getElementById("output").textContent = currentText.trim();
    
    speakSingleWord(word);
}

function speakSingleWord(word) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
        utterance.rate = isMobile ? 0.9 : 0.85;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        const pickPreferred = (voices) => voices.find(v =>
            (v.name && (v.name.includes('Samantha') || v.name.includes('Alex'))) ||
            v.lang === 'en-US'
        );

        const voices = speechSynthesis.getVoices();
        let preferredVoice = pickPreferred(voices);

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            speechSynthesis.speak(utterance);
        } else {
            setTimeout(() => {
                const voices2 = speechSynthesis.getVoices();
                const preferred2 = pickPreferred(voices2);
                if (preferred2) utterance.voice = preferred2;
                speechSynthesis.speak(utterance);
            }, 120);
        }
    }
}

function speakText() {
    const text = document.getElementById("output").textContent;
    
    if (text && text !== "Tap symbols to communicate") {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.85;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
            const voices = speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => 
                voice.name.includes('Samantha') || 
                voice.name.includes('Alex') ||
                voice.lang === 'en-US'
            );
            
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }
            
            speechSynthesis.speak(utterance);
        }
    }
}

function clearText() {
    currentText = "";
    document.getElementById("output").textContent = "Tap symbols to communicate";
}

function emergency() {
    currentText = "";
    const emergencyMsg = "HELP - I need assistance now!";
    document.getElementById("output").textContent = emergencyMsg;
    
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(emergencyMsg);
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        utterance.volume = 1.0;
        
        speechSynthesis.speak(utterance);
    }
}

function showCustomize() {
    currentCategory = "customize";
    document.getElementById('backBtn').style.display = 'block';
    
    const grid = document.getElementById('symbolGrid');
    grid.innerHTML = `
        <button class="symbol-btn customize-option" onclick="showAddCategoryForm()">
            <span class="symbol">📁</span>
            <span class="label">Add New Category</span>
        </button>
        <button class="symbol-btn customize-option" onclick="showAddSymbolForm()">
            <span class="symbol">➕</span>
            <span class="label">Add New Symbol</span>
        </button>
         <button class="symbol-btn customize-option" onclick="showAddPhraseForm()">
            <span class="symbol">⭐</span>
            <span class="label">Add Quick Phrase</span>
        </button>
        <button class="symbol-btn customize-option" onclick="showDeleteCategory()">
            <span class="symbol">🗑️</span>
            <span class="label">Delete Category</span>
        </button>
        <button class="symbol-btn customize-option" onclick="showDeleteSymbol()">
            <span class="symbol">❌</span>
            <span class="label">Delete Symbol</span>
        </button>
    `;
}

function showAddCategoryForm() {
    const grid = document.getElementById('symbolGrid');
    grid.innerHTML = `
        <div class="custom-form">
            <h2>Add New Category</h2>
            
            <label>Category Name:</label>
            <input type="text" id="newCategoryName" placeholder="e.g., Animals, Colors">
            
            <label>Category Image or Emoji:</label>
            <div class="image-upload-area">
                <input type="file" id="categoryImageUpload" accept="image/*" onchange="previewCategoryImage(event)" style="display: none;">
                <div id="categoryImagePreview" class="image-preview-box">
                    <span class="upload-placeholder">
                        📷 Tap to upload image
                    </span>
                </div>
                <button class="toggle-emoji-btn" onclick="toggleCategoryEmojiInput()">
                    Use Emoji Instead
                </button>
            </div>
            <div id="categoryEmojiInputArea" style="display: none; margin-top: 10px;">
                <input type="text" id="newCategoryEmoji" placeholder="e.g., 🐶, 🎨">
                <button class="toggle-emoji-btn" onclick="toggleCategoryEmojiInput()">
                    Use Image Instead
                </button>
            </div>
            
            <div class="form-buttons">
                <button class="action-btn speak-btn" onclick="saveNewCategory()">
                    ✅ Save Category
                </button>
                <button class="action-btn clear-btn" onclick="showCustomize()">
                    ❌ Cancel
                </button>
            </div>
        </div>
    `;
    
    setTimeout(() => document.getElementById('newCategoryName').focus(), 100);
    const previewEl = document.getElementById('categoryImagePreview');
    if (previewEl) previewEl.onclick = function() { document.getElementById('categoryImageUpload').click(); };
}

function showAddSymbolForm() {
    const grid = document.getElementById('symbolGrid');
    
    const categoryOptions = Object.keys(categories)
        .map(cat => {
            const label = categoryInfo[cat]?.label || 
                cat.charAt(0).toUpperCase() + cat.slice(1);
            return `<option value="${cat}">${label}</option>`;
        })
        .join('');
    
    grid.innerHTML = `
        <div class="custom-form">
            <h2>Add New Symbol</h2>
            
            <label>Select Category:</label>
            <select id="symbolCategory">
                ${categoryOptions}
            </select>
            
            <label>Word (what gets added to sentence):</label>
            <input type="text" id="symbolWord" placeholder="e.g., happy, water, mom">
            
            <label>Image or Emoji:</label>
            <div class="image-upload-area">
                <input type="file" id="symbolImageUpload" accept="image/*" onchange="previewImage(event)" style="display: none;">
                <div id="imagePreview" class="image-preview-box">
                    <span class="upload-placeholder">
                        📷 Tap to upload image
                    </span>
                </div>
                <button class="toggle-emoji-btn" onclick="toggleEmojiInput()">
                    Use Emoji Instead
                </button>
            </div>
            <div id="emojiInputArea" style="display: none;">
                <input type="text" id="symbolEmoji" placeholder="e.g., 😊, 💧, 👩">
                <button class="toggle-emoji-btn" onclick="toggleEmojiInput()">
                    Use Image Instead
                </button>
            </div>
            
            <div class="form-buttons">
                <button class="action-btn speak-btn" onclick="saveNewSymbol()">
                    ✅ Save Symbol
                </button>
                <button class="action-btn clear-btn" onclick="showCustomize()">
                    ❌ Cancel
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('imagePreview').onclick = function() {
        document.getElementById('symbolImageUpload').click();
    };
    
    setTimeout(() => document.getElementById('symbolWord').focus(), 100);
}

function saveNewCategory() {
    const name = document.getElementById('newCategoryName').value.trim().toLowerCase();
    const emojiInput = document.getElementById('newCategoryEmoji');
    const emoji = (typeof currentCategoryImage !== 'undefined' && currentCategoryImage) || (emojiInput ? emojiInput.value.trim() : '');
    
    if (!name) {
        alert('Please enter a category name!');
        return;
    }
    
    if (!emoji) {
        alert('Please upload an image or enter an emoji!');
        return;
    }
    
    if (categories[name]) {
        alert('This category already exists!');
        return;
    }
    
    categories[name] = [];
    categoryInfo[name] = { emoji: emoji, label: name.charAt(0).toUpperCase() + name.slice(1), isImage: !!currentCategoryImage };
    
    alert(`Category "${name}" created! Now add some symbols to it.`);
    
    saveCategories();
    currentCategoryImage = null;
    showCustomize();
}

function saveNewSymbol() {
    const category = document.getElementById('symbolCategory').value;
    const word = document.getElementById('symbolWord').value.trim().toLowerCase();
    const label = word.charAt(0).toUpperCase() + word.slice(1);
    
    const emojiInput = document.getElementById('symbolEmoji');
    const emoji = currentSymbolImage || (emojiInput ? emojiInput.value.trim() : '');
    
    if (!word) {
        alert('Please enter a word!');
        return;
    }
    
    if (!emoji) {
        alert('Please upload an image or enter an emoji!');
        return;
    }
    
    categories[category].push({
        word: word,
        emoji: emoji,
        label: label,
        isImage: !!currentSymbolImage
    });
    
    saveCategories();
    currentSymbolImage = null;
    alert(`"${label}" added to ${category}!`);
    showCustomize();
}

function showDeleteCategory() {
    const grid = document.getElementById('symbolGrid');
    grid.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-form';
    const title = document.createElement('h2');
    title.textContent = 'Delete Category';
    wrapper.appendChild(title);

    const protectedCategories = ['feelings', 'needs', 'words', 'actions', 'people', 'quickPhrases'];

    Object.keys(categories).forEach(categoryName => {
        const isProtected = protectedCategories.includes(categoryName);
        const label = categoryInfo[categoryName]?.label ||
            categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        const emoji = categoryInfo[categoryName]?.emoji || '📁';

        const row = document.createElement('div');
        row.className = 'delete-item';

        const info = document.createElement('span');
        info.className = 'delete-item-info';

        const titleSpan = document.createElement('span');

        if (categoryInfo[categoryName]?.isImage || (typeof emoji === 'string' && emoji.startsWith('data:'))) {
            const img = document.createElement('img');
            img.src = emoji;
            img.alt = label;
            img.style.maxWidth = '64px';
            img.style.maxHeight = '64px';
            img.style.borderRadius = '8px';
            img.style.marginRight = '8px';
            titleSpan.appendChild(img);
            titleSpan.appendChild(document.createTextNode(label));
        } else {
            titleSpan.textContent = `${emoji} ${label}`;
        }

        const countSpan = document.createElement('span');
        countSpan.className = 'delete-item-count';
        countSpan.textContent = `${categories[categoryName].length} symbols`;

        info.appendChild(titleSpan);
        info.appendChild(countSpan);

        const btn = document.createElement('button');
        btn.className = 'delete-btn';
        if (isProtected) {
            btn.disabled = true;
            btn.textContent = '🔒 Protected';
        } else {
            btn.textContent = '🗑️ Delete';
            btn.onclick = function() { confirmDeleteCategory(categoryName); };
        }

        row.appendChild(info);
        row.appendChild(btn);
        wrapper.appendChild(row);
    });

    const footer = document.createElement('div');
    footer.className = 'form-buttons';
    footer.style.marginTop = '20px';
    const backBtn = document.createElement('button');
    backBtn.className = 'action-btn clear-btn';
    backBtn.textContent = '← Back';
    backBtn.onclick = showCustomize;
    footer.appendChild(backBtn);

    wrapper.appendChild(footer);
    grid.appendChild(wrapper);
}

// Confirm and delete category
function confirmDeleteCategory(categoryName) {
    const label = categoryInfo[categoryName]?.label || categoryName;
    const items = categories[categoryName];

    if (!items) {
        console.warn('confirmDeleteCategory: category not found', categoryName);
        alert('Category not found.');
        showDeleteCategory();
        return;
    }

    const count = items.length;

    if (confirm(`Delete "${label}" and all ${count} symbols inside it?`)) {
        try {
            delete categories[categoryName];
            delete categoryInfo[categoryName];
            saveCategories();
            alert(`"${label}" deleted!`);
            showDeleteCategory();
        } catch (e) {
            console.error('Error deleting category', e);
            alert('Failed to delete category. See console for details.');
        }
    }
}

function showDeleteSymbol() {
    const grid = document.getElementById('symbolGrid');
    
    const categoryOptions = Object.keys(categories)
        .map(cat => {
            const label = categoryInfo[cat]?.label || 
                cat.charAt(0).toUpperCase() + cat.slice(1);
            return `<option value="${cat}">${label}</option>`;
        })
        .join('');
    
    grid.innerHTML = `
        <div class="custom-form">
            <h2>Delete Symbol</h2>
            
            <label>Select Category:</label>
            <select id="deleteSymbolCategory" onchange="updateDeleteSymbolList()">
                ${categoryOptions}
            </select>
            
            <div id="deleteSymbolList"></div>
            
            <div class="form-buttons" style="margin-top: 20px;">
                <button class="action-btn clear-btn" onclick="showCustomize()">
                    ← Back
                </button>
            </div>
        </div>
    `;
    
    updateDeleteSymbolList();
}

function updateDeleteSymbolList() {
    const category = document.getElementById('deleteSymbolCategory').value;
    const items = categories[category];
    const list = document.getElementById('deleteSymbolList');

    list.innerHTML = '';

    if (!items || items.length === 0) {
        list.innerHTML = '<p style="color: #999; text-align: center;">No symbols in this category</p>';
        return;
    }

    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'delete-item';

        const info = document.createElement('span');
        info.className = 'delete-item-info';

        const labelSpan = document.createElement('span');
        if (item.isImage) {
            const img = document.createElement('img');
            img.src = item.emoji;
            img.alt = item.label;
            img.style.maxWidth = '64px';
            img.style.maxHeight = '64px';
            img.style.borderRadius = '8px';
            img.style.marginRight = '8px';
            labelSpan.appendChild(img);
            labelSpan.appendChild(document.createTextNode(item.label));
        } else {
            labelSpan.textContent = `${item.emoji} ${item.label}`;
        }

        info.appendChild(labelSpan);

        const btn = document.createElement('button');
        btn.className = 'delete-btn';
        btn.textContent = '🗑️ Delete';
        btn.onclick = function() { confirmDeleteSymbol(category, index); };

        row.appendChild(info);
        row.appendChild(btn);
        list.appendChild(row);
    });
}

function confirmDeleteSymbol(category, index) {
    const item = categories[category][index];
    
    if (confirm(`Delete "${item.label}" from this category?`)) {
        categories[category].splice(index, 1);
        saveCategories();
        alert(`"${item.label}" deleted!`);
        updateDeleteSymbolList();
    }
}

function showAddPhraseForm() {
    const grid = document.getElementById('symbolGrid');
    grid.innerHTML = `
        <div class="custom-form">
            <h2>Add Quick Phrase</h2>
            
            <label>Phrase (full sentence):</label>
            <input type="text" id="phraseText" placeholder="e.g., I want to go home">
            
            <label>Label (short name for button):</label>
            <input type="text" id="phraseLabel" placeholder="e.g., Go Home">
            
            <label>Image or Emoji:</label>
            <div class="image-upload-area">
                <input type="file" id="phraseImageUpload" accept="image/*" onchange="previewPhraseImage(event)" style="display: none;">
                <div id="phraseImagePreview" class="image-preview-box">
                    <span class="upload-placeholder">
                        📷 Tap to upload image
                    </span>
                </div>
                <button class="toggle-emoji-btn" onclick="togglePhraseEmojiInput()">
                    Use Emoji Instead
                </button>
            </div>
            <div id="phraseEmojiInputArea" style="display: none;">
                <input type="text" id="phraseEmoji" placeholder="e.g., 🏠">
                <button class="toggle-emoji-btn" onclick="togglePhraseEmojiInput()">
                    Use Image Instead
                </button>
            </div>
            
            <div class="form-buttons">
                <button class="action-btn speak-btn" onclick="saveNewPhrase()">
                    ✅ Save Phrase
                </button>
                <button class="action-btn clear-btn" onclick="showCustomize()">
                    ❌ Cancel
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('phraseImagePreview').onclick = function() {
        document.getElementById('phraseImageUpload').click();
    };
    
    setTimeout(() => document.getElementById('phraseText').focus(), 100);
}

function saveNewPhrase() {
    const phrase = document.getElementById('phraseText').value.trim();
    const label = document.getElementById('phraseLabel').value.trim();
    
    const emojiInput = document.getElementById('phraseEmoji');
    const emoji = currentPhraseImage || (emojiInput ? emojiInput.value.trim() : '');
    
    if (!phrase) {
        alert('Please enter a phrase!');
        return;
    }
    
    if (!label) {
        alert('Please enter a label!');
        return;
    }
    
    if (!emoji) {
        alert('Please upload an image or enter an emoji!');
        return;
    }
    
    categories.quickPhrases.push({
        word: phrase,
        emoji: emoji,
        label: label,
        isImage: !!currentPhraseImage
    });
    
    saveCategories();
    currentPhraseImage = null;
    alert(`"${label}" added to Quick Phrases!`);
    showCustomize();
}

let currentSymbolImage = null;
let currentPhraseImage = null;
let currentCategoryImage = null;

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentSymbolImage = e.target.result;
            document.getElementById('imagePreview').innerHTML = `
                <img src="${currentSymbolImage}" alt="Preview">
            `;
        };
        reader.readAsDataURL(file);
    }
}

function previewPhraseImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentPhraseImage = e.target.result;
            document.getElementById('phraseImagePreview').innerHTML = `
                <img src="${currentPhraseImage}" alt="Preview">
            `;
        };
        reader.readAsDataURL(file);
    }
}

function previewCategoryImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentCategoryImage = e.target.result;
            const preview = document.getElementById('categoryImagePreview');
            if (preview) preview.innerHTML = `\n                <img src="${currentCategoryImage}" alt="Preview">\n            `;
        };
        reader.readAsDataURL(file);
    }
}

function toggleCategoryEmojiInput() {
    const emojiArea = document.getElementById('categoryEmojiInputArea');
    const imageArea = document.getElementById('categoryImagePreview')?.parentElement;
    const toggleBtn = imageArea ? imageArea.querySelector('.toggle-emoji-btn') : null;

    if (!emojiArea) return;

    if (emojiArea.style.display === 'none') {
        emojiArea.style.display = 'block';
        if (document.getElementById('categoryImagePreview')) document.getElementById('categoryImagePreview').style.display = 'none';
        if (document.getElementById('categoryImageUpload')) document.getElementById('categoryImageUpload').style.display = 'none';
        if (toggleBtn) toggleBtn.style.display = 'none';
        currentCategoryImage = null;
    } else {
        emojiArea.style.display = 'none';
        if (document.getElementById('categoryImagePreview')) document.getElementById('categoryImagePreview').style.display = 'block';
        if (document.getElementById('categoryImageUpload')) document.getElementById('categoryImageUpload').style.display = 'none';
        if (toggleBtn) toggleBtn.style.display = 'block';
    }
}

function toggleEmojiInput() {
    const emojiArea = document.getElementById('emojiInputArea');
    const imageArea = document.getElementById('imagePreview').parentElement;
    const toggleBtn = imageArea.querySelector('.toggle-emoji-btn');
    
    if (emojiArea.style.display === 'none') {
        emojiArea.style.display = 'block';
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('symbolImageUpload').style.display = 'none';
        toggleBtn.style.display = 'none';
        currentSymbolImage = null;
    } else {
        emojiArea.style.display = 'none';
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('symbolImageUpload').style.display = 'none';
        toggleBtn.style.display = 'block';
    }
}

function togglePhraseEmojiInput() {
    const emojiArea = document.getElementById('phraseEmojiInputArea');
    const imageArea = document.getElementById('phraseImagePreview').parentElement;
    const toggleBtn = imageArea.querySelector('.toggle-emoji-btn');
    
    if (emojiArea.style.display === 'none') {
        emojiArea.style.display = 'block';
        document.getElementById('phraseImagePreview').style.display = 'none';
        document.getElementById('phraseImageUpload').style.display = 'none';
        toggleBtn.style.display = 'none';
        currentPhraseImage = null;
    } else {
        emojiArea.style.display = 'none';
        document.getElementById('phraseImagePreview').style.display = 'block';
        document.getElementById('phraseImageUpload').style.display = 'none';
        toggleBtn.style.display = 'block';
    }
}

function showCategories() {
    currentCategory = 'categories';
    const back = document.getElementById('backBtn');
    if (back) back.style.display = 'none';

    const grid = document.getElementById('symbolGrid');
    grid.innerHTML = '';

    Object.keys(categoryInfo).forEach(cat => {
        const info = categoryInfo[cat];
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.onclick = () => showCategory(cat);

        if (info.isImage || (typeof info.emoji === 'string' && info.emoji.startsWith('data:'))) {
            btn.innerHTML = `
                <img src="${info.emoji}" class="symbol-image" alt="${info.label}" style="max-width:64px; max-height:64px; border-radius:8px;">
                <span class="label">${info.label}</span>
            `;
        } else {
            btn.innerHTML = `
                <span class="symbol">${info.emoji}</span>
                <span class="label">${info.label}</span>
            `;
        }

        grid.appendChild(btn);
    });

    const customize = document.createElement('button');
    customize.className = 'category-btn customize-btn';
    customize.onclick = showCustomize;
    customize.innerHTML = `
        <span class="symbol">⚙️</span>
        <span class="label">Customize</span>
    `;
    grid.appendChild(customize);
}

function saveCategories() {
    try {
        const data = { categories: categories, categoryInfo: categoryInfo };
        localStorage.setItem('touchtalk_data', JSON.stringify(data));
    } catch (e) {
        console.warn('saveCategories failed', e);
    }
}

function loadCategories() {
    try {
        const raw = localStorage.getItem('touchtalk_data');
        if (!raw) return;
        const data = JSON.parse(raw);
        if (data.categories) {
            Object.keys(data.categories).forEach(k => {
                categories[k] = data.categories[k];
            });
        }
        if (data.categoryInfo) {
            Object.keys(data.categoryInfo).forEach(k => {
                categoryInfo[k] = data.categoryInfo[k];
            });
        }
    } catch (e) {
        console.warn('loadCategories failed', e);
    }
}

window.onload = function() {
    loadCategories();
    showCategories();
};