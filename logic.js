// logic.js

const feed = document.getElementById("feed");

let offset = 0;
let loading = false;
const LIMIT = 1;

feed.style.scrollSnapType = "y mandatory";

function getTopic() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("topic") || location.hash.replace("#", "") || "travel";
}

let currentTopic = getTopic();

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const iframe = entry.target.querySelector("iframe");
            if (iframe && !iframe.src) {
                iframe.src = iframe.dataset.src;
            }

            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.7 }
);

async function fetchPosts() {
    if (loading) return;
    loading = true;

    const res = await fetch(
        `/api/posts?topic=${currentTopic}&limit=${LIMIT}&offset=${offset}`
    );
    const data = await res.json();

    data.posts.forEach(createPost);

    offset = data.nextOffset;
    loading = false;
}

function createPost(post) {
    const section = document.createElement("section");
    section.className = "post";
    section.style.background = post.bg;
    section.style.scrollSnapAlign = "start";

    const header = document.createElement("div");
    header.className = "post-header";
    header.innerHTML = `
    <h2>${post.title}</h2>
    <span>@${post.author}</span>
  `;

    const iframe = document.createElement("iframe");
    iframe.dataset.src =
        `https://www.youtube.com/embed/${post.embedId}?autoplay=1&mute=1&playsinline=1&controls=0&loop=1`;
    iframe.allow =
        "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;

    const video = document.createElement("div");
    video.className = "video-wrapper";
    video.appendChild(iframe);

    section.appendChild(header);
    section.appendChild(video);
    feed.appendChild(section);

    observer.observe(section);
}

feed.addEventListener("scroll", () => {
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 200) {
        fetchPosts();
    }
});

window.addEventListener("hashchange", () => {
    currentTopic = getTopic();
    offset = 0;
    feed.innerHTML = "";
    fetchPosts();
});

fetchPosts();
