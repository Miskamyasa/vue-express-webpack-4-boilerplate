## Vue, Express, Webpack4 as frontend bundler

Complete rewrite:
webpack 3 -> 4
sass -> css/postcss

### Dev mode
```
    "npm run dev" start dev env
    open in browser:  localhost:3000
    autoreload enabled (must have livereload plugin for browser)
    https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    https://addons.mozilla.org/en-US/firefox/addon/remotelivereload/
```
### Production
```
  run "npm run start" this will repack all src to compressed format and start the server
```

### Dependencies
```
    "autoprefixer": "^8.6.4",
    "babel-core": "^6.26.3",
    "babel-eslint": "^8.2.5",
    "babel-jest": "^23.2.0",
    "babel-loader": "^7.1.4",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-2": "^6.24.1",
    "clean-webpack-plugin": "^0.1.19",
    "cookie-parser": "~1.4.3",
    "css-loader": "^0.28.11",
    "debug": "~2.6.9",
    "dotenv": "^6.0.0",
    "dotenv-webpack": "^1.5.7",
    "eslint": "^5.0.1",
    "eslint-config-airbnb-base": "^13.0.0",
    "eslint-plugin-import": "^2.13.0",
    "eslint-plugin-node": "^6.0.1",
    "eslint-plugin-promise": "^3.8.0",
    "express": "~4.16.0",
    "file-loader": "^1.1.11",
    "html-webpack-plugin": "^3.2.0",
    "http-errors": "~1.6.2",
    "jest": "^23.2.0",
    "morgan": "~1.9.0",
    "postcss-flexbugs-fixes": "^3.3.1",
    "postcss-loader": "^2.1.5",
    "style-loader": "^0.21.0",
    "vue": "^2.5.16",
    "vue-loader": "^15.2.4",
    "vue-template-compiler": "^2.5.16",
    "webpack": "^4.14.0",
    "webpack-livereload-plugin": "^2.1.1",
    "webpack-cli": "^3.0.8"
```

***
