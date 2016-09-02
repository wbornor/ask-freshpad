#!/bin/bash -x -e

export GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`;

export ENV=$GIT_BRANCH;
export SKILL_NAME="freshpad";
export LAMBDA_NAME="askfreshpad";
export AWS_CLI_PROFILE="freshpad";
export CFN_JSON="cfn.json";
export CFN_PARAM_JSON="cfn-param-$ENV.json";
export STACK_NAME="freshpad-lambda-askfreshpad-$ENV";
export NOW=`date +%y%m%d%H%M%S`;

npm install

zip -r ./$SKILL_NAME.zip index.js LICENSE README.md package.json src node_modules config

aws s3 cp --profile $AWS_CLI_PROFILE \
./$SKILL_NAME.zip s3://$SKILL_NAME/artifacts/lambda/$LAMBDA_NAME/$ENV-$NOW.zip;

sed "s/{BuildId}/${NOW}/g" $CFN_PARAM_JSON > ./$CFN_PARAM_JSON.tmp

aws cloudformation validate-template --profile $AWS_CLI_PROFILE --template-body file://$CFN_JSON

aws cloudformation create-stack --profile $AWS_CLI_PROFILE \
--stack-name $STACK_NAME \
--template-body file://$CFN_JSON \
--parameters file://$CFN_PARAM_JSON.tmp \
--tags Key=app,Value=$SKILL_NAME Key=env,Value=$ENV \
--capabilities CAPABILITY_IAM \
|| \
aws cloudformation update-stack --profile $AWS_CLI_PROFILE \
--stack-name $STACK_NAME \
--template-body file://$CFN_JSON \
--parameters file://$CFN_PARAM_JSON.tmp \
--capabilities CAPABILITY_IAM

rm ./$CFN_PARAM_JSON.tmp