#!/bin/bash

yarn run build:prod
yarn run sls -- deploy
code=$?
if [ "$code" -gt 0 ]; then
  exit $code
fi
apiEndpoint=$(./node_modules/.bin/sls info | grep POST - | head -n 1 | cut -b 10- | sed "s/\/api.*//")
cat << JSON > ../reg-gh-app-interface/endpoint.json
{ "endpoint": "$apiEndpoint" }
JSON
