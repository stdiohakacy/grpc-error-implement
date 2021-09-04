const grpc = require('@grpc/grpc-js');
const calculators = require('../server/protos/calculator_pb');
const service = require('../server/protos/calculator_grpc_pb');

function squareRoot(call, callback) {
    const number = call.request.getNumber();
    if(number >= 0) {
        const numberRoot = Math.sqrt(number);
        const response = new calculators.SquareRootResponse();
        response.setNumberRoot(numberRoot);
        callback(null, response);
    } else {
        return callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: `The number being sent is not positive - number sent : ${number}`
        })
    }
}

function main() {
    const server = new grpc.Server();
    server.addService(service.CalculatorServiceService, { squareRoot })
    server.bindAsync('localhost:50051', 
    grpc.ServerCredentials.createInsecure(), 
    () => {
        console.log("Server start on localhost:50051");
        server.start();
    });
}

main();