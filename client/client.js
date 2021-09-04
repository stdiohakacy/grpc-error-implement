const calculators = require('../server/protos/calculator_pb');
const service = require('../server/protos/calculator_grpc_pb');
const grpc = require('@grpc/grpc-js');

function getRPCDeadline(rpcType) {
    let timeAllowed = 5000;
    switch (rpcType) {
        case 1:
            timeAllowed = 1000;
            break;
        case 2:
            requestAnimationFrame = 7000
        default:
            console.log(`Invalid  RPC Type : Using default timeout!`);
    }

    return new Date(Date.now() + timeAllowed);
}

async function errorCall() {
    const deadline = getRPCDeadline(1);

    console.log(`gRPC client`);
    const client = new service.CalculatorServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    const number = 1;
    const squareRootRequest = new calculators.SquareRootRequest();
    squareRootRequest.setNumber(number);
    client.squareRoot(squareRootRequest, { deadline }, (error, response) => {
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