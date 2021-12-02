import Auth from "@aws-amplify/auth";
import {config, Lambda} from "aws-sdk";
import {
  get_ec_lambda_name as GET_EC_LAMBDA_NAME,
  aws_region as AWS_REGION,
} from "../configuration.json"; // this should be modified to use dependancy injection

export default class GetEcsLambda {
  public static async invoke() {
    try {
      const authenticatedUserInfo = await Auth.currentUserInfo();

      const lambda = new Lambda({
        region: AWS_REGION,
        credentials: await Auth.currentUserCredentials(),
      });

      const message = JSON.stringify({
        greenID: authenticatedUserInfo.attributes.sub,
      });

      const params: Lambda.Types.InvocationRequest = {
        FunctionName: GET_EC_LAMBDA_NAME,
        Payload: message,
      };

      const result = await lambda.invoke(params).promise();

      return result;
    } catch (e) {
      console.error(e);
      console.log("failed to load ecs");
    }
  }
}
