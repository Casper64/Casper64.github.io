!function(t){var e={};function i(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(r,s,function(e){return t[e]}.bind(null,s));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=4)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Point=class{constructor(t,e){this.x=t,this.y=e}get coord(){return`${this.x}:${this.y}`}get length(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}equals(t){return this.x==t.x&&this.y==t.y}},e.h=["manhattan","octile","eucledian","chebyshev"]},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Graph=class{constructor(t,e,i,r=1){this.x=t,this.y=e,this.coord=`${t}:${e}`,this.solid=i,this.movementCost=r}}},function(t,e,i){"use strict";function r(t){for(var i in t)e.hasOwnProperty(i)||(e[i]=t[i])}Object.defineProperty(e,"__esModule",{value:!0}),r(i(5)),r(i(1)),r(i(0)),r(i(6)),r(i(7)),r(i(8)),r(i(9)),r(i(3))},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=i(0);e.Mesh=class{constructor(t,e="mesh"){this.vertices=t,this.type=e}get sidePoints(){let t=[];for(let e=1;e<this.vertices.length;e++){let i=new r.Point((this.vertices[e-1].x+this.vertices[e].x)/2,(this.vertices[e-1].y+this.vertices[e].y)/2);t.push(i)}return t.push(new r.Point((this.vertices[0].x+this.vertices[this.vertices.length-1].x)/2,(this.vertices[0].y+this.vertices[this.vertices.length-1].y)/2)),t}get boundingBox(){let t=this.vertices.map(t=>t.x),e=this.vertices.map(t=>t.y);return[new r.Point(Math.min(...t),Math.min(...e)),new r.Point(Math.max(...t),Math.max(...e))]}get edges(){let t=[];for(let e=0;e<this.vertices.length-1;e++)t.push([this.vertices[e],this.vertices[e+1]]);return t.push([this.vertices[0],this.vertices[this.vertices.length-1]]),t}toPath(){let t=`M${this.vertices[0].x},${this.vertices[0].y}`;for(let e=1;e<this.vertices.length;e++)t+=`L${this.vertices[e].x},${this.vertices[e].y}`;return t+="Z",t}inside(t){const e=(t,e,i)=>e.x<=Math.max(t.x,i.x)&&e.x>=Math.min(t.x,i.x)&&e.y<=Math.max(t.y,i.y)&&e.y>=Math.min(t.y,i.y),i=(t,e,i)=>{let r=(e.y-t.y)*(i.x-e.x)-(e.x-t.x)*(i.y-e.y);return 0==r?0:r>0?1:2},s=(t,r,s,o)=>{let n=i(t,r,s),h=i(t,r,o),c=i(s,o,t),a=i(s,r,r);return n!=h&&c!=a||(!(0!=n||!e(t,s,r))||(!(0!=h||!e(t,o,r))||(!(0!=c||!e(s,t,o))||!(0!=a||!e(s,r,o)))))};let o=new r.Point(1/0,t.y),n=0,h=0,c=this.vertices.length;do{let r=(h+1)%c;if(s(this.vertices[h],this.vertices[r],t,o)){if(0==i(this.vertices[h],t,this.vertices[r]))return e(this.vertices[h],t,this.vertices[r]);n++}h=r}while(0!=h);return n%2==1}containTwo(t){let e=[];e.push(...t),e.push(...this.vertices);let i=new Set(e);return e.length-i.size==2}}},function(t,e,i){"use strict";var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s=r(i(2)),o=i(2),n=Raphael("grid-container",2*window.innerWidth,2*window.innerHeight),h=[new o.Point(50,100),new o.Point(700,50),new o.Point(1100,700),new o.Point(100,800)],c=new s.Mesh(h);n.path(c.toPath()).attr({fill:"#d8d8c8",stroke:"#938181","stroke-width":3});for(var a=[],l=function(t){var e=[new o.Point(150,150),new o.Point(250,150),new o.Point(250,250),new o.Point(150,250)];1==t?e=[new o.Point(200,150),new o.Point(250,150),new o.Point(250,250),new o.Point(200,250)]:4==t?e=[new o.Point(100,150),new o.Point(200,200),new o.Point(300,150),new o.Point(250,250),new o.Point(150,250)]:7==t&&(e=[new o.Point(150,150),new o.Point(200,150),new o.Point(200,250),new o.Point(150,250)]);var i=t%3*200,r=200*Math.floor(t/3);e.forEach((function(t){t.x+=i,t.y+=r}));var s=new o.Mesh(e);a.push(s),n.path(s.toPath()).attr({fill:"white",stroke:"#938181","stroke-width":3})},u=0;u<9;u++)l(u);var d=performance.now(),p=new s.MeshGrid(a,h),y=p.generateMap(),x=performance.now();console.log("Generating the map too "+(x-d)+"ms"),y.triangulation.forEach((function(t,e){n.path(t.toPath()).attr({stroke:"blue","stroke-width":1})})),y.points.forEach((function(t){return n.circle(t.x,t.y,3).attr({fill:"red",stroke:"black"})}));var g=new s.AStar,f=new o.Point(100,300),v=new o.Point(740,490),w=g.findPathMesh(f,v,p),m="M";w.path.forEach((function(t){m+=t.x+" "+t.y+"L"}));var P=n.circle(f.x,f.y,8).attr({fill:"green",stroke:"black"}),b=n.circle(v.x,v.y,8).attr({fill:"red",stroke:"black"}),M=n.path(m).attr({stroke:"purple","stroke-width":3});window.addEventListener("click",(function(t){if(M.remove(),0==t.button){P.remove(),f=new o.Point(t.pageX,t.pageY);var e=g.findPathMesh(f,v,p),i="M";e.path.forEach((function(t){i+=t.x+" "+t.y+"L"})),P=n.circle(f.x,f.y,8).attr({fill:"green",stroke:"black"}),M=n.path(i).attr({stroke:"purple","stroke-width":3})}})),document.addEventListener("contextmenu",(function(t){M.remove(),t.preventDefault(),b.remove(),v=new o.Point(t.pageX,t.pageY);var e=g.findPathMesh(f,v,p),i="M";e.path.forEach((function(t){i+=t.x+" "+t.y+"L"})),b=n.circle(v.x,v.y,8).attr({fill:"red",stroke:"black"}),M=n.path(i).attr({stroke:"purple","stroke-width":3})}))},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=i(1);e.Grid=class{constructor(t,e){this.matrix=[],this.map=[],this.width=t,this.height=e,this.matrix=new Array(e).fill(new Array(t).fill(0)),this.fill(this.matrix)}get(t,e){return this.map[e][t]}set(t,e,i){this.map[e][t]=i}setSolid(t,e,i){this.matrix[e][t]=Number(i),this.map[e][t].solid=i}fill(t){let e=0==this.map.length;for(let i=0;i<t.length;i++){e?this.map.push([]):this.map[i].length=0;for(let e=0;e<t[i].length;e++){let s=new r.Graph(e,i,Boolean(t[i][e]));this.map[i].push(s)}}}random(t=.7){return this.matrix.forEach((e,i)=>{e.forEach((e,r)=>{let s=Number(Math.random()>t);s?this.setSolid(r,i,!0):this.setSolid(r,i,!1),this.matrix[i][r]=s})}),this.matrix}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=i(0);e.AStar=class{constructor(t={}){this.diagonalCost=1,this.diagonal=t.diagonal||!1,this.heuristic=t.heuristic||"manhattan",this.passDiagonal=t.passDiagonal||!1,this.bidirectional=t.bidirectional||!1,t.smoothenPath&&(this.diagonalCost=Math.SQRT2)}findPath(t,e,i){if(this.bidirectional)return this.findPathbs(t,e,i);let r=i.get(t.x,t.y),s=[r],o=[],n={},h={},c={},a=[],l=`${t.x}:${t.y}`,u=`${e.x}:${e.y}`;for(n[l]=0,h[l]=0;s.length>0;){if(o.push(r),r=s.pop(),r.coord===u){let e=[],n=[];for(;r.coord!=l;)e.push({x:r.x,y:r.y}),n.push(r),r=c[r.coord];e.push({x:t.x,y:t.y}),n.push(i.get(t.x,t.y)),e.reverse(),n.reverse();let h=e.length;return{path:e,nodes:n,open:s,closed:o,length:h}}a=this.getNeighbours(r,u,i),a.forEach((t,i)=>{let o=t[0],a=h[r.coord]+o.movementCost+(t[1]>3?this.diagonalCost-1:0);if(void 0===h[o.coord]||a<h[o.coord]){let t=this.hvalue(e,o);h[o.coord]=a,n[o.coord]=a+t,c[o.coord]=r,s.insertSorted(o,(t,e)=>n[e.coord]-n[t.coord])}})}return{path:[],nodes:[],open:s,closed:o,length:0}}findPathMesh(t,e,i){this.heuristic="octile";let s=Object.keys(i.map).map(t=>i.map[t].node).sort((e,i)=>this.hvalue(t,e)-this.hvalue(t,i))[0],o=Object.keys(i.map).map(t=>i.map[t].node).sort((t,i)=>this.hvalue(e,t)-this.hvalue(e,i))[0],n=i.map[s.coord].node,h=[n],c=[],a={},l={},u={},d=[];for(a[s.coord]=0,l[s.coord]=0;h.length>0;){if(c.push(n),n=h.pop(),n.coord===o.coord){let a=[];for(;n.coord!=s.coord;)a.push(n),n=u[n.coord];for(let t=0;t<a.length;t++){n=new r.Point(a[t].x,a[t].y);let e=!1;i.meshes.forEach(t=>{t.vertices.forEach(t=>{n.equals(t)&&(e=!0)})}),e||(a.splice(t,1),t--)}a.push(s,t),a.reverse(),a.push(o,e);let l=a.length;return{path:a,open:h,closed:c,length:l}}d=i.get(n).neighbours,d.forEach(t=>{let e=l[n.coord]+t.movementCost;if(void 0===l[t.coord]||e<l[t.coord]){let i=this.hvalue(o,t);l[t.coord]=e,a[t.coord]=e+i,u[t.coord]=n,h.insertSorted(t,(t,e)=>a[e.coord]-a[t.coord])}})}return{path:[],nodes:[],open:h,closed:c,length:0}}findPathbs(t,e,i){let r=[i.get(t.x,t.y),i.get(e.x,e.y)],s=[[],[]],o=[],n=[{},{}],h=[{},{}],c=[{},{}],a=`${t.x}:${t.y}`,l=`${e.x}:${e.y}`,u=[[],[]];for(n[0][a]=0,n[1][l]=0,h[0][a]=0,h[1][l]=0,s=[[i.get(t.x,t.y)],[i.get(e.x,e.y)]];s[0].length>0&&s[1].length>0;){if(o.push(r[0],r[1]),r=[s[0].pop(),s[1].pop()],void 0!==c[0][r[1].coord]||void 0!==c[1][r[0].coord]){let t=Number(void 0!==c[0][r[1].coord]),e=[],n=[],h={x:r[t].x,y:r[t].y};for(;r[t];)e.push({x:r[t].x,y:r[t].y}),r[t]=c[1-t][r[t].coord];for(r[1-t]=i.get(h.x,h.y);r[1-t];)n.push({x:r[1-t].x,y:r[1-t].y}),r[1-t]=c[t][r[1-t].coord];e.reverse(),e.pop(),e.push(...n);let a=[];return a.push(...s[0]),a.push(...s[1]),{path:e,nodes:[],open:a,closed:o,length:0}}u=[this.getNeighbours(r[0],l,i),this.getNeighbours(r[1],a,i)],u.forEach((t,e)=>{t.forEach(t=>{let i=t[0],o=h[e][r[e].coord]+i.movementCost+(t[1]>3?this.diagonalCost-1:0);if(void 0===h[e][i.coord]||o<h[e][i.coord]){let t=this.hvalue(r[1-e],i);h[e][i.coord]=o,n[e][i.coord]=o+t+h[1-e][r[1-e].coord],c[e][i.coord]=r[e],s[e].insertSorted(i,(t,i)=>n[e][i.coord]-n[e][t.coord])}})})}let d=[];return d.push(...s[0]),d.push(...s[1]),{path:[],nodes:[],open:d,closed:o,length:0}}hvalue(t,e){let i=0;if("octile"==this.heuristic){let r=1,s=Math.SQRT2,o=Math.abs(e.x-t.x),n=Math.abs(e.y-t.y);i=r*(o+n)+(s-2*r)*Math.min(o,n)}else if("eucledian"==this.heuristic){let r=1,s=Math.abs(e.x-t.x),o=Math.abs(e.y-t.y);i=r*Math.sqrt(s*s+o*o)}else if("chebyshev"==this.heuristic){let r=1,s=1,o=Math.abs(e.x-t.x),n=Math.abs(e.y-t.y);i=r*(o+n)+(s-2*r)*Math.min(o,n)}else i=Math.abs(t.x-e.x)+Math.abs(t.y-e.y);return i}getNeighbours(t,e,i){let r=[],s=[[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];for(let o=0;o<(this.diagonal?8:4);o++){if(t.x+s[o][0]>i.width-1||t.x+s[o][0]<0)continue;if(t.y+s[o][1]>i.height-1||t.y+s[o][1]<0)continue;if(!this.passDiagonal&&o>3&&i.get(t.x+s[o][0],t.y).solid&&i.get(t.x,t.y+s[o][1]).solid)continue;let n=i.get(t.x+s[o][0],t.y+s[o][1]);n.solid&&n.coord!==e||r.push([n,o])}return r}},Array.prototype.insertSorted=function(t,e){if(this.length<1||e(t,this[this.length-1])>=0)return this.push(t),this;for(var i=this.length-2;i>=0;i--)if(e(t,this[i])>=0)return this.splice(i+1,0,t),this;return this.splice(0,0,t),this}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.BFS=class{constructor(t={}){this.diagonal=t.diagonal||!1,this.heuristic=t.heuristic||"manhattan",this.passDiagonal=t.passDiagonal||!1,this.bidirectional=t.bidirectional||!1}findPath(t,e,i){if(this.bidirectional)return this.findPathbs(t,e,i);let r=i.get(t.x,t.y),s=[r],o=[],n={},h={},c=[],a=`${t.x}:${t.y}`,l=`${e.x}:${e.y}`;for(h[a]=0;s.length>0;){if(o.push(r),r=s.pop(),r.coord===l){let e=[],h=[];for(;r.coord!=a;)e.push({x:r.x,y:r.y}),h.push(r),r=n[r.coord];e.push({x:t.x,y:t.y}),h.push(i.get(t.x,t.y)),e.reverse(),h.reverse();let c=e.length;return{path:e,nodes:h,open:s,closed:o,length:c}}c=this.getNeighbours(r,l,i),c.forEach((t,i)=>{let o=t[0],c=this.hvalue(e,o);(void 0===h[o.coord]||c<h[o.coord])&&(h[o.coord]=c,n[o.coord]=r,s.insertSorted(o,(t,e)=>h[e.coord]-h[t.coord]))})}return{path:[],nodes:[],open:s,closed:o,length:0}}findPathbs(t,e,i){let r=[i.get(t.x,t.y),i.get(e.x,e.y)],s=[[],[]],o=[],n=[{},{}],h=[{},{}],c=[[],[]],a=`${t.x}:${t.y}`,l=`${e.x}:${e.y}`;for(n[0][a]=0,n[1][l]=0,s=[[i.get(t.x,t.y)],[i.get(e.x,e.y)]];s[0].length>0&&s[1].length>0;){if(o.push(r[0],r[1]),r=[s[0].pop(),s[1].pop()],void 0!==h[0][r[1].coord]||void 0!==h[1][r[0].coord]){let t=Number(void 0!==h[0][r[1].coord]),e=[],n=[],c={x:r[t].x,y:r[t].y};for(;r[t];)e.push({x:r[t].x,y:r[t].y}),r[t]=h[1-t][r[t].coord];for(r[1-t]=i.get(c.x,c.y);r[1-t];)n.push({x:r[1-t].x,y:r[1-t].y}),r[1-t]=h[t][r[1-t].coord];e.reverse(),e.push(...n);let a=[];return a.push(...s[0]),a.push(...s[1]),{path:e,nodes:[],open:a,closed:o,length:0}}c=[this.getNeighbours(r[0],l,i),this.getNeighbours(r[1],a,i)],c.forEach((i,o)=>{i.forEach(i=>{let c=i[0],a=this.hvalue(0==o?e:t,c);(void 0===n[o][c.coord]||a<n[o][c.coord])&&(n[o][c.coord]=a,h[o][c.coord]=r[o],s[o].insertSorted(c,(t,e)=>n[o][e.coord]-n[o][t.coord]))})})}let u=[];return u.push(...s[0]),u.push(...s[1]),{path:[],nodes:[],open:u,closed:o,length:0}}hvalue(t,e){let i=0;if("octile"==this.heuristic){let r=1,s=Math.SQRT2,o=Math.abs(e.x-t.x),n=Math.abs(e.y-t.y);i=r*(o+n)+(s-2*r)*Math.min(o,n)}else if("eucledian"==this.heuristic){let r=1,s=Math.abs(e.x-t.x),o=Math.abs(e.y-t.y);i=r*Math.sqrt(s*s+o*o)}else if("chebyshev"==this.heuristic){let r=1,s=1,o=Math.abs(e.x-t.x),n=Math.abs(e.y-t.y);i=r*(o+n)+(s-2*r)*Math.min(o,n)}else i=Math.abs(t.x-e.x)+Math.abs(t.y-e.y);return i}getNeighbours(t,e,i){let r=[],s=[[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];for(let o=0;o<(this.diagonal?8:4);o++){if(t.x+s[o][0]>i.width-1||t.x+s[o][0]<0)continue;if(t.y+s[o][1]>i.height-1||t.y+s[o][1]<0)continue;if(!this.passDiagonal&&o>3&&i.get(t.x+s[o][0],t.y).solid&&i.get(t.x,t.y+s[o][1]).solid)continue;let n=i.get(t.x+s[o][0],t.y+s[o][1]);n.solid&&n.coord!==e||r.push([n,o])}return r}},Array.prototype.insertSorted=function(t,e){if(this.length<1||e(t,this[this.length-1])>=0)return this.push(t),this;for(var i=this.length-2;i>=0;i--)if(e(t,this[i])>=0)return this.splice(i+1,0,t),this;return this.splice(0,0,t),this}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Dijkstra=class{constructor(t={}){this.diagonalCost=1,this.diagonal=t.diagonal||!1,this.passDiagonal=t.passDiagonal||!1,t.smoothenPath&&(this.diagonalCost=Math.SQRT2),this.bidirectional=t.bidirectional||!1}findPath(t,e,i){if(this.bidirectional)return this.findPathbs(t,e,i);let r=i.get(t.x,t.y),s=[r],o=[],n={},h={},c=[],a=`${t.x}:${t.y}`,l=`${e.x}:${e.y}`;for(h[a]=0;s.length>0;){if(o.push(r),r=s.pop(),r.coord===l){let e=[],h=[];for(;r.coord!=a;)e.push({x:r.x,y:r.y}),h.push(r),r=n[r.coord];e.push({x:t.x,y:t.y}),h.push(i.get(t.x,t.y)),e.reverse(),h.reverse();let c=e.length;return{path:e,nodes:h,open:s,closed:o,length:c}}c=this.getNeighbours(r,l,i),c.forEach(t=>{let e=t[0],i=h[r.coord]+e.movementCost+(t[1]>3?this.diagonalCost-1:0);(void 0===h[e.coord]||i<h[e.coord])&&(h[e.coord]=i,n[e.coord]=r,s.insertSorted(e,(t,e)=>h[e.coord]-h[t.coord]))})}return{path:[],nodes:[],open:s,closed:o,length:0}}findPathbs(t,e,i){let r=[i.get(t.x,t.y),i.get(e.x,e.y)],s=[[],[]],o=[],n=[{},{}],h=[{},{}],c=[[],[]],a=`${t.x}:${t.y}`,l=`${e.x}:${e.y}`;for(n[0][a]=0,n[1][l]=0,s=[[i.get(t.x,t.y)],[i.get(e.x,e.y)]];s[0].length>0&&s[1].length>0;){if(o.push(r[0],r[1]),r=[s[0].pop(),s[1].pop()],void 0!==h[0][r[1].coord]||void 0!==h[1][r[0].coord]){let t=Number(void 0!==h[0][r[1].coord]),e=[],n=[],c={x:r[t].x,y:r[t].y};for(;r[t];)e.push({x:r[t].x,y:r[t].y}),r[t]=h[1-t][r[t].coord];for(r[1-t]=i.get(c.x,c.y);r[1-t];)n.push({x:r[1-t].x,y:r[1-t].y}),r[1-t]=h[t][r[1-t].coord];e.reverse(),e.push(...n);let a=[];return a.push(...s[0]),a.push(...s[1]),{path:e,nodes:[],open:a,closed:o,length:0}}c=[this.getNeighbours(r[0],l,i),this.getNeighbours(r[1],a,i)],c.forEach((t,e)=>{t.forEach(t=>{let i=t[0],o=n[e][r[e].coord]+i.movementCost+(t[1]>3?this.diagonalCost-1:0);(void 0===n[e][i.coord]||o<n[e][i.coord])&&(n[e][i.coord]=o,h[e][i.coord]=r[e],s[e].insertSorted(i,(t,i)=>n[e][i.coord]-n[e][t.coord]))})})}let u=[];return u.push(...s[0]),u.push(...s[1]),{path:[],nodes:[],open:u,closed:o,length:0}}getNeighbours(t,e,i){let r=[],s=[[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];for(let o=0;o<(this.diagonal?8:4);o++){if(t.x+s[o][0]>i.width-1||t.x+s[o][0]<0)continue;if(t.y+s[o][1]>i.height-1||t.y+s[o][1]<0)continue;if(!this.passDiagonal&&o>3&&i.get(t.x+s[o][0],t.y).solid&&i.get(t.x,t.y+s[o][1]).solid)continue;let n=i.get(t.x+s[o][0],t.y+s[o][1]);n.solid&&n.coord!==e||r.push([n,o])}return r}},Array.prototype.insertSorted=function(t,e){if(this.length<1||e(t,this[this.length-1])>=0)return this.push(t),this;for(var i=this.length-2;i>=0;i--)if(e(t,this[i])>=0)return this.splice(i+1,0,t),this;return this.splice(0,0,t),this}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=i(3),s=i(0),o=i(1);e.MeshGrid=class{constructor(t,e){this.map={},this.meshes=t,this.convexHull=e}get(t){return this.map[t.coord]}generateMap(){this.map={};let t=[];this.meshes.forEach(e=>{t.push(...e.vertices),t.push(...e.sidePoints)});let e=this.BowyerWatson(t);t:for(let t=0;t<e.length;t++){let i=e[t];for(let r=0;r<this.meshes.length;r++){let s=!0;for(let t=0;t<3;t++){let e=i.vertices[t],o=!1,n=[];n.push(...this.meshes[r].vertices),n.push(...this.meshes[r].sidePoints),n.forEach((t,i)=>{e.x==t.x&&e.y==t.y&&(o=!0)}),0==o&&(s=!1)}if(s){e.splice(t,1),t--;continue t}}}e.forEach(t=>{t.vertices.forEach(e=>{let i=[],r=t.sidePoints.sort((t,i)=>new s.Point(t.x-e.x,t.y-e.y).length-new s.Point(i.x-e.x,i.y-e.y).length);i.push(new o.Graph(r[0].x,r[0].y,!1,new s.Point(r[0].x-e.x,r[0].y-e.y).length)),i.push(new o.Graph(r[1].x,r[1].y,!1,new s.Point(r[1].x-e.x,r[1].y-e.y).length)),i.push(new o.Graph(r[2].x,r[2].y,!1,new s.Point(r[2].x-e.x,r[2].y-e.y).length));let n=t.vertices.sort((t,i)=>new s.Point(t.x-e.x,t.y-e.y).length-new s.Point(i.x-e.x,i.y-e.y).length);i.push(new o.Graph(n[0].x,n[0].y,!1,new s.Point(n[0].x-e.x,n[0].y-e.y).length)),i.push(new o.Graph(n[1].x,n[1].y,!1,new s.Point(n[1].x-e.x,n[1].y-e.y).length)),i.push(new o.Graph(n[2].x,n[2].y,!1,new s.Point(n[2].x-e.x,n[2].y-e.y).length)),void 0===this.map[e.coord]?this.map[e.coord]={node:e,neighbours:[...i]}:this.map[e.coord].neighbours.push(...i)}),t.sidePoints.forEach(e=>{let i=[],r=t.vertices.sort((t,i)=>new s.Point(t.x-e.x,t.y-e.y).length-new s.Point(i.x-e.x,i.y-e.y).length);i.push(new o.Graph(r[0].x,r[0].y,!1,new s.Point(r[0].x-e.x,r[0].y-e.y).length)),i.push(new o.Graph(r[1].x,r[1].y,!1,new s.Point(r[1].x-e.x,r[1].y-e.y).length)),i.push(new o.Graph(r[2].x,r[2].y,!1,new s.Point(r[2].x-e.x,r[2].y-e.y).length));let n=t.sidePoints.sort((t,i)=>new s.Point(t.x-e.x,t.y-e.y).length-new s.Point(i.x-e.x,i.y-e.y).length);i.push(new o.Graph(n[0].x,n[0].y,!1,new s.Point(n[0].x-e.x,n[0].y-e.y).length)),i.push(new o.Graph(n[1].x,n[1].y,!1,new s.Point(n[1].x-e.x,n[1].y-e.y).length)),i.push(new o.Graph(n[2].x,n[2].y,!1,new s.Point(n[2].x-e.x,n[2].y-e.y).length)),void 0===this.map[e.coord]?this.map[e.coord]={node:e,neighbours:[...i]}:this.map[e.coord].neighbours.push(...i)})}),Object.keys(this.map).forEach(t=>{let e=[];this.map[t].neighbours=this.map[t].neighbours.filter(t=>{for(let i=0;i<e.length;i++)if(e[i]===t.coord)return!1;return e.push(t.coord),!0})}),e.forEach(e=>{t.push(...e.sidePoints)});let i=[];return t=t.filter(t=>{for(let e=0;e<i.length;e++)if(i[e].x==t.x&&i[e].y==t.y)return!1;return i.push(t),!0}),{triangulation:e,points:t}}BowyerWatson(t){let e=[],i=this.smallestTriangle;e.push(i),t.forEach((t,i)=>{let r=[];e.forEach(e=>{e.insideCircumcircle(t)&&r.push(e)});let s=[];r.forEach((t,e)=>{t.edges.forEach(t=>{for(let i=0;i<r.length;i++)if(i!=e&&r[i].containsEdge(t))return;s.push(t)})});for(let t=0;t<r.length;t++){let i=r[t];for(let t=0;t<e.length;t++){e[t].equals(i)&&(e.splice(t,1),t--)}}s.forEach(i=>{let r=new n([t,i[0],i[1]]);e.push(r)})});let r=i.vertices[0],s=i.vertices[1],o=i.vertices[2];for(let t=0;t<e.length;t++){let i=e[t];for(let n=0;n<3;n++){let h=i.vertices[n];if(h.x==r.x&&h.y==r.y||h.x==s.x&&h.y==s.y||h.x==o.x&&h.y==o.y){e.splice(t,1),t--;break}}}return e}get smallestTriangle(){let t=[];t.push(...this.convexHull);let e=t.sort((t,e)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)))[0],i=t.sort((t,e)=>t.y-e.y)[0],r=t.sort((t,e)=>e.y-t.y)[0],o=t.sort((t,e)=>e.x-t.x)[0],h=new s.Point(e.x,i.y),c=new s.Point(2*o.x,i.y),a=new s.Point(h.x,2*r.y);return new n([h,c,a])}};class n extends r.Mesh{constructor(t){if(3!=t.length)throw new Error("Triangle with not 3 vertices was created!");super(t,"triangle")}join(t){let e=l(t.edges[0][0],t.edges[0][1])==l(this.edges[0][0],this.edges[0][1]);if(!e)return{valid:e,newShape:null};let i=[];i.push(...t.vertices),i.push(...this.vertices);let s=new Set(i);return{valid:e,newShape:new r.Mesh(Array.from(s))}}equals(t){let e=!1;return this.vertices.sort((t,e)=>t.length-e.length),t.vertices.sort((t,e)=>t.length-e.length),this.vertices[0].x==t.vertices[0].x&&this.vertices[0].y==t.vertices[0].y&&this.vertices[1].x==t.vertices[1].x&&this.vertices[1].y==t.vertices[1].y&&this.vertices[2].x==t.vertices[2].x&&this.vertices[2].y==t.vertices[2].y&&(e=!0),e}get edges(){let t=[[this.vertices[0],this.vertices[1]].sort((t,e)=>t.length-e.length),[this.vertices[1],this.vertices[2]].sort((t,e)=>t.length-e.length),[this.vertices[2],this.vertices[0]].sort((t,e)=>t.length-e.length)];return t.sort((t,e)=>l(t[0],t[1])-l(e[0],e[1])),t.reverse(),t}get sidePoints(){let t=[];return t.push(new s.Point((this.vertices[0].x+this.vertices[1].x)/2,(this.vertices[0].y+this.vertices[1].y)/2)),t.push(new s.Point((this.vertices[1].x+this.vertices[2].x)/2,(this.vertices[1].y+this.vertices[2].y)/2)),t.push(new s.Point((this.vertices[0].x+this.vertices[2].x)/2,(this.vertices[0].y+this.vertices[2].y)/2)),t}get boundingBox(){let t=this.vertices.map(t=>t.x),e=this.vertices.map(t=>t.y);return[new s.Point(Math.min(...t),Math.min(...e)),new s.Point(Math.max(...t),Math.max(...e))]}containsEdge(t){let e=this.edges,i=!1;return e.forEach(e=>{e[0].x==t[0].x&&e[0].y==t[0].y&&e[1].x==t[1].x&&e[1].y==t[1].y&&(i=!0)}),i}get circumcircle(){let t=this.vertices[0],e=this.vertices[1],i=this.vertices[2],{a:r,b:s,c:o}=h(t,e),{a:n,b:l,c:u}=h(e,i),{a:d,b:p,c:y}=c(t,e,r,s,o),{a:x,b:g,c:f}=c(e,i,n,l,u),v=a(d,p,y,x,g,f);return{center:v,radius:Math.sqrt(Math.pow(t.x-v.x,2)+Math.pow(t.y-v.y,2))}}insideCircumcircle(t){const{center:e,radius:i}=this.circumcircle;return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))<=i}}function h(t,e){let i=e.y-t.y,r=t.x-e.x;return{a:i,b:r,c:i*t.x+r*t.y}}function c(t,e,i,r,o){let n=new s.Point((t.x+e.x)/2,(t.y+e.y)/2);o=-r*n.x+i*n.y;let h=i;return{a:i=-r,b:r=h,c:o}}function a(t,e,i,r,o,n){let h=t*o-r*e;return 0==h?new s.Point(-1,-1):new s.Point((o*i-e*n)/h,(t*n-r*i)/h)}function l(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}e.Triangle=n,e.lineFromPoints=h,e.ppBisector=c,e.lineLineIntersection=a,e.lineLength=l}]);