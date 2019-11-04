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
        const result = await dynamoDbLib.call('get', params);
        if (result.Item) {
            return success(result.Item);
        }
        return failure({
            status: false,
            error: "Item not found."
        });
    } catch (e) {
        console.log(e);
        return failure({
            status: false
        });
    }
}