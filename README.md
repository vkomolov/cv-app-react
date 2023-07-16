# App Description
This cv app is made as a demonstration of dynamic creation of HTML elements and routing in accordance with the 
JSON file, fetched from the server or taken from the localStorage.
## Task: 
- To realize the CV App with React, dynamically rendering the HTMLElements from the fetched JSON file, and 
reacting on the events, connected to the data change or chosen filters;
- All the UI elements (lists, paragraphs, filters, etc) should be rendered according to the JSON data;
- The fetched data should be stored in the localStorage for 24 hours, avoiding repeated http requests to the
server;
- To renew the LocalStorage, if the creation date of the LocalStorage is more than 24 hours; 
- To save the fetched image to the LocalStorage. As LocalStorage can save only string type of data, to utilize the 
FileReader, which creates the string type from the image. To measure the performance of converting the image data.
- To utilize the localForage as the alternative for saving different types of data. To save the blob of the image to the
localForage and to use the traditional realisation of processing blobs with URL.createObjUrl. 
To measure the performance of converting the image data.
- Using the substitution of url directly into <img src="" > is the most optimal, as the browser knows how to do it
very efficiently. Nevertheless, for the case, to choose the most optimal variant of saving the image itself to the
local store, for its further retrieval and substitution into <img src="" >.
- If the fetched JSON data contains refs on pdf files to be downloaded, then to create downloadable <a> links 
with href to the fetched pdf files;
- The App should initially fetch the data or take it from the localStorage once at didMount stage.
- To implement redux for the alert state with types: "error" and "loading";
- To implement redux for the operations with the data, fetched from the server or the LocalStorage;
- To implement redux-saga for the operations with the async fetching data;
- To implement routing the app by using react-router: when clicking on the necessary filter, the app should be rendered
with the according route, showing the following data;
- The routes of the app should be created dynamically, according the the json, fetched. No hardcoding route names...
- Finally, bundled in the App container, it will be appended to the '#root' DOM Element of the initial empty page;
- No hardcoded names and elements UI;
- The initial render of the App is empty with the only 'loading' icon;
- To make adoptive html on desktop and mobile screens;
- To imitate the loading time, showing the loading icon, when fetching the data;
- On choosing the filter, the components must be re-rendered with the new data and the corresponding route;
- To visually demonstrate the level of knowledge and skills with the indicating bar from 0 to 100%;
- On scrolling the page down, the filter`s bar must emerge on the top of the page in the fixed position 
in order to be accessible in the scrolled page;
- On re-rendering the data, to scroll up the page to zero position;
- To make animation of the scrolling text on the top of the page;
- The link to the code is available in the section "Experience";
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