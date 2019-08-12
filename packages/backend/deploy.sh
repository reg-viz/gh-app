#!/bin/bash

yarn run webpack -- --config webpack.config.prod.js
yarn run sls -- deploy
code=$?
if [ "$code" -gt 0 ]; then
  exit $code
fi
apiEndpoint=$(./node_modules/.bin/sls info | grep POST - | head -n 1 | cut -b 10- | sed "s/\/api.*//")
echo "export GH_APP_API_ENDPOINT=$apiEndpoint" > .endpoint
cat << JSON > ../reg-gh-app-interface/endpoint.json
{ "endpoint": "$apiEndpoint" }
JSON
