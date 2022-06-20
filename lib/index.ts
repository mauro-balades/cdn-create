
declare global {
    interface Window { addCDN(cdns: Array<CDNOptions>): void; }
}

interface CDNOptions {
    url: string;
    [tag_options: string]: string;
}

const isJSScript = (url: string) => {
    url = url.toLowerCase();
    if ((!url.endsWith(".js")) && (!url.endsWith(".css"))) {
        console.warn("[CDN-CREATe]: \".js\" or \".css\" not found at the end of the URL. \n\tInterpreted as a JS script.")
        return true;
    }

    return url.endsWith(".js");
}

const addCDN = (cdns: Array<CDNOptions>): void => {
    cdns.forEach((cdn: CDNOptions) => {
        /**
         * Create a new tag element. Depending if it is a
         * script, we will create a HTMLScriptElement or a
         * HTMLLinkElement.
         *
         * We set the type as "any" since later on, we will
         * need to set the URL to 2 different attributes.
         * __________________
         * |                | Typescript does not allow it
         * | script -> src  | because they are 2 different
         * | link   -> href | types of elements meaning
         * |________________| there is a type conflict.
         */
        var tag = document.createElement(isJSScript(cdn.url) ? 'script' : 'link') as any;

        /**
         * Set the URL to the script/link tag.
         */
        isJSScript(cdn.url)   ?
            tag.src = cdn.url :
            tag.href = cdn.url

        /**
         * Iterate for every single item of the attributes
         * the user passed in:
         *    [CDNOptions.tag_options: string]: string
         *
         * On each iteration, we will set this attribute to
         * the tag.
         *
         * example usage:
         *  1 | addCDN([{
         *  2 |     url: "https://example.com/example.js",
         *  3 |     tag_options: {
         *  4 |         defer: "",
         *  5 |         async: "",
         *  6 |     }
         *  7 | }])
         *  -----------------------------------------------
         *  >>> <script src="..." defer="" async=""></script>
         */
        if (cdn.tag_options)
        Object.keys(cdn.tag_options).forEach(function(attribute: string) {

            // @ts-ignore
            let value: string = cdn.tag_options[attribute];
            tag.setAttribute(attribute, value);
        });

        /**
         * Append the script/style tag to the first head
         * instance found in the document.
         *
         * todo: add to different parts of the document?
         */
        document.getElementsByTagName('head')[0].appendChild(tag);
    });
}


window.addCDN = addCDN;
export default addCDN;
