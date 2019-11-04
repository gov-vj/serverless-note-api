import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(ev, context) {
    const data = JSON.parse(ev.body);
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: ev.requestContext.identity.cognitoIdentityId,
            noteId: ev.pathParameters.id
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":content": data.content,
            ":attachment": data.attachment,
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        await dynamoDbLib.call('update', params);
        return success({status: true});
    } catch (e) {
        console.log(e);
        return failure({status: false});
    }
}