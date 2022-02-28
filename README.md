# Cool Comment Sections

Automatically generates styled comment sections from your selection.

```js
events

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-                 E V E N T S                 -=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

```

*Supports all languages and comment types.*

## Installing

You can install the latest version of the extension via the Visual Studio Marketplace [here](https://marketplace.visualstudio.com/items?itemName=LightSoulDev.coolcommentsections).

Alternatively, open Visual Studio code, press `Ctrl+P` or `Cmd+P` and type:

```bash
    > ext install coolcommentsections
```

### Source Code

The source code is available on GitHub [lightSoulDev/vs-code-comment-sections](https://github.com/lightSoulDev/vs-code-comment-sections).

## Configuration

`coolcommentsections.params`

```js
"default": {
    // Width of comment section
    // Not encluding language comment chars
    "blockLenght" : 50, 
    // Don't add upper and bottom diviers
    // Examples:
    //     [false]: "// =-=-=-=-=-=-=-= "
    //              "// =- selection -= "
    //              "// =-=-=-=-=-=-=-= "
    //
    //     [true]:  "// =- selection -= "
    "singleLine" : false,
    // Main divider style
    "divider" : "=-",
    // Trim section size based on divider
    // Examples:
    //     [false]: "// =-=-=-=- "
    //     [true]:  "// =-=-=-= "
    "adjustDivider" : true,
    // Apply spacing and uppercase to selection
    // Examples:
    //     [false]: "// =-      selection      -= "
    //     [true]:  "// =-  S E L E C T I O N  -= "
    "formatSelection" : true
}
```
