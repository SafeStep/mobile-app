import Auth from "@aws-amplify/auth";
import {Lambda} from "aws-sdk";
import {
  create_journey_lambda as CREATE_JOURNEY_LAMBDA,
  aws_region as AWS_REGION,
} from "../configuration.json"; // this should be modified to use dependancy injection

export default class GetEcsLambda {
  public static async invoke(
    startPoint: number[],
    endPoint: number[],
    path: number[][],
  ) {
    const lambda = new Lambda({
      region: AWS_REGION,
      credentials: await Auth.currentUserCredentials(),
    });

    const authenticatedUserInfo = await Auth.currentUserInfo();

    const message = JSON.stringify({
      greenId: authenticatedUserInfo.attributes.sub,
      startPoint: startPoint,
      endPoint: endPoint,
      path: path,
    });

    const params: Lambda.Types.InvocationRequest = {
      FunctionName: CREATE_JOURNEY_LAMBDA,
      Payload: message,
    };

    return await lambda.invoke(params).promise();
  }
}
