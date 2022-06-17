# React

## Basics

A JavaScript library for building user interfaces. It is not a mega framework and it is not a full-stack solution. First introduced in 2013 and created by Facebook (https://reactjs.org).

> React wraps an imperative API with a declarative one.

To add a class to a paragraph when a button is clicked: In **Imperative Programming**, you would *perform steps* and *select the paragraph and add a class to it*. In **Declarative Programming**, you would *describe what the UI should look like* and then *render the page*.

Therefore, declarative programming is very well suited for UI development.

- React is just the view: Application logic generates some data and a React component gets the HTML into the page.
- React avoids Two-Way Data Binding.
- The **React DOM** performs the actual rendering on a web page.
- The **React Component API** has the Data to be rendered, Lifecycle methods, Events and JSX, a syntax used to describe UI structures.

**Performance matters:** Challenge of the declarative approach is the performance, as complete re-rendering into the DOM is bad for it.

React uses a **Virtual DOM**, which keeps a representation of the real DOM elements in memory. It calculates the differences on rendering a component and only executes the necessary DOM operations.

**JSX** is the syntax used by React components. It is HTML markup mixed with custom tags:

```jsx
const Hello = () => (
  <p>Hello World</p>
);
```

JSX is transpiled into JavaScript statements, browsers have no idea what JSX is.

React comes with HTML components, and any of their standard properties can be passed. Some exceptions do exist, e.g. HTML `class` attribute is called `className` in JSX.

**Components** extend `Component` and have a `render()` method.

```jsx
class MyComponent extends Component {
	render() {
    // All components have a "render()" method, which
    // returns some JSX markup. In this case, "MyComponent"
    // encapsulates a larger HTML structure.
    return (
      <section>
        <h1>My Component</h1>
        <p>Content in my component...</p>
      </section>
    );
	}
}

render(
	<MyComponent />,
  document.getElementById('app')
);
```

**Nested Elements** can be accessed using `{this.props.children}`.

JSX has special syntax to embed JS expressions: `{expression}`. Any valid JavaScript expression can go in between the braces.

Component data comes in two varieties:

- **State** is the dynamic part of a React component.
- **Properties** are used to pass data into components.

The **Initial Component State** should always be an object. The reason for this is consistency.

```jsx
// Initial Component State
state = {
    heading: 'React Awesomesauce (Busy)',
    content: 'Loading...',
}

// Changing the State
myComponent.setState({
    heading: 'React Awesomesauce',
    content: 'Done!',
});
```

Component is first rendered with its default state, and then `setState()` changes the state property values. The state doesn't get replaced, but rather is merged to the state.

**Passing Property Values** into components: Are only set once when the component is rendered. About anything can be passed as a property value via JSX. Properties are available in the component as `this.props`.

```jsx
<MyButton disabled={appState.disabled} /> // pass

const { disabled, text } = this.props // access in MyButton
```

**Function Components** are often lightweight with no state and no lifecycle. **Pure Functions** should be used in this case. **React Hooks** allow function components with state and lifecycle.

```jsx
const MyButton = ({ disabled, text }) => (
  <button disabled={disabled}>{text}</button>
);
```

A common React pattern is the concept of **Container Components**. Don't couple data fetching with data rendering. Container is responsible for fetching the data, data is then passed down to a component responsible for rendering the data.

```jsx
// Container
class MyContainer extends Component {
  // The container should always have an initial state
  state = { items: [] }
  // After the component has been rendered, fetch data
  componentDidMount() {
    fetchData()
      .then(items => this.setState({ items }));
  }
  render() {
    return (
      <MyList {...this.state} />
    );
	}
}

// A stateless function component that expects an "items"
// property so that it can render a "<ul>" element.
const MyList = ({ items }) => (
  <ul>
    {items.map(i => (
      <li key={i}>{i}</li>
		))}
	</ul>
);
```

## Components and Hooks

**Event Handlers** for particular elements are declared in JSX. Elements can have more than one event handler. Event handlers usually need access to properties or state and must be manually bound to the component context via `handleclick.bind(this)`.

```jsx
<button onClick={this.onClick}>
	{this.props.children}
</button>
```

Input elements like `<input placeholder="Title" value={title} onChange={onChangeTitle} />` are called **Controlled Components**. Here, every change in the input element changes the state. Consequently, React state is used as the **single source of truth**.

React components go through a **Lifecycle**:

| Initial Render                    | Re-render                         |
| --------------------------------- | --------------------------------- |
| constructor()                     | static getDerivedStateFromProps() |
| static getDerivedStateFromProps() | shouldComponentUpdate()           |
| render()                          | render()                          |
| componentDidMount()               | getSnapshotBeforeUpdate()         |
|                                   | componentDidUpdate()              |

If the state hasn't changed, there's no need to render. If the `shouldComponentUpdate()` method returns `false`, no render happens.

**React Hooks** are a new addition in React 16.8. They use state and other React features without writing a class. Completely opt-in and 100% backwards-compatible.

A hook are functions that let you *hook into* React state and lifecycle. There are a few built-in Hooks like `useState`.

```jsx
// Without Hooks
import React, { render } from 'react';
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			count: 0
		};
	} 
	render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
					Click me
        </button>
      </div>
		);
	}
}

// With State Hook
import React, { useState } from 'react';
function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
				Click me
      </button>
    </div>
	);
}
```

The **State Hook** adds some local state to a function component. `useState` returns a pair: The current state value, and a function that lets you update it. The argument of `useState` is the initial state, and it doesn't have to be an object.

```jsx
// Declare multiple state variables!
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState('banana');
const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

The **Effect Hook** tells React what to do after render. The argument is a function (the effect) and this function will be called after performing the DOM updates. It can use the state variables (closure).

```jsx
// Similar to componentDidMount and componentDidUpdate:
useEffect(() => {
	document.title = `You clicked ${count} times`;
});
```

In class-based components, the lifecycle method `componentWillUnmount` is used for **cleanup** e.g. when a component subscribes to an external data source. With hooks, effects return a cleanup function.

```jsx
useEffect(() => {
	function handleStatusChange(status) {
		setIsOnline(status.isOnline);
  }
	ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
	// Specify how to clean up after this effect:
	return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
	};
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes)
```

Effects run for every render, but an array of variables can be passed as an optional second argument to `useEffect` to skip applying an effect if certain values haven't changed.

**Only call Hooks at the top level.**

**Only call Hooks from React functions.**

Extract component logic into reusable functions by building **Custom Hooks**. It is a function that may call other Hooks. A custom Hook starts with `use`.

```jsx
import React, { useState, useEffect } from 'react';
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
	});
  return isOnline;
}

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);
  if (isOnline === null) {
    return 'Loading...';
	}
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);
  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
		</li>
  );
}
```

## Architecture and Style

**Context** provides a way to share values between components. These data can be considered *global*, instead passing them top-down via props.

```jsx
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
		);
  }
}
function Toolbar(props) {
  return (
    <div><ThemedButton /></div>
  );
}
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

The **Content Hook** `useContext` accepts a context object and returns the current context value for that context. A `<MyContext.Provider>` is still needed. The Hook triggers a re-render when the nearest Provider updates. **Memoization** can be used if re-rendering is expensive.

```jsx
const themes = {
  light: { foreground: "#000000", background: "#eeeeee" },
  dark:  { foreground: "#ffffff", background: "#222222" }
};
const ThemeContext = React.createContext(themes.light);
function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
		</div>
  );
}
function ThemedButton() {
const theme = ;
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
		</button>
  );
}
```

**Styling React Components** is usually achieved with CSS using class names. The package *classnames* is a JavaScript utility for conditionally joining classNames together (https://www.npmjs.com/package/classnames). **Inline Styles** can be used using the `style` attribute, which accepts an object with camelCased properties. CSS classses are generally more efficient than inline styles. **CSS-in-JS** is when CSS is composed using JavaScript. Various third-party libraries are available and are used in React Native, too.

**Animations in React** best achieved using third-party libraries: https://reactcommunity.org/react-transition-group/, https://github.com/chenglou/react-motion

Class components are extending the base class `Component`. Own **Base Components** can be created. Components can inherit state, properties, JSX markup and event handlers.

```jsx
class BaseComponent extends Component {
  state = {
    data: fromJS({
      name: 'Mark',
      enabled: false,
      placeholder: '',
		}),
  };
  get data() { return this.state.data; }
  set data(data) { this.setState({ data }); }
  render() {
    return null;
	}
}

class MyComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state.data = this.data
      .merge({
        placeholder: 'Enter a name...',
        enabled: true,
			});
  }
  render() {
    const { enabled, name, placeholder } = this.data.toJS();
    return (
      <label htmlFor="my-input"> ... </label>
    );
	}
}
```

**High-Order Components** are functions that take a component as input and return a new component. Preferred over inheritance to compose new behaviour. Comparable to high-order functions in functional programming.

Using a higher order function to connect a component to a **Data Store**. The store wraps a given component with a data source. This pattern is used by libraries like **Redux** (https://redux.js.org/).

Navigation is achieved using **Routes**. The de-facto routing tool for React is the `react-router` package (https://reacttraining.com/react-router/).

```jsx
import React from 'react';
import {
  Router,
  Route,
  browserHistory,
} from 'react-router';
import MyComponent from './MyComponent';
// Exports a "<Router>" component to be rendered.
export default (
  <Router history={browserHistory}>
    <Route path="/" component={MyComponent} />
  </Router>
);
```

React can be integrated with additional third-party libraries like JQuery, Bootstrap or Ionic.
