// Eloquent JavaScript Chapter 14 Notes

// The Document Object Model:

// When you open a webpage the browser compiles and assembles the HTML into a readable document. The browser creates a tree-like structure called the Document Object Model (DOM). The DOM is a representation of the document that the browser can manipulate.

// Document Structure:

// HTML is just a set of boxes inside of boxes. The DOM represents this structure as a tree of objects. Each object represents a box in the document.

// See c14NotesHTML.html for an example of a simple HTML document.

// Trees:

// A browser document is made up of a tree similar to the syntax tree reviewed in earlier chapters. This tree is made of 'nodes' which are children of the previous node.

// Nodes in the document are for 'elements' which are represented in HTML as tags.

// Here is a visualization of our document tree:

// html -> head -> title -> My home page
//    |__> body -> h1 -> My home page
//         |_____> p -> Hello, I am Marijn and this is my home page.
//         |_____> p -> I also wrote a book! Read it
//                   |__> a -> here
//                   |__> .

// The Standard:

// The DOM is a standard that is implemented by all browsers. The standard is maintained by the World Wide Web Consortium (W3C). The standard is a set of rules that all browsers must follow. It also allows all languages to interact with the DOM.

// Example: The childNodes property of an element node hold an array-like object with a length property as well as other properties labled by numbers to access the child nodes. But instead of being a realy array it is an instance of the NodeList type so it will not have map or slice methods, for example.

// There is also no way to create a new node a immediately add children to it. You must first create the node and then add it to the parent node.

// Moving through the Tree:

// To navigate the tree you can access nodes using properties like firstChild and lastChild. To return adjacent nodes you can use nextSibling and previousSibling. To access the parent node you can use parentNode.

// This function will return the first header element in a document:
function talksAbout(node, string) {
    // If the node is an element node then we will iterate through the child nodes and return true if the string is found.
    if (node.nodeType == Node.ELEMENT_NODE) {
        for (let child of node.childNodes) {
            // Each child node is passed to the talksAbout function recursively.
            if (talksAbout(child, string)) {
                return true;
            }
        }
        // If the node is a text node then we will return true if the string is found.
        return false;
        // If the node is a text node then we will return true if the string is found.
    } else if (node.nodeType == Node.TEXT_NODE) {
        return node.nodeValue.indexOf(string) > -1;
    }
}

console.log(talksAbout(document.body, "book"));
// → true

// Finding Elements:

// It's generally a bad idea to search for elements by following a fixed path from 'document.body'. It makes assumptions about where elements lie in the document.

// Instead we can utilize getElementBy[x] methods to find elements. These methods return the first element that matches the query.

// getElementsByTagName returns an array-like object of elements with the given tag name.

let link = document.body.getElementsByTagName("a")[0];
console.log(link.href);

// getElementById returns the element with the given id.

// See c14NotesHTML.html for an example of an element with an id.

// Finally, getElementsByClassName returns an array-like object of elements with the given class name.

// Changing the Document:

// The DOM allows you to change the document. You can change the content of an element, change the style of an element, or add new elements to the document.

// insertBefore is a method that allows you to insert a new node before an existing node.

// See c14NotesHTML.html for an example of a document with a list of items and using the insertBefore method.

// The above method will move the third paragraph to the top of the document.

// The replaceChild method allows you to replace a child node with a new node. Both methods require a parent node to be called on.

// Creating Nodes:

// See c14NotesHTML.html for an example of creating a new node and adding it to the document.

// THe loop in the example goes over images and creates a new paragraph element for each image. It then adds the paragraph to the document.

// The loop that goes over the images starts at the end of the list. This is necessary because the node list returned by a method like getElementsByTagName (or a property like childNodes) is live. That is, it is updated as the document changes. If we started from the front, removing the first image would cause the list to lose its first element so that the second time the loop repeats, where i is 1, it would stop because the length of the collection is now also 1.

// If you would like a solid collection of nodes you can convert the collection to a real array by calling Array.from on it.

let arrayish = {0: "one", 1: "two", length: 2};
let array = Array.from(arrayish);
console.log(array.map(s => s.toUpperCase()));
// → ["ONE", "TWO"]

// See c14NotesHTML.html for an example of converting a collection of nodes to an array.

//Attributes:

// HTML have attributes such as 'href' (which points to a URL) and 'src' (which points to an image). You can access these attributes using the getAttribute method.

// See c14NotesHTML.html for an example of accessing the 'href' attribute of a link.

// NOTE: You can can create custom data attributes by prefixing the attribute name with 'data-'.

// Layout:

// Block elements: <p>, <div>, <h1>, <form>
// Inline elements: <a>, <span>, <strong>, <em>

// You can access the size and position of an element using JavaScript

// offsetWidth and offsetHeight give the size of the element in pixels.
// clientWidth and clientHeight give the size inside the element, ignoring border width.

// See c14NotesHTML.html for an example of accessing the size of an element.

// You can also get a precise position using the method getBoundingClientRect. This method returns an object with properties top, bottom, left, and right, indicating the pixel positions of the sides of the rectangle.

// If you want the relative position of an element you can use pageXOffset for the horizontal position and pageYOffset for the vertical position.

// Constantly accessing these positions can cost a lot of computational power. It is better to store the position in a variable and update it only when necessary.

// See c14NotesHTML.html for an example of this

// Styling:

// You can change the style of an element using the style property. This property holds an object that has properties for all possible style properties.

// See c14NotesHTML.html for examples of changing the style of an element.

/*
    This text is displayed <strong>inline</strong>,
    <strong style="display: block">as a block</strong>, and
    <strong style="display: none">not at all</strong>.
*/

// In the above example the block will be on the next line and the last one will not be displayed at all thanks to the 'display: none' style.

// You can use JavaScript to directly change the style of an element.

// See c14NotesHTML.html for an example of changing the style of an element using JavaScript.

// Style properties often contain hyphens which means that in JavaScript you can either wrap the property name in quotes and brackets or simply use camel case.

// Cascading Styles:

// Example of cascading in c14NotesHTML.html

// Example of targeting a specific element in c14NotesCSS.css

// Query Selectors:

// You can find dom elements using query selectors. This method takes a string that specifies the element you are looking for. This can also be used to find elements by class or id.

// querySelectorAll takes a selector string and returns a NodeList containing all elements that match the selector.

// See c14NotesHTML.html for an example of using querySelectorAll.

// The difference between this and getElementsBy[X] is that querySelectorAll returns a static list of elements. This means that it will not update as the document changes. It is still not like an array though and will require conversion to an array to use array methods.

// Positioning and Animating:

// You can use the 'position' style property to influence the layout in various ways:
//  - 'static': The default value. The element is laid out in the document flow.
//  - 'relative': The element is offset relative to its normal position.
//  - 'absolute': The element is removed from the normal document flow and no space is created for it.
//  - 'fixed': The element is fixed relative to the viewport.

// You can even use this to create animations. Example in c14NotesHTML.html

// The script in the example uses requestAnimationFrame to schedule the animate function to run whenever the browser is ready to repaint the screen. Animate function itself calls requestAnimationFrame again to schedule the next update. Updates may occur at a rate of 60 per second.

// Summary:

// The DOM is a tree-like structure that represents a document. You can change the document by changing the DOM. You can find elements in the DOM using various methods. You can change the style of an element using the style property. You can use query selectors to find elements in the DOM. You can use the position property to influence the layout of an element. You can use requestAnimationFrame to create animations.

