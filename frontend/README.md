# Running the frontend application using the dev server

```bash
$ npm install
$ HTTPS=true npm start
```

(See: [https://facebook.github.io/create-react-app/docs/using-https-in-development](https://facebook.github.io/create-react-app/docs/using-https-in-development))

# Deployment

```bash
$ npm run build
$ rsync -avz --progress build/ itaweb@ita.calit2.net:htdocs/workshop/
```

**Thanh's note:** If these commands above do not work, please follow these steps:

On your local machine, run:

```
npm run build
rsync -avz --delete -e "ssh -i <path-to-your-frontend.pem> build/ ubuntu@3.128.57.152:/var/www/itaweb-react/workshop/
```

where `<path-to-your-frontend.pem>` is the `pwd `where you store your `frontend.pem`

Note the trailing slashes on the directory names in the `rsync` invocation, as they are significant.

# The stock create-react-app README

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of the Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
