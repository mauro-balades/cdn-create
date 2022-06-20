
# Documentation

## Installing

`cdn-create` is designed to be used for a webpage (meaning that `document` and `window` needs to be defined and it is not runned in server-side). You can get to install it by 2 ways:

1. by using `npm` or `yarn`
    ```sh
    $ npm i cdn-create # yarn add cdn-create
    ```
2. by using a cdn.
    ```html
        <script src="https://unpkg.com/cdn-create@1.0.0-beta/dist/index.js"></script>
    ```

## Usage

If you are using the package from `npm`, a default export would be available to you to use.

```js
import addCDN from "cdn-create";
// or
const addCDN = require("cdn-create");
```

If you are using the cdn, addCDN would be added to the `window` object.

```html
<script>
    window.addCDN();
    // or
    addCDN();
</script>
```

---

type declaration: `addCDN(cdns: Array<CDNOptions>): void`.

example:

```js
addCDN([
    {
        url: "https://example.com/example.js"
    }
])
```

To create a link tag, the url needs to end with `.css`.

```js
{
    url: "https://example.com/example.css"
}
```

You can add tag options by creating a dictionary called `tag_options`.

```js
{
    url: "https://example.com/example.js",
    tag_options: /* [tag_options: string]: string; */ {
        defer: "",
        example: "hello",
    }
}

// >>> <script src="..." defer="" example="hello"></script>
```

some examples in [`./examples/`](./examples).

