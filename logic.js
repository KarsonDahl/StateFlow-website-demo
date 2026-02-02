// logic.js

const feed = document.getElementById("feed");

let offset = 0;
let loading = false;
const LIMIT = 1;
const TOPIC = "travel";

feed.style.scrollSnapType = "y mandatory";

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
    { threshold: 0.6 }
);

async function fetchPosts() {
    if (loading) return;
    loading = true;

    const res = await fetch(`/api/posts?topic=${TOPIC}&limit=${LIMIT}&offset=${offset}`);
    const data = await res.json();

    data.posts.forEach(createPost);

    offset = data.nextOffset;
    loading = false;
}

function createPost(post) {
    const container = document.createElement("section");
    container.className = "post";
    container.style.background = post.bg;
    container.style.scrollSnapAlign = "start";

    const header = document.createElement("div");
    header.className = "post-header";
    header.innerHTML = `
    <h2>${post.title}</h2>
    <span>@${post.author}</span>
  `;

    const iframe = document.createElement("iframe");
    iframe.dataset.src =
        `https://www.youtube.com/embed/${post.embedId}?autoplay=1&mute=1&playsinline=1&controls=0`;
    iframe.allow =
        "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;

    const videoWrapper = document.createElement("div");
    videoWrapper.className = "video-wrapper";
    videoWrapper.appendChild(iframe);

    container.appendChild(header);
    container.appendChild(videoWrapper);
    feed.appendChild(container);

    observer.observe(container);
}

feed.addEventListener("scroll", () => {
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 200) {
        fetchPosts();
    }
});

fetchPosts();
