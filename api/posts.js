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
        { id: 7, embedId: "VMjhvmV599g", title: "Books That Changed My Life" },
        { id: 8, embedId: "xdfu5uqJYEE", title: "Read More This Year" },
        { id: 9, embedId: "kjLdLtI3NG0", title: "Philosophy Explained Simply" },
        { id: 10, embedId: "GutWwsiBIIc", title: "Must Read Classics" },
        { id: 11, embedId: "v2YTJBKLLY0", title: "Why Reading Still Matters" },
        { id: 12, embedId: "ZOWeLxkO3v8", title: "Atomic Habits Insight" }
    ],

    cars: [
        { id: 13, embedId: "Rhzt4jI9c2Q", title: "Supercars in Slow Motion" },
        { id: 14, embedId: "KggpS5Yf_Jw", title: "How Engines Work" },
        { id: 15, embedId: "70QvA0zqBvE", title: "Electric vs Gas Cars" },
        { id: 16, embedId: "KbcgkC8vkZM", title: "Car Design Evolution" },
        { id: 17, embedId: "Cn3lXAdxNTs", title: "Racing Psychology" },
        { id: 18, embedId: "Bf32bVR0wfo", title: "Classic Car Restorations" }
    ],

    technology: [
        { id: 19, embedId: "MYWpaNYAo0o", title: "AI Explained Fast" },
        { id: 20, embedId: "_yr-VNLW9nU", title: "How the Internet Works" },
        { id: 21, embedId: "mCvSvGjiGeY", title: "What Is a Server?" },
        { id: 22, embedId: "b6A3h1zknrI", title: "JavaScript in 30s" },
        { id: 23, embedId: "crZalY8oxyw", title: "Databases Explained" },
        { id: 24, embedId: "srNZ9WFsGSY", title: "Programming Tip" }
    ],

    videoGames: [
        { id: 25, embedId: "V-_O7nl0Ii0", title: "Why Games Are Art" },
        { id: 26, embedId: "76hrCIA6T6U", title: "Best Indie Games" },
        { id: 27, embedId: "llaJXy18T2A", title: "Speedrunning Explained" },
        { id: 28, embedId: "1Pp6yfJmKFg", title: "Retro Gaming Nostalgia" },
        { id: 29, embedId: "utIYw4ORPgE", title: "Game Design Secrets" },
        { id: 30, embedId: "4U_sMeiJh-E", title: "Multiplayer Psychology" }
    ],

    art: [
        { id: 31, embedId: "JTfIWhc6lyY", title: "Surrealism Explained" },
        { id: 32, embedId: "D29i7PZ8uO0", title: "Digital Art Process" },
        { id: 33, embedId: "lmY8xCzNt8M", title: "Color Theory Basics" },
        { id: 34, embedId: "lcNXyaB7aVw", title: "Street Art Culture" },
        { id: 35, embedId: "Q3Pp_fjbDO8", title: "Daily Sketching Habit" },
        { id: 36, embedId: "SN5RcvRzXgc", title: "Mr. Doodle" }
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
