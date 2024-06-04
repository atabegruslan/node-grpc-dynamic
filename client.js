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

const client = new news_proto.NewsService(
        "127.0.0.1:50051", 
        grpc.credentials.createInsecure()
    );

module.exports = client;
