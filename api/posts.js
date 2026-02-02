// api/posts.js
// Vercel Serverless Function

const POSTS = [
    // ----- TRAVEL -----
    { id: 1, topic: "travel", platform: "youtube", embedId: "dQw4w9WgXcQ", caption: "Tokyo nightlife vibes" },
    { id: 2, topic: "travel", platform: "youtube", embedId: "3tmd-ClpJxA", caption: "Street food in Bangkok" },
    { id: 3, topic: "travel", platform: "youtube", embedId: "kxopViU98Xo", caption: "Santorini sunset views" },
    { id: 4, topic: "travel", platform: "youtube", embedId: "ScMzIvxBSi4", caption: "Backpacking Europe" },
    { id: 5, topic: "travel", platform: "youtube", embedId: "9No-FiEInLA", caption: "Hidden beaches in Bali" },
    { id: 6, topic: "travel", platform: "youtube", embedId: "aqz-KE-bpKQ", caption: "New York in 60 seconds" },

    // ----- BOOKS -----
    { id: 7, topic: "books", platform: "youtube", embedId: "s7W5h0ZkJOk", caption: "Books that changed my life" },
    { id: 8, topic: "books", platform: "youtube", embedId: "E7wJTI-1dvQ", caption: "Must-read classics" },
    { id: 9, topic: "books", platform: "youtube", embedId: "mP0RAo9SKZk", caption: "Best sci-fi novels" },
    { id: 10, topic: "books", platform: "youtube", embedId: "tgbNymZ7vqY", caption: "Daily reading habits" },
    { id: 11, topic: "books", platform: "youtube", embedId: "oHg5SJYRHA0", caption: "Underrated authors" },
    { id: 12, topic: "books", platform: "youtube", embedId: "ysz5S6PUM-U", caption: "Why reading still matters" },

    // ----- TECHNOLOGY -----
    { id: 13, topic: "technology", platform: "youtube", embedId: "rUWxSEwctFU", caption: "AI explained simply" },
    { id: 14, topic: "technology", platform: "youtube", embedId: "2ePf9rue1Ao", caption: "Future of programming" },
    { id: 15, topic: "technology", platform: "youtube", embedId: "kXYiU_JCYtU", caption: "Inside modern CPUs" },
    { id: 16, topic: "technology", platform: "youtube", embedId: "hY7m5jjJ9mM", caption: "How the internet works" },
    { id: 17, topic: "technology", platform: "youtube", embedId: "L_jWHffIx5E", caption: "Cybersecurity basics" },
    { id: 18, topic: "technology", platform: "youtube", embedId: "6_b7RDuLwcI", caption: "Tech myths debunked" },

    // ----- VIDEOGAMES -----
    { id: 19, topic: "videoGames", platform: "youtube", embedId: "V-_O7nl0Ii0", caption: "Why games are art" },
    { id: 20, topic: "videoGames", platform: "youtube", embedId: "1k8craCGpgs", caption: "Top indie games" },
    { id: 21, topic: "videoGames", platform: "youtube", embedId: "J---aiyznGQ", caption: "Speedrunning explained" },
    { id: 22, topic: "videoGames", platform: "youtube", embedId: "9bZkp7q19f0", caption: "Retro gaming nostalgia" },
    { id: 23, topic: "videoGames", platform: "youtube", embedId: "RgKAFK5djSk", caption: "Multiplayer psychology" },
    { id: 24, topic: "videoGames", platform: "youtube", embedId: "OPf0YbXqDm0", caption: "Game design secrets" },

    // ----- ART -----
    { id: 25, topic: "art", platform: "youtube", embedId: "60ItHLz5WEA", caption: "Modern art explained" },
    { id: 26, topic: "art", platform: "youtube", embedId: "hT_nvWreIhg", caption: "Digital art process" },
    { id: 27, topic: "art", platform: "youtube", embedId: "uelHwf8o7_U", caption: "Color theory basics" },
    { id: 28, topic: "art", platform: "youtube", embedId: "ktvTqknDobU", caption: "Street art culture" },
    { id: 29, topic: "art", platform: "youtube", embedId: "lp-EO5I60KA", caption: "Sketching daily" },
    { id: 30, topic: "art", platform: "youtube", embedId: "09R8_2nJtjg", caption: "Creative burnout" },

    // ----- CARS -----
    { id: 31, topic: "cars", platform: "youtube", embedId: "8UVNT4wvIGY", caption: "Supercars in slow-mo" },
    { id: 32, topic: "cars", platform: "youtube", embedId: "KQ6zr6kCPj8", caption: "How engines work" },
    { id: 33, topic: "cars", platform: "youtube", embedId: "fLexgOxsZu0", caption: "Electric vs gas cars" },
    { id: 34, topic: "cars", platform: "youtube", embedId: "uelHwf8o7_U", caption: "Classic restorations" },
    { id: 35, topic: "cars", platform: "youtube", embedId: "CevxZvSJLk8", caption: "Car design evolution" },
    { id: 36, topic: "cars", platform: "youtube", embedId: "Zi_XLOBDo_Y", caption: "Racing psychology" },
];

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const topic = req.query.topic || "travel";
    const limit = Math.max(1, Number(req.query.limit) || 1);
    const offset = Math.max(0, Number(req.query.offset) || 0);

    const filtered = POSTS.filter(p => p.topic === topic);
    const page = filtered.slice(offset, offset + limit);

    await new Promise(r => setTimeout(r, 300));

    res.status(200).json({
        posts: page,
        total: filtered.length
    });
}
