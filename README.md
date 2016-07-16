# ✨ SimpEl ✨
> Minimalistic, zero dependency, 3KB, JavaScript UI library!

No but seriously, `SimpEl` provides a _simple_ interface to
create HTML _Elements_ by defining Components. These can be
created by either using [JSX](https://facebook.github.io/jsx/)
or vanilla JavaScript.

Only 2 methods are provided. One to [create](#createelementtype-props-children) elements and
one to [render](#renderelement-container) them.

# Why?
> Because why reinvent the wheel right? Well, I needed a
very, very simple wheel..

# When to use
This library should only be used if you need to create
almost static HTML pages with non complex UX.

If you need something more powerful, then I recommend you
have a look at the amazing [React](https://facebook.github.io/react/)
library. `SimpEl` is heavily inspired by it, because React
is awesome.

# Interface
The following methods are provided:

## createElement(type, props, children)
Creates an HTML [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element).

#### Arguments
| NAME | TYPE | DESCRIPTION | REQUIRED |
| :---: | :---: | :--- | :---: |
| type | String\|Function\|Element | The Element to be created. | Yes |
| props | Object | Contains the properties of a `SimpEl` Component as key value pairs. This can be an Element attribute like `class` or an event handler like `onClick`. | No |
| children | Array\|Element\|String | The child Elements of a `SimpEl` Component. This can be an Array of Elements, a comma separated list of Elements (i.e. multiple arguments) or a plain String (i.e. to create a [text node](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode)). | No |

#### Returns
HTML [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element).

## render(element, container)
Renders a `SimpEl` Element into the DOM in the supplied
`container`.

#### Arguments
| NAME | TYPE | DESCRIPTION | REQUIRED |
| :---: | :---: | :--- | :---: |
| element | Element | The `SimpEl` Element to be appended to the DOM. | Yes |
| container | Element | The HTML container into which the `SimpEl` Element will be rendered. | Yes |

#### Returns
Void.

# SimpEl ❤️ JSX
You can use [JSX](https://facebook.github.io/jsx/) to create
`SimpEl` components.
