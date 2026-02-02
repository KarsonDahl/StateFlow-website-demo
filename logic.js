let postCount = 0;
let offset = 0;

const params = new URLSearchParams(window.location.search);
const topic = params.get("topic") || "travel";

const feed = document.getElementById("feed");
const loadingIndicator = document.getElementById("loading");

const MAX_FEED_POSTS = 3;

/* ---------- SCROLL SNAP SETUP ---------- */
feed.style.scrollSnapType = "y mandatory";
feed.style.overflowY = "scroll";
feed.style.height = "100vh";

/* ---------- PRELOAD OBSERVER ---------- */
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;

            if (el.tagName === "IFRAME" && !el.src) {
                el.src = el.dataset.src;
            }

            observer.unobserve(el);
        });
    },
    {
        root: feed,
        rootMargin: "200px",
        threshold: 0.25
    }
);

function observeMedia(el) {
    observer.observe(el);
}

/* ---------- CREATE POST ---------- */
function createPost(postData) {
    postCount++;

    const post = document.createElement("div");
    post.className = "post";
    post.style.scrollSnapAlign = "start";
    post.style.height = "100vh";

    if (postData.platform === "youtube") {
        const iframe = document.createElement("iframe");
        iframe.dataset.src =
            `https://www.youtube.com/embed/${postData.embedId}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0`;
        iframe.loading = "lazy";
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.className = "video-frame";

        post.appendChild(iframe);
        observeMedia(iframe);
    }

    const caption = document.createElement("p");
    caption.textContent = postData.caption;
    caption.className = "caption";

    post.appendChild(caption);
    feed.appendChild(post);

    while (feed.children.length > MAX_FEED_POSTS) {
        feed.removeChild(feed.firstChild);
    }
}

/* ---------- FETCH POSTS ---------- */
async function fetchPosts(numberOfPosts) {
    if (loadingIndicator.style.display === "block") return;

    loadingIndicator.style.display = "block";

    const apiUrl = `/api/posts?topic=${topic}&limit=${numberOfPosts}&offset=${offset}`;

    try {
        const response = await fetch(apiUrl);
        const { posts, total } = await response.json();

        posts.forEach(createPost);
        offset += numberOfPosts;

        if (offset >= total) offset = 0;
    } catch (err) {
        console.error("Fetch error:", err);
    } finally {
        loadingIndicator.style.display = "none";
    }
}

/* ---------- INITIAL LOAD ---------- */
fetchPosts(2);

/* ---------- INFINITE SCROLL ---------- */
feed.addEventListener("scroll", () => {
    if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - 100) {
        fetchPosts(1);
    }
});
