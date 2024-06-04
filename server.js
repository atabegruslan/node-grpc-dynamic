const PROTO_PATH = __dirname + '/news.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
        PROTO_PATH,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        }
    );
const news_proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const news = {
        news: [
            { id: 1, title: "Note 1", body: "Content 1", postImage: "Post image 1" },
            { id: 2, title: "Note 2", body: "Content 2", postImage: "Post image 2" },
            { id: 3, title: "Note 3", body: "Content 3", postImage: "Post image 3" },
        ]
    };
function getAllNews(_, callback) {
    callback(null, news);
}
function getNews(call, callback) {
    const newsId = call.request.id;
    const newsItem = news.news.find(({ id }) => newsId == id);
    callback(null, newsItem);
}
function addNews(call, callback) {
    const _news = { id: Date.now(), ...call.request };
    news.news.push(_news);
    callback(null, _news);
}
function editNews(call, callback) {
    const newsId = call.request.id;
    const newsItem = news.news.find(({ id }) => newsId == id);
    newsItem.body = _.request.body;
    newsItem.postImage = _.request.postImage;
    newsItem.title = _.request.title;
    callback(null, newsItem);
}
function deleteNews(call, callback) {
    let newsId = call.request.id;
    news = news.news.filter(({ id }) => id !== newsId);
    callback(null, news);
}

server.addService(news_proto.NewsService.service, { getAllNews: getAllNews, getNews: getNews, addNews: addNews, editNews: editNews, deleteNews: deleteNews });

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        if (error != null) {
            return console.error(error);
        }
        console.log(`Server running at http://127.0.0.1:${port}`);
    }
);
