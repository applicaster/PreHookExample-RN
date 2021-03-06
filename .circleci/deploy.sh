#!/bin/bash

ci_branch=$1

function deploy_master {
  npm run stage-circle
  exit_if_push_failed
}

function deploy_production {
  npm run deploy-circle
  exit_if_push_failed
}

function skip_build {
  echo $ci_branch 
  echo 'is not a deployment branch. Skipping deployment to S3 step.'
}

function exit_if_push_failed {
  ERROR_CODE=$?
  if [ "$ERROR_CODE" != 0 ]
  then
    echo "push failed, exiting script"
    exit $ERROR_CODE
  fi
}

case $ci_branch in
"master")
  deploy_master 
  ;;
"anton")
  deploy_production
  ;;
*)
  skip_build
  ;;
esac