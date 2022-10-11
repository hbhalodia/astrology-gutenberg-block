(()=>{"use strict";var e,t={897:()=>{const e=window.wp.blocks,t=window.wp.element,l=window.wp.blockEditor,o=window.wp.components,a=window.wp.i18n,r=window.wp.data,n=window.wp.editor,{union:s,map:i}=lodash,g=JSON.parse('{"u2":"create-block/single-post-block","TN":"Single Post Block","Y4":{"postId":{"type":"integer","default":0},"ImageOnLeft":{"type":"boolean","default":false},"DisableDate":{"type":"boolean","default":false},"DisableExcerpt":{"type":"boolean","default":false}}}');(0,e.registerBlockType)(g.u2,{title:g.TN,attributes:g.Y4,edit:function(e){let{attributes:g,setAttributes:c}=e;const{postId:p,ImageOnLeft:b,DisableDate:u,DisableExcerpt:d}=g,{posts:h}=(0,r.useSelect)((e=>{const t=e("core").getEntityRecords("postType","post",{per_page:10});return{posts:s([{title:(0,a.__)("Select Post","astro-gutenberg-block"),id:0}],t)}})),w=i(h,(e=>{let{title:t,title:{raw:l},id:o}=e;return void 0===t.raw?{label:t,value:o}:{label:l,value:o}})),f=(0,l.useBlockProps)(),[k,m]=(0,t.useState)(p),[v,_]=(0,t.useState)(w);return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(l.InspectorControls,null,(0,t.createElement)(o.PanelBody,{title:(0,a.__)("Single Block Post Settings","astro-gutenberg-block")},(0,t.createElement)(o.ComboboxControl,{help:(0,a.__)("Search Posts to get Suggestions","astro-gutenberg-block"),value:k,onChange:e=>(e=>{null==e&&(e=0),c({postId:parseInt(e,10)}),m(parseInt(e,10))})(e),options:v,onFilterValueChange:e=>(e=>{if(""===e)_(w);else{let t=wp.data.select("core").getEntityRecords("postType","post",{per_page:5,search:e});if(null!=t&&0<t.length){let e=i(t,(e=>{let{title:{raw:t},id:l}=e;return{label:t,value:l}}));_(e)}}})(e)}),(0,t.createElement)(o.ToggleControl,{label:(0,a.__)("Featured Image Position","astro-gutenberg-block"),help:b?"Toggle to align image on right side":"Toggle to align image on left side",checked:b,onChange:()=>{c({ImageOnLeft:!b})}}),(0,t.createElement)(o.ToggleControl,{label:(0,a.__)("Disable Excerpt","astro-gutenberg-block"),help:d?"Toggle to enable excerpt":"Toggle to disable excerpt",checked:d,onChange:()=>{c({DisableExcerpt:!d})}}),(0,t.createElement)(o.ToggleControl,{label:(0,a.__)("Disable Date","astro-gutenberg-block"),help:u?"Toggle to enable date":"Toggle to disable date",checked:u,onChange:()=>{c({DisableDate:!u})}}))),0!=p?(0,t.createElement)(n.ServerSideRender,{block:"create-block/single-post-block",attributes:g}):(0,t.createElement)("div",f," Please Select Post from Panel. "))},save:()=>null})}},l={};function o(e){var a=l[e];if(void 0!==a)return a.exports;var r=l[e]={exports:{}};return t[e](r,r.exports,o),r.exports}o.m=t,e=[],o.O=(t,l,a,r)=>{if(!l){var n=1/0;for(c=0;c<e.length;c++){for(var[l,a,r]=e[c],s=!0,i=0;i<l.length;i++)(!1&r||n>=r)&&Object.keys(o.O).every((e=>o.O[e](l[i])))?l.splice(i--,1):(s=!1,r<n&&(n=r));if(s){e.splice(c--,1);var g=a();void 0!==g&&(t=g)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[l,a,r]},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={10:0,207:0};o.O.j=t=>0===e[t];var t=(t,l)=>{var a,r,[n,s,i]=l,g=0;if(n.some((t=>0!==e[t]))){for(a in s)o.o(s,a)&&(o.m[a]=s[a]);if(i)var c=i(o)}for(t&&t(l);g<n.length;g++)r=n[g],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(c)},l=globalThis.webpackChunkastro_gutenberg_block=globalThis.webpackChunkastro_gutenberg_block||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var a=o.O(void 0,[207],(()=>o(897)));a=o.O(a)})();