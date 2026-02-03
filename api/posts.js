// api/posts.js

const POSTS = {
    travel: [
        { id: 1, embedId: "DQYc93f7FJw", title: "Traveling in Italy" },
        { id: 2, embedId: "VLpo8wz2vAU", title: "Paris in 30 Seconds" },
        { id: 3, embedId: "Vann80C6tCU", title: "Iceland Waterfalls" },
        { id: 4, embedId: "H7gMAklJB1Q", title: "Swiss Alps Train Ride" },
        { id: 5, embedId: "KaRI932cQa4", title: "New York Street Life" },
        { id: 6, embedId: "7J5_5Qz7sJk", title: "Santorini Views" }
    ],

    books: [
        { id: 7, embedId: "D2wJYp3Y5KQ", title: "Books That Changed My Life" },
        { id: 8, embedId: "Zp6FfO7ZrZ0", title: "Read More This Year" },
        { id: 9, embedId: "GkZ9m8nqT7A", title: "Philosophy Explained Simply" },
        { id: 10, embedId: "JxE4XQ2pZkY", title: "Must Read Classics" },
        { id: 11, embedId: "Kp5mYQzZP4E", title: "Why Reading Still Matters" },
        { id: 12, embedId: "r5U0Yp2M5k8", title: "Atomic Habits Insight" }
    ],

    cars: [
        { id: 13, embedId: "8UVNT4wvIGY", title: "Supercars in Slow Motion" },
        { id: 14, embedId: "KQ6zr6kCPj8", title: "How Engines Work" },
        { id: 15, embedId: "fLexgOxsZu0", title: "Electric vs Gas Cars" },
        { id: 16, embedId: "CevxZvSJLk8", title: "Car Design Evolution" },
        { id: 17, embedId: "Zi_XLOBDo_Y", title: "Racing Psychology" },
        { id: 18, embedId: "uelHwf8o7_U", title: "Classic Car Restorations" }
    ],

    technology: [
        { id: 19, embedId: "kZ9P7LQFJXk", title: "AI Explained Fast" },
        { id: 20, embedId: "Z7Qp9kFJkLk", title: "How the Internet Works" },
        { id: 21, embedId: "FZkL9P7JQXk", title: "What Is a Server?" },
        { id: 22, embedId: "QZP9kF7LJXk", title: "JavaScript in 30s" },
        { id: 23, embedId: "ZkF9Q7PJXLk", title: "Databases Explained" },
        { id: 24, embedId: "P7kFZQ9LJXk", title: "Programming Tip" }
    ],

    videoGames: [
        { id: 25, embedId: "V-_O7nl0Ii0", title: "Why Games Are Art" },
        { id: 26, embedId: "1k8craCGpgs", title: "Best Indie Games" },
        { id: 27, embedId: "J---aiyznGQ", title: "Speedrunning Explained" },
        { id: 28, embedId: "9bZkp7q19f0", title: "Retro Gaming Nostalgia" },
        { id: 29, embedId: "OPf0YbXqDm0", title: "Game Design Secrets" },
        { id: 30, embedId: "RgKAFK5djSk", title: "Multiplayer Psychology" }
    ],

    art: [
        { id: 31, embedId: "60ItHLz5WEA", title: "Modern Art Explained" },
        { id: 32, embedId: "hT_nvWreIhg", title: "Digital Art Process" },
        { id: 33, embedId: "uelHwf8o7_U", title: "Color Theory Basics" },
        { id: 34, embedId: "ktvTqknDobU", title: "Street Art Culture" },
        { id: 35, embedId: "lp-EO5I60KA", title: "Daily Sketching Habit" },
        { id: 36, embedId: "09R8_2nJtjg", title: "Creative Burnout" }
    ]
};

export default function handler(req, res) {
    const topic = req.query.topic || "travel";
    const limit = Number(req.query.limit) || 1;
    const offset = Number(req.query.offset) || 0;

    const list = POSTS[topic] || [];
    const slice = list.slice(offset, offset + limit);

    res.status(200).json({
        posts: slice,
        total: list.length,
        nextOffset: offset + slice.length >= list.length ? 0 : offset + slice.length
    });
}
