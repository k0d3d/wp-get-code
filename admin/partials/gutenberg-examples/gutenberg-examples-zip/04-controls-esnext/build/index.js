!function(){"use strict";var e,t={793:function(){var e=window.wp.blocks,t=JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"gutenberg-examples/example-04-controls-esnext","title":"Example: Controls (ESNext)","textdomain":"gutenberg-examples","icon":"universal-access-alt","category":"layout","attributes":{"content":{"type":"string","source":"html","selector":"p"},"alignment":{"type":"string","default":"none"}},"example":{"attributes":{"content":"Hello world","alignment":"right"}},"editorScript":"file:./build/index.js","editorStyle":"file:./build/index.css","style":"file:./build/style-index.css"}'),n=window.wp.element,r=window.wp.blockEditor;function o(){return o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}const{name:l}=t;(0,e.registerBlockType)(l,{edit:e=>{const t=(0,r.useBlockProps)(),{attributes:{content:o,alignment:l},className:s}=e;return(0,n.createElement)("div",t,(0,n.createElement)(r.BlockControls,null,(0,n.createElement)(r.AlignmentToolbar,{value:l,onChange:t=>{e.setAttributes({alignment:void 0===t?"none":t})}})),(0,n.createElement)(r.RichText,{className:s,style:{textAlign:l},tagName:"p",onChange:t=>{e.setAttributes({content:t})},value:o}))},save:e=>{const t=r.useBlockProps.save({className:`gutenberg-examples-align-${e.attributes.alignment}`});return(0,n.createElement)(r.RichText.Content,o({},t,{tagName:"p",value:e.attributes.content}))}})}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=function(t,n,o,l){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],l=e[u][2];for(var a=!0,i=0;i<n.length;i++)(!1&l||s>=l)&&Object.keys(r.O).every((function(e){return r.O[e](n[i])}))?n.splice(i--,1):(a=!1,l<s&&(s=l));if(a){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[n,o,l]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,46:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,l,s=n[0],a=n[1],i=n[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(i)var u=i(r)}for(t&&t(n);c<s.length;c++)l=s[c],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(u)},n=self.webpackChunk_04_controls_esnext=self.webpackChunk_04_controls_esnext||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=r.O(void 0,[46],(function(){return r(793)}));o=r.O(o)}();