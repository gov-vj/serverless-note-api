import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(ev, context) {
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: ev.requestContext.identity.cognitoIdentityId,
            noteId: ev.pathParameters.id
        }
    };

    try {
        await dynamoDbLib.call('delete', params);
        return success({status: true});
    } catch (e) {
        console.log(e);
        return failure({status: false});
    }
}