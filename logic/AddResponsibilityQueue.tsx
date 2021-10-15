import Auth from "@aws-amplify/auth";
import {config, Lambda, SQS, CognitoIdentityCredentials} from "aws-sdk";
import {
  add_responsibility_url as ADD_RESPONSIBILITY_URL,
  aws_region as AWS_REGION,
} from "../configuration.json"; // this should be modified to use dependancy injection

export default class AddResponsibilityQueue {
  public static async add(email: string, ecName: string) {
    try {
      const authenticatedUserInfo = await Auth.currentUserInfo();
      config.credentials = await Auth.currentUserCredentials();

      config.update({
        region: AWS_REGION,
      });

      const sqs = new SQS();

      const message = {
        f_name: ecName,
        email: email,
        greenId: authenticatedUserInfo.attributes.sub,
      };

      const params: SQS.Types.SendMessageRequest = {
        QueueUrl: ADD_RESPONSIBILITY_URL,
        MessageBody: JSON.stringify(message),
      };

      const result = await sqs.sendMessage(params).promise()

      console.log(result);  // output the result to the console
    } catch (e) {
      console.error(e);
      console.log("failed to add responsibility");
    }
  }
}
