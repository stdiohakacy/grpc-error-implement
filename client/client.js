const calculators = require('../server/protos/calculator_pb');
const service = require('../server/protos/calculator_grpc_pb');
const grpc = require('@grpc/grpc-js');

async function errorCall() {
    console.log(`gRPC client`);
    const client = new service.CalculatorServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    const number = -1;
    const squareRootRequest = new calculators.SquareRootRequest();
    squareRootRequest.setNumber(number);
    client.squareRoot(squareRootRequest, (error, response) => {
        if(!error) {
            console.log(response.getNumberRoot());
        } else {
            console.error(error.message);
        }
    });
}

function main() {
    errorCall();
}

main()