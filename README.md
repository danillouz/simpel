# ✨ SimpEl ✨
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![API Doc][doclets-image]][doclets-url]

[npm-image]: https://img.shields.io/badge/npm-v0.5.0-blue.svg
[npm-url]: https://www.npmjs.com/package/simpel
[travis-image]: https://travis-ci.org/danillouz/simpel.svg?branch=master
[travis-url]: https://travis-ci.org/danillouz/simpel
[doclets-image]: https://doclets.io/danillouz/simpel/master.svg
[doclets-url]: https://doclets.io/danillouz/simpel/master

A simple way to create and render HTML Elements.

> Minimalistic, zero dependency, only 4KB, JavaScript UI
library!

No but seriously, `SimpEl` provides a _simple_ interface to
create HTML _Elements_ by defining Components. These can be
created by either using [JSX](https://facebook.github.io/jsx/)
or vanilla JavaScript.

Only 2 methods are provided. One to [create](#createelementtype-props-children) elements and
one to [render](#renderelement-container) them.

# Table of contents
- [Why?](#why)
- [When to use](#when-to-use)
- [Requirements](#requirements)
- [Install](#install)
- [Syntax](#syntax)
- [Interface](#interface)
	* [Create Element](#createelementtype-props-children)
	* [Render](#renderelement-container)
- [SimpEl ❤️ JSX](#simpel-️-jsx)
	* [How to transform](#how-to-transform)
	* [Caveats](#caveats)
- [Examples](#examples)
	+ Vanilla JavaScript
		* [Create and render a list](#create-and-render-a-list)
	+ JSX
		* [Render Components stored in a variable](#render-components-stored-in-a-variable)
		* [Render Functional Components](#render-functional-components)
		* [Render dynamically created Components](#render-dynamically-created-components)
		* [Bind an event listener to a Component](#bind-an-event-listener-to-a-component)
		* [Use `refs` to reference other Components](#use-refs-to-reference-other-components)

# Why?
> Because why reinvent the wheel right? Well, I needed a
very, very simple wheel and I really like React and JSX..

# When to use
This library should only be used if you need to create
almost static HTML pages with non complex UX.

If you need something more powerful, then I recommend you
have a look at the amazing [React](https://facebook.github.io/react/)
library. The `SimpEl` API is heavily inspired by it, because
React is awesome.

# Requirements
You need [Node](https://nodejs.org/en/) version `4` or
greater.

# Install
```
npm i -S simpel
```

# Syntax
```js
import Simpel from 'simpel';

const div = Simpel.createElement('div', null, 'Hello World!');

Simpel.render(
	div,
	document.getElementById('root')
);
```

# Interface
The following methods are provided:

## createElement(type, props, children)
Creates an HTML [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element).

#### Arguments
| NAME | TYPE | DESCRIPTION | REQUIRED |
| :---: | :---: | :--- | :---: |
| type | String\|Function\|Element | The Element to be created. | Yes |
| props | Object | Contains the properties of a `SimpEl` Component as key value pairs. This can be an Element attribute like `class`, an event handler like `onClick`, etc. | No |
| children | Array\|Element\|String | The child Elements of a `SimpEl` Component. This can be an Array of Elements, a comma separated list of Elements (i.e. multiple arguments) or a plain String (i.e. to create a [text node](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode)). | No |

#### Returns
HTML [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element).

## render(element, container)
Renders an HTML Element into the DOM in the supplied
`container`.

#### Arguments
| NAME | TYPE | DESCRIPTION | REQUIRED |
| :---: | :---: | :--- | :---: |
| element | Element | The HTML Element to be appended to the DOM. | Yes |
| container | Element | The HTML container into which the HTML Element will be rendered. | Yes |

#### Returns
Void.

# SimpEl ❤️ JSX
You can use [JSX](https://facebook.github.io/jsx/) to create
`SimpEl` components. But to do so you need to _transform_
it to `SimpEl` function calls.

This means the following:

```js
import Simpel from 'simpel';

const profile = <div>
	<img src="avatar.png" class="profile" />

	<h3>
		{
			[ user.firstName, user.lastName ].join(' ')
		}
	</h3>
</div>;
```

Needs to be transformed into:

```js
import Simpel from 'simpel';

const profile = Simpel.createElement(
	'div',
	null,
	Simpel.createElement(
		'img',
		{ src: 'avatar.png', className: 'profile' }
	),
	Simpel.createElement(
		'h3',
		null,
		[ user.firstName, user.lastName ].join(' ')
	)
);
```

This can be done with the [Babel React JSX Transform Plugin](https://babeljs.io/docs/plugins/transform-react-jsx/).

## How to transform
First install the transform plugin:

```
npm i -D babel-plugin-transform-react-jsx
```

Then configure the plugin in your `.babelrc` file:

```
{
	"plugins": [
		[
			"transform-react-jsx",
			{
				"pragma": "Simpel.createElement"
			}
		]
	]
}
```

_Note that you need to change the **pragma** to
`Simpel.createElement`._

## Caveats
Always make sure to have the `SimpEl` library _in scope_
when defining JSX Components. If omitted, the transformed
JSX will **not** be able to execute:

```js
import Simpel from 'simpel';

export default Label = <span>Hi</span>;
```

# Examples
- Vanilla JavaScript
	* [Create and render a list](#create-and-render-a-list)
- JSX
	* [Render Components stored in a variable](#render-components-stored-in-a-variable)
	* [Render Functional Components](#render-functional-components)
	* [Render dynamically created Components](#render-dynamically-created-components)
	* [Bind an event listener to a Component](#bind-an-event-listener-to-a-component)
	* [Use `refs` to reference other Components](#use-refs-to-reference-other-components)

## Create and render a list
```js
/**
 * We will render the following HTML:
 *
 * <div id="root">
 *     <ul class="list">
 *         <li class="list-item">milk</li>
 *         <li class="list-item">eggs</li>
 *         <li class="list-item">bread</li>
 *         <li class="list-item">cheese</li>
 *     </ul>
 * </div>
 */

'use strict';

const Simpel = require('simpel');

const List = Simpel.createElement(
	'ul',
	{ 'class': 'list' },
	Simpel.createElement(
		'li',
		{ 'class': 'list-item' },
		'milk'
	),
	Simpel.createElement(
		'li',
		{ 'class': 'list-item' },
		'eggs'
	),
	Simpel.createElement(
		'li',
		{ 'class': 'list-item' },
		'bread'
	),
	Simpel.createElement(
		'li',
		{ 'class': 'list-item' },
		'cheese'
	)
);

Simpel.render(
	List,
	document.getElementById('root')
);
```

## Render Components stored in a variable
```js
import Simpel from 'simpel';

const Story = (
	<div id="story">
		<p class="story-text">Once upon a time..</p>
	</div>
);

Simpel.render(
	<Story />, // You can also reference `Story`, i.e. non JSX.
	document.getElementById('root')
);
```

## Render Functional Components
```js
import Simpel from 'simpel';

const User = props => <span>My name is { props.name }</span>;

Simpel.render(
	<User name="Daniel Illouz" />,
	document.getElementById('root')
);
```

## Render dynamically created Components
```js
import Simpel from 'simpel';

const Groceries = ({ groceries }) => (
	<ul class="list">
		{
			groceries.map(
				item => <li class="list-item">{ item }</li>
			)
		}
	</ul>
);

Simpel.render(
	<Groceries
		groceries={ [ 'milk', 'eggs', 'bread', 'cheese' ] }
	/>,
	document.getElementById('root')
);
```

## Bind an event listener to a Component
```js
import Simpel from 'simpel';

function _showAlert() {
	alert('Hello!');
}

const Alert = <button onClick={ _showAlert }>alert</button>;

Simpel.render(
	<Alert />, // You can also use JSX, i.e. `<Alert />`.
	document.getElementById('root')
);
```

The following events are supported:

| EVENT NAME | ATTRIBUTE NAME |
| :--- | :--- |
| abort | onAbort |
| animationstart | onAnimationStart |
| animationiteration | onAnimationIteration |
| animationend | onAnimationEnd |
| blur | onBlur |
| canplay | onCanPlay |
| canplaythrough | onCanPlayThrough |
| change | onChange |
| click | onClick |
| contextmenu | onContextMenu |
| copy | onCopy |
| cut | onCut |
| dblclick | onDoubleClick |
| drag | onDrag |
| dragend | onDragEnd |
| dragenter | onDragEnter |
| dragexit | onDragExit |
| dragleave | onDragLeave |
| dragover | onDragOver |
| dragstart | onDragStart |
| drop | onDrop |
| durationchange | onDurationChange |
| emptied | onEmptied |
| encrypted | onEncrypted |
| ended | onEnded |
| error | onError |
| focus | onFocus |
| input | onInput |
| invalid | onInvalid |
| keydown | onKeyDown |
| keypress | onKeyPress |
| keyup | onKeyUp |
| load | onLoad |
| loadeddata | onLoadedData |
| loadedmetadata | onLoadedMetadata |
| loadstart | onLoadStart |
| pause | onPause |
| play | onPlay |
| playing | onPlaying |
| progress | onProgress |
| mousedown | onMouseDown |
| mouseenter | onMouseEnter |
| mouseleave | onMouseLeave |
| mousemove | onMouseMove |
| mouseout | onMouseOut |
| mouseover | onMouseOver |
| mouseup | onMouseUp |
| paste | onPaste |
| ratechange | onRateChange |
| reset | onReset |
| scroll | onScroll |
| seeked | onSeeked |
| seeking | onSeeking |
| submit | onSubmit |
| stalled | onStalled |
| suspend | onSuspend |
| timeupdate | onTimeUpdate |
| transitionend | onTransitionEnd |
| touchcancel | onTouchCancel |
| touchend | onTouchEnd |
| touchmove | onTouchMove |
| touchstart | onTouchStart |
| volumechange | onVolumeChange |
| waiting | onWaiting |
| wheel | onWheel |

## Use `refs` to reference other Components
```js
import Simpel from 'simpel';

let n = 0;

function _addItem(e) {
	e.preventDefault();

	// `SimpEl` returns HTML Elements so you can use
	// all API methods like `appendChild`.
	this.refs.list.appendChild(
		<li>item { n++ }</li>
	);
}

const Widget = () => (
	<div>
		<ul ref="list" />

		<button onClick={ _addItem }>
			add
		</button>
	</div>
);

Simpel.render(
	<Widget />,
	document.getElementById('root')
);
```

# License
Apache 2.0 © [Daniël Illouz](https://github.com/danillouz)
