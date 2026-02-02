// api/posts.js

const POSTS = [
    // ===== TRAVEL =====
    { id: 1, topic: "travel", platform: "youtube", embedId: "9oK6n1p5ZCI", title: "Tokyo Night Walk", author: "Japan Walk", bg: "#0b132b" },
    { id: 2, topic: "travel", platform: "youtube", embedId: "o6X4y1d3W4Q", title: "Paris in 60 Seconds", author: "JetLag Warriors", bg: "#1c2541" },
    { id: 3, topic: "travel", platform: "youtube", embedId: "U3pZ4Z1Rz9U", title: "New York Street Life", author: "Urban Rider", bg: "#3a506b" },
    { id: 4, topic: "travel", platform: "youtube", embedId: "cTt5JxY8n7Q", title: "Santorini Cliff Views", author: "Wanderlust", bg: "#5bc0be" },
    { id: 5, topic: "travel", platform: "youtube", embedId: "X2cYyZ0Qn6Q", title: "Swiss Alps Train Ride", author: "Scenic Rails", bg: "#6fffe9" },
    { id: 6, topic: "travel", platform: "youtube", embedId: "zJxkT3fU5P4", title: "Iceland Waterfalls", author: "Nordic Nature", bg: "#0b132b" },

    // ===== BOOKS =====
    { id: 7, topic: "books", platform: "youtube", embedId: "sJQJb6YxZK0", title: "Books That Changed My Life", author: "Better Ideas", bg: "#1b263b" },
    { id: 8, topic: "books", platform: "youtube", embedId: "GZrjGk1kH5A", title: "Read More in 2025", author: "Ali Abdaal", bg: "#415a77" },
    { id: 9, topic: "books", platform: "youtube", embedId: "2bQ9p3Zp8hM", title: "Atomic Habits Summary", author: "Productivity Game", bg: "#778da9" },
    { id: 10, topic: "books", platform: "youtube", embedId: "4ZfH7ZlN8yQ", title: "Philosophy Books Explained", author: "School of Life", bg: "#e0e1dd" },
    { id: 11, topic: "books", platform: "youtube", embedId: "Lxk0r7bWZc4", title: "Must Read Classics", author: "Bookish", bg: "#1b263b" },
    { id: 12, topic: "books", platform: "youtube", embedId: "XxR7hF1p3oM", title: "Why Reading Matters", author: "Veritasium", bg: "#415a77" },

    // ===== FITNESS =====
    { id: 13, topic: "fitness", platform: "youtube", embedId: "ml6cT4AZdqI", title: "Full Body Workout", author: "Athlean-X", bg: "#2b2d42" },
    { id: 14, topic: "fitness", platform: "youtube", embedId: "UItWltVZZmE", title: "10 Minute Abs", author: "Chloe Ting", bg: "#8d99ae" },
    { id: 15, topic: "fitness", platform: "youtube", embedId: "UBMk30rjy0o", title: "Pushup Form Fix", author: "Jeff Nippard", bg: "#edf2f4" },
    { id: 16, topic: "fitness", platform: "youtube", embedId: "qULTwquOuT4", title: "Beginner Gym Guide", author: "Jeremy Ethier", bg: "#2b2d42" },
    { id: 17, topic: "fitness", platform: "youtube", embedId: "pSHjTRCQxIw", title: "Home HIIT Workout", author: "MadFit", bg: "#8d99ae" },
    { id: 18, topic: "fitness", platform: "youtube", embedId: "IODxDxX7oi4", title: "Stretching Routine", author: "Yoga With Adriene", bg: "#edf2f4" },

    // ===== TECH =====
    { id: 19, topic: "tech", platform: "youtube", embedId: "X8aY0w8z7pM", title: "How the Internet Works", author: "Kurzgesagt", bg: "#0f172a" },
    { id: 20, topic: "tech", platform: "youtube", embedId: "yP7wBTnO1aA", title: "AI Explained Simply", author: "Fireship", bg: "#1e293b" },
    { id: 21, topic: "tech", platform: "youtube", embedId: "jZxy7c4mQhY", title: "What Is a Server?", author: "TechQuickie", bg: "#334155" },
    { id: 22, topic: "tech", platform: "youtube", embedId: "r7K5T8xqzjA", title: "Programming in 60s", author: "CS Dojo", bg: "#475569" },
    { id: 23, topic: "tech", platform: "youtube", embedId: "zOjov-2OZ0E", title: "How Databases Work", author: "Web Dev Simplified", bg: "#64748b" },
    { id: 24, topic: "tech", platform: "youtube", embedId: "PkZNo7MFNFg", title: "Learn JavaScript Fast", author: "freeCodeCamp", bg: "#0f172a" },

    // ===== FOOD =====
    { id: 25, topic: "food", platform: "youtube", embedId: "1IszT_guI08", title: "Street Food Tour", author: "Mark Wiens", bg: "#3f1d38" },
    { id: 26, topic: "food", platform: "youtube", embedId: "dJ4t6x7p8mM", title: "Perfect Steak", author: "Guga Foods", bg: "#5a189a" },
    { id: 27, topic: "food", platform: "youtube", embedId: "4aZr5hZXP_s", title: "Easy Pasta Recipe", author: "Joshua Weissman", bg: "#7b2cbf" },
    { id: 28, topic: "food", platform: "youtube", embedId: "h9dX0KzT7n8", title: "Budget Meals", author: "Binging With Babish", bg: "#9d4edd" },
    { id: 29, topic: "food", platform: "youtube", embedId: "YJg02ivYzSs", title: "World’s Best Pizza", author: "Munchies", bg: "#c77dff" },
    { id: 30, topic: "food", platform: "youtube", embedId: "a03U45jFxOI", title: "Quick Breakfast Ideas", author: "Tasty", bg: "#3f1d38" },

    // ===== EDUCATION =====
    { id: 31, topic: "education", platform: "youtube", embedId: "aircAruvnKk", title: "Neural Networks", author: "3Blue1Brown", bg: "#001219" },
    { id: 32, topic: "education", platform: "youtube", embedId: "yZ0oP6cF1yM", title: "Math in Real Life", author: "Numberphile", bg: "#005f73" },
    { id: 33, topic: "education", platform: "youtube", embedId: "w4s1u4zYkQk", title: "Physics Explained", author: "MinutePhysics", bg: "#0a9396" },
    { id: 34, topic: "education", platform: "youtube", embedId: "kBdfcR-8hEY", title: "How Memory Works", author: "TED-Ed", bg: "#94d2bd" },
    { id: 35, topic: "education", platform: "youtube", embedId: "ZxEHGAY7LbY", title: "Learning Faster", author: "Thomas Frank", bg: "#e9d8a6" },
    { id: 36, topic: "education", platform: "youtube", embedId: "fNk_zzaMoSs", title: "Critical Thinking", author: "CrashCourse", bg: "#001219" }
];

export default function handler(req, res) {
    const topic = req.query.topic || "travel";
    const limit = Number(req.query.limit) || 1;
    const offset = Number(req.query.offset) || 0;

    const filtered = POSTS.filter(p => p.topic === topic);
    const posts = filtered.slice(offset, offset + limit);

    res.status(200).json({
        posts,
        nextOffset: offset + posts.length < filtered.length ? offset + posts.length : 0
    });
}
