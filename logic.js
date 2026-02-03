const feed = document.getElementById("feed");
const loading = document.getElementById("loading");

let offset = 0;
let isLoading = false;

function getTopic() {
    const params = new URLSearchParams(window.location.search);
    return params.get("topic") || "travel";
}

let currentTopic = getTopic();

function setBackground(topic) {
    document.body.style.backgroundImage = `url('images/${topic}.jpg')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

setBackground(currentTopic);

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
    if (isLoading) return;
    isLoading = true;
    loading.style.display = "block";

    const res = await fetch(
        `/api/posts?topic=${currentTopic}&limit=1&offset=${offset}`
    );
    const data = await res.json();

    data.posts.forEach(createPost);
    offset = data.nextOffset;

    loading.style.display = "none";
    isLoading = false;
}

function createPost(post) {
    const section = document.createElement("div");
    section.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";
    header.textContent = post.title;

    const iframe = document.createElement("iframe");
    iframe.dataset.src =
        `https://www.youtube.com/embed/${post.embedId}?autoplay=1&mute=1&playsinline=1&controls=0`;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;

    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";
    wrapper.appendChild(iframe);

    section.appendChild(header);
    section.appendChild(wrapper);
    feed.appendChild(section);

    observer.observe(section);
}

feed.addEventListener("scroll", () => {
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 150) {
        fetchPosts();
    }
});

fetchPosts();
