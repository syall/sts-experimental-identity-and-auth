import {
  STSClient,
  GetCallerIdentityCommand,
} from "@aws-sdk/client-sts";

(async () => {
  // Assumes credentials are available through the default credential chain
  const client = new STSClient({
    region: "us-east-1",
  });
  client.middlewareStack.identifyOnResolve(true);
  client.middlewareStack.addRelativeTo((next, context) => args => {
    console.log({ context });
    console.log({ request: args.request });
    return next(args);
  }, {
    name: "CUSTOM CONTEXT IDENTIFIER",
    toMiddleware: "httpSigningMiddleware",
    relation: "after",
  });
  const command = new GetCallerIdentityCommand({});
  console.log({
    response: await client.send(command),
  });
})();
