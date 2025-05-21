let data = [];
let cv;
let currentIndex = 0;

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('data.json');
        data = await res.json();
        cv = cvIterator(data);
        nextCV();
    } catch (error) {
        console.error("Failed to load data:", error);
    }
});

function cvIterator(profiles) {
    let nextIndex = 0;
    return {
        next: function () {
            return nextIndex < profiles.length ?
                { value: profiles[nextIndex++], done: false } :
                { done: true }
        }
    };
}

document.getElementById('next').addEventListener('click', nextCV);

function nextCV() {
    let currentProfile = cv.next().value;
    let image = document.getElementById('image');
    let profile = document.getElementById('profile');
    let message = document.getElementById('mssg');
    let progressBar = document.getElementById('progressBar');

    if (currentProfile === undefined) {
        message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>No more profiles! You'll be redirected to the home page.</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        setTimeout(() => {
            message.innerHTML = '';
            window.location.reload();
        }, 1500);
        return;
    }

    image.innerHTML = `<img src="${currentProfile.image}" alt="Profile Image" class="img-fluid rounded-circle rounded-img">`;
    profile.innerHTML = `
        <ul class="list-group">
            <li class="list-group-item"><strong>Name:</strong> ${currentProfile.name}</li>
            <li class="list-group-item"><strong>Age:</strong> ${currentProfile.age}</li>
            <li class="list-group-item"><strong>Email:</strong> ${currentProfile.email}</li>
            <li class="list-group-item"><strong>Language:</strong> ${currentProfile.language}</li>
            <li class="list-group-item"><strong>Framework:</strong> ${currentProfile.framework}</li>
            <li class="list-group-item"><strong>Experience:</strong> ${currentProfile.experience} years</li>
            <li class="list-group-item"><strong>CPI:</strong> ${currentProfile.cpi}</li>
        </ul>
    `;

    // Update progress bar
    const progress = Math.round((++currentIndex / data.length) * 100);
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${progress}%`;
}
