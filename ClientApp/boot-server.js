import * as React from 'react';
import { createServerRenderer } from 'aspnet-prerendering';
import { renderToString } from 'react-dom/server';
import App from './App';

export default createServerRenderer(function(params) {
  return new Promise(function (resolve, reject) {
    var result = renderToString(React.createElement(App));

    resolve({ html: result });
  });
});