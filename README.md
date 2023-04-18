# App Description
This cv app is made as a demonstration of rendering the HTML Elements with the content, dynamically rendered 
from the JSON file, which is requested from the server, while the empty page is on the client side.
## Task: 
- To realize the CV App with React, dynamically constructing the HTMLElements from the fetched JSON file, and 
re-render the HTMLElements on the events, connected to the data or chosen filters;
- All the UI elements (lists, paragraphs, filters, etc) should be rendered according to the JSON data;
- The fetched data should be stored in the localStorage for 24 hours, avoiding repeated http requests to the
server;
- To renew the LocalStorage, if the creation date of the LocalStorage is more than 24 hours; 
- To set the LocalStorage with the image, fetched from the JSON data url and read with FileReader;
- If the fetched JSON data contains refs on pdf files to be downloaded, then to create downloadable <a> links 
with href to the fetched pdf files; <br>
The pdf files for the <a> links should be fetched and stored separately;
- Fetched pdf files should be stored in the LocalStorage for the next sessions; <br>
The files should be also validated with the creation date and restored if necessary;
- The link to the code is available in the section "Experience";
- Finally, bundled in the App container, it will be appended to the '#root' DOM Element of the initial empty page;
- No hardcoded names and elements UI;
- The initial render of the App is empty with the only 'loading' icon;
- To make adoptive html on desktop and mobile screens;
- To imitate the loading time, showing the loading icon, when fetching the data;
- On choosing the filter, the components must be re-rendered with the new data;
- To visually demonstrate the level of knowledge and skills with the indicating bar from 0 to 100%;
- On scrolling the page down, the filter`s bar must emerge on the top of the page in the fixed position 
in order to be accessible in the scrolled page;
- On re-rendering the data to scroll up the page to zero position;
- To make animation of the scrolling text on the top of the page;
______________________

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).