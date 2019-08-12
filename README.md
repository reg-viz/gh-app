# reg-suit GitHub App
[![CircleCI](https://circleci.com/gh/reg-viz/gh-app.svg?style=svg)](https://circleci.com/gh/reg-viz/gh-app)
[![wercker status](https://app.wercker.com/status/f2602a9bce4e0c7ae7d13428598c4298/s/master "wercker status")](https://app.wercker.com/project/byKey/f2602a9bce4e0c7ae7d13428598c4298)

GitHub App for reg-suit.

- frontend: https://reg-viz.github.io/gh-app/

## CONTRIBUTING

### Setup for local development

Clone this repo and

```sh
$ yarn --pure-lockfile
$ yarn bootstrap
```

### Get .pem file
You need [private-key](https://developer.github.com/apps/building-github-apps/authenticating-with-github-apps/) for the App.

You have 2 options to get .pem file.

#### 1. Create App for development under your account

Go to https://github.com/settings/apps/new .
And create your GitHub app so download a .pem file via "Generate a private key" button.
When downloading successfully, copy the .pem file under this repository (.pem files are configured to be ignored via .gitignore).

The following figure is an example of GitHub App configurations:

![Image from Gyazo](https://i.gyazo.com/4ff1268304f2ca27e8e163c7fd7a3bbe.png)

#### 2. Contact reg-viz owner and request .pem file

If you're a member of [reg-viz](https://github.com/reg-viz), I'll generate .pem file. Please contact me.

When you accept .pem file, put it under this repository.

### Create .env file

```sh
$ cp .env.example .env
```

And edit `.env` file.

- `GH_APP_ID` : GitHub App id. You can get this value with your GitHub App setting page (eg: https://github.com/organizations/reg-viz/settings/apps/reg-suit-dev )
- `GH_APP_CLIENT_ID` : GitHub App client id. You can get this value with your GitHub App setting page (eg: https://github.com/organizations/reg-viz/settings/apps/reg-suit-dev )
- `GH_APP_CLIENT_SECRET` : GitHub App client secret. You can get this value with your GitHub App setting page (eg: https://github.com/organizations/reg-viz/settings/apps/reg-suit-dev )
- `GH_APP_PEM_ENCODED` : Executing `./tools/pem-zip.js <your-pem-file>` and paste the output.

### Run service

```sh
$ cd packages/reg-gh-app
$ yarn start
```

#### Test

The following cURL command comments to [this PR](https://github.com/reg-viz/gh-app/pull/2).

```sh
curl -X POST \
  http://localhost:3000/api/comment-to-pr \
  -H 'Content-Type: application/json' \
  -d '{
	"installationId": "1454831",
	"owner": "reg-viz",
	"repository": "gh-app",
	"branchName": "pr-comment-test",
	"failedItemsCount": 0,
	"newItemsCount": 0,
	"deletedItemsCount": 0,
	"passedItemsCount": 1
}'
```

### Run frontend

```sh
$ cd packages/reg-gh-app-front
$ yarn start
```

```sh
$ open http://localshot:4000
```

## LICENSE
MIT
