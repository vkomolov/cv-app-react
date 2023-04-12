## App Description

### Overall Description

### ESLint configurations

#### "react/jsx-no-target-blank" rules:
```
"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/click-events-have-key-events": "warn",
        "react/prefer-stateless-function": 0,
        "quotes": ["warn", "double"],
        "object-curly-spacing": ["warn", "always"],
        "react/jsx-no-target-blank": ["enabled", {
            "allowReferrer": false,
            "enforceDynamicLinks": "never",
            "warnOnSpreadAttributes": false
        }],
```
##### "allowReferrer": false (in exceptions object)
It does not require rel="noreferrer", which is safe for the inner links within the site, even for SEO.
Nevertheless, using rel="noreferrer" is recommended for avoiding vulnerabilities of older browsers linking to other urls
##### "enforceDynamicLinks": "never"
It allows to dynamic links, which is safe for the inner links and handy for
the dynamic creation of links.
##### "warnOnSpreadAttributes": false (by default)
Spread attributes are a handy way of passing programmatically-generated props to components, 
but may contain unsafe props e.g.
If false, this rule will ignore all spread attributes. If true, this rule will treat all spread attributes as if they contain an unsafe combination of props, unless specifically overridden by props after the last spread attribute prop e.g. the following would not be violations:

`<a {...unsafeProps} rel="noreferrer"></a>`
`<a {...unsafeProps} target="_self"></a>`
`<a {...unsafeProps} href="/some-page"></a>`

####TODO:
```
"no-noninteractive-element-to-interactive-role": [
   1,
   
       {
          "ul": ["listbox", "menu", "menubar", "list", "tablist", "tree", "radiogroup", "navigation"],
          "ol": ["listbox", "menu", "menubar", "list", "tablist", "tree", "radiogroup", "navigation"],
          "li": ["listitem","menuitem", "option", "row", "tab", "treeitem"],
          "div": ["menu", "button", "tab", "list", "listitem"],
          "span": ["button"]
       }
]
```
#### "jsx-a11y/no-static-element-interactions" rules:
```
"jsx-a11y/no-static-element-interactions": [
            "error",
            {
                "handlers": [
                    "onClick"
                ]
            }
        ]
```
#### "react/jsx-filename-extension" rules:
`"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]`

#### "jsx-a11y/click-events-have-key-events": "warn"

#### "react/prefer-stateless-function": 0,

#### "quotes": ["warn", "double"],

#### "object-curly-spacing": ["warn", "always"],

#### "react/jsx-no-target-blank" rules:
```
"react/jsx-no-target-blank": [1, {
            "allowReferrer": true,
            "enforceDynamicLinks": "never",
            "warnOnSpreadAttributes": false
        }]
```


______________________

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
