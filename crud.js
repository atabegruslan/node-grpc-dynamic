const client = require("./client");

client.addNews(
    {
        title: "Title news 3",
        body: "Body content 3",
        postImage: "Image URL here",
    },
    (error, news) => {
        if (error) throw error;
        console.log("Successfully created a news.");
    }
);

// client.deleteNews(
//     {
//         id: 3,
//     },
//     (error, news) => {
//         if (error) throw error;
//         console.log("Successfully deleted a news item. Here's what's left: ");
//         console.log(news);
//     }
// );

client.getAllNews({}, (error, news) => {
    if (error) throw error;
    console.log(news);
});

// client.editNews(
//     {
//         id: 2,
//         body: "Body content 2 edited.",
//         postImage: "Image URL edited.",
//         title: "Title for 2 edited.",
//     },
//     (error, news) => {
//         if (error) throw error;
//         console.log("Successfully edited a news.");
//     }
// );

// client.getNews(
//     {
//         id: 2
//     },
//     (error, news) => {
//         if (!error) throw error;
//         console.log(news);
//     }
// );