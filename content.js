/**
 * This blacklist is used to prevent replacement of inline styles / scripts
 * which might break the layout of the page
 */
var tagnameBlacklist = /(SCRIPT|STYLE|NOSCRIPT)/g

/**
 * This method takes an input parameter and returns 
 * it after replacing certain regex matches
 * @param {*} input 
 */
function replaceText(input) {
    var res = input;
    res = res.toString().replace(/(tz|z)/g, "ts");
    res = res.toString().replace(/(Tz|Z)/g, "Ts");

    res = res.toString().replace(/(ck|k)/g, "gch");
    res = res.toString().replace(/(Ck|K)/g, "Gch");

    res = res.toString().replace(/x/g, "gs");
    res = res.toString().replace(/X/g, "Gs");
    return res;
}

// loop over every element in the document
var elements = document.getElementsByTagName('*');
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    // if the element tagname is on the blacklist, skip it
    if(element.tagName.match(tagnameBlacklist)) {
        continue;
    }

    // loop all childNodes of the element
    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        // if the childNode is of type TEXT_NODE
        if(node.nodeType === Node.TEXT_NODE) {
            var text = node.nodeValue;
            var newText = replaceText(text);
            if (text !== newText) {
                // replace the text in the document, if it got changed
                element.replaceChild(document.createTextNode(newText), node);
            }
        }        
    }
}