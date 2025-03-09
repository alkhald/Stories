document.addEventListener('DOMContentLoaded', function () {
    const storyList = document.getElementById('story-list');
    const addStoryForm = document.getElementById('add-story-form');

    // تحميل القصص من LocalStorage
    function loadStories() {
        const stories = JSON.parse(localStorage.getItem('stories')) || [];
        storyList.innerHTML = ''; // مسح القصص الحالية

        stories.forEach((story, index) => {
            const storyCard = document.createElement('div');
            storyCard.classList.add('col-md-6', 'col-lg-4', 'mb-4');

            storyCard.innerHTML = `
                <div class="card story-card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${story.title}</h5>
                        <p class="card-text"><strong>الكاتب:</strong> ${story.author}</p>
                        <p class="card-text">${story.content}</p>
                        <button onclick="deleteStory(${index})" class="btn btn-danger">حذف</button>
                    </div>
                </div>
            `;

            storyList.appendChild(storyCard);
        });
    }

    // إضافة قصة جديدة
    addStoryForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('story-title').value;
        const author = document.getElementById('story-author').value;
        const content = document.getElementById('story-content').value;

        const newStory = { title, author, content };

        // حفظ القصة في LocalStorage
        const stories = JSON.parse(localStorage.getItem('stories')) || [];
        stories.push(newStory);
        localStorage.setItem('stories', JSON.stringify(stories));

        // إعادة تحميل القصص
        loadStories();

        // مسح النموذج
        addStoryForm.reset();
    });

    // حذف قصة
    window.deleteStory = function (index) {
        const stories = JSON.parse(localStorage.getItem('stories')) || [];
        stories.splice(index, 1); // حذف القصة من المصفوفة
        localStorage.setItem('stories', JSON.stringify(stories));
        loadStories(); // إعادة تحميل القصص
    };

    // تحميل القصص عند فتح الصفحة
    loadStories();
});
