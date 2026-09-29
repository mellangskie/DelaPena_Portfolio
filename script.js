const portfolioFiles = {
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
        }
    ],

    laboratory: [
        {
            name: "Laboratory Activity 1",
            file: "files/laboratory/lab1.jpg"
        },
        {
            name: "Laboratory Activity 2",
            file: "files/laboratory/lab2.pdf"
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
    const section = document.getElementById("files-section");
    const container = document.getElementById("files-container");
    const title = document.getElementById("files-title");

    const titles = {
        quizzes: "Quizzes",
        examinations: "Examinations",
        laboratory: "Laboratory Activities",
        projects: "Projects"
    };

    title.textContent = titles[category];
    container.innerHTML = "";

    const categoryFiles = portfolioFiles[category];

    if (!categoryFiles || categoryFiles.length === 0) {
        container.innerHTML = `
            <div class="empty">
                No files uploaded yet.
            </div>
        `;
    } else {
        categoryFiles.forEach(item => {
            const extension = item.file.split(".").pop().toLowerCase();

            const imageExtensions = [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "webp"
            ];

            let preview;

            if (imageExtensions.includes(extension)) {
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

            container.innerHTML += `
                <div class="file-card">

                    ${preview}

                    <div class="file-details">

                        <h3>${item.name}</h3>

                        <div class="file-buttons">

                            <a
                                href="${item.file}"
                                target="_blank"
                                class="file-button view-button">
                                View
                            </a>

                            <a
                                href="${item.file}"
                                download
                                class="file-button download-button">
                                Download
                            </a>

                        </div>

                    </div>

                </div>
            `;
        });
    }

    section.style.display = "block";

    section.scrollIntoView({
        behavior: "smooth"
    });
}

function closeFiles() {
    document.getElementById("files-section").style.display = "none";
}

