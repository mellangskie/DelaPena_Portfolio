const files = {
    quizzes: [
        {
            name: "Quiz 1",
            file: "files/quizzes/quiz1.pdf"
        },
        {
            name: "Quiz 2",
            file: "files/quizzes/quiz2.jpg"
        }
    ],

    examinations: [
        {
            name: "Examination 1",
            file: "files/examinations/exam1.pdf"
        },
        {
            name: "Examination 2",
            file: "files/examinations/exam2.jpg"
        }
    ],

    laboratory: [
        {
            name: "Laboratory Activity 1",
            file: "files/laboratory/lab1.jpg"
        },
        {
            name: "Laboratory Report",
            file: "files/laboratory/labreport.pdf"
        }
    ],

    projects: [
        {
            name: "Project 1",
            file: "files/projects/project1.jpg"
        },
        {
            name: "Project Documentation",
            file: "files/projects/project2.pdf"
        }
    ]
};

function showFiles(category) {
    const section = document.getElementById("file-section");
    const list = document.getElementById("file-list");
    const title = document.getElementById("file-title");

    const titles = {
        quizzes: "Quizzes",
        examinations: "Examinations",
        laboratory: "Laboratory Activities",
        projects: "Projects"
    };

    title.textContent = titles[category];
    list.innerHTML = "";

    if (files[category].length === 0) {
        list.innerHTML = '<div class="empty">No files uploaded yet.</div>';
    } else {
        files[category].forEach(item => {
            const extension = item.file.split(".").pop().toLowerCase();
            const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];

            let preview = "";

            if (imageTypes.includes(extension)) {
                preview = `
                    <div class="file-preview">
                        <img src="${item.file}" alt="${item.name}">
                    </div>
                `;
            } else {
                preview = `
                    <div class="file-preview">
                        <div class="file-icon">📄</div>
                    </div>
                `;
            }

            list.innerHTML += `
                <div class="file-card">
                    ${preview}
                    <div class="file-info">
                        <h3>${item.name}</h3>
                        <a class="download-button" href="${item.file}" target="_blank" download>View / Download</a>
                    </div>
                </div>
            `;
        });
    }

    section.style.display = "block";
    section.scrollIntoView({ behavior: "smooth" });
}

function closeFiles() {
    document.getElementById("file-section").style.display = "none";
}
