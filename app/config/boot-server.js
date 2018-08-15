import { createServerRenderer } from 'aspnet-prerendering';
import { renderToString } from 'react-dom/server';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';

export default createServerRenderer(params => {
  return new Promise((resolve, reject) => {
    const app = <App />;
    registerServiceWorker();

    // Perform an initial render that will cause any async tasks (e.g., data access) to begin
    const html = renderToString(app);
    resolve({ html });
  });
});
