"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[867],{4867:(e,t,r)=>{r.r(t),r.d(t,{default:()=>G});var i=r(5155),o=r(2115),a=r(5860),n=r(6275);let l={high:{dpr:1.65,particles:64,segments:24,targetScale:1,noise:2},medium:{dpr:1.2,particles:22,segments:10,targetScale:.8,noise:1},low:{dpr:1,particles:0,segments:1,targetScale:0,noise:0}},s=["low","medium","high"];class u{constructor(e,t){this.level=e,this.ceiling=t,this.count=0,this.total=0,this.slow=0,this.fast=0,this.warmup=30}sample(e){if(e<=0||e>.2)return this.reset(),this.level;if(this.warmup-- >0||(this.total+=e,++this.count<90))return this.level;let t=this.total/this.count;this.count=this.total=0,this.slow=t>1/44?this.slow+1:0,this.fast=t<1/57?this.fast+1:0;let r=s.indexOf(this.level);if(this.slow>=2&&r>0)r--;else{if(!(this.fast>=5&&r<s.indexOf(this.ceiling)))return this.level;r++}return this.level=s[r],this.reset(),this.level}reset(){this.count=this.total=this.slow=this.fast=0,this.warmup=30}}let c=(e,t,r)=>{let i=Math.max(0,Math.min(1,(r-e)/(t-e)));return i*i*(3-2*i)},h=[{from:.125,to:.205,center:[.7,.47],approach:.62,mode:"shader"},{from:.255,to:.375,center:[.51,.5],approach:.32,mode:"physical"},{from:.49,to:.57,center:[.62,.48],approach:.28,mode:"shader"},{from:.66,to:.745,center:[.72,.54],approach:.25,mode:"physical"},{from:.825,to:.91,center:[.65,.48],approach:.35,mode:"shader"}];function d(e){return h.find(({from:t,to:r})=>e>=t&&e<=r)}function f(e,t){let{from:r,to:i,approach:o}=t;return{progress:Math.max(0,Math.min(1,(e-r)/(i-r))),outgoing:r+(e-r)*o,incoming:i-(i-e)*.45}}function v(e){let t=d(e);return t?1-Math.sin(f(e,t).progress*Math.PI):1}var p=r(3696);let m=new Set;function g(e){m.forEach(t=>t(e))}function x(e){let t=(0,o.useRef)(e);(0,o.useLayoutEffect)(()=>{t.current=e}),(0,o.useLayoutEffect)(()=>{let e=e=>t.current(e);return m.add(e),e(p.t5.progress),p.t5.invalidate?.(),()=>{m.delete(e)}},[])}var w=r(6383),y=r(5269),b=r(8750);let M={gateway:["#ac9273","#d1b48a","#786650"],penjor:["#b88a4c","#e2c68d","#72805a"],foliage:["#60372a","#b18a51","#815641"],jepun:["#fff2da","#dfb456","#d3c2a7"]};function j({symbol:e,quality:t,scale:r,position:a,rotation:n,from:l,to:s}){let u=(0,o.useRef)(null),h=(0,o.useRef)([]),d=(0,o.useMemo)(()=>(function(e,t){let r="high"===t?24:"medium"===t?12:6,i="high"===t?8:"medium"===t?6:4,o=[[],[],[]],a=(e,t=0)=>{let r=e.index?e.toNonIndexed():e;r!==e&&e.dispose(),r.clearGroups(),o[t].push(r)},n=(e,t,r,i,o,n,l=0)=>a(new y.iNn(i,o,n).translate(e,t,r),l),l=(e,i,o=0,n=0)=>{a(new y.QCA(e,{depth:i,steps:1,curveSegments:r/2,bevelEnabled:"low"!==t,bevelSegments:"high"===t?2:1,bevelSize:.003,bevelThickness:.003}).translate(0,0,n-i/2),o)},s=(e,t,o=0)=>a(new y.j6(new y.B6O(e.map(e=>new y.Pq0(...e))),r,t,i,!1),o),u=(e,t,i,o,n,l,s=.04)=>{let u=new y.ypk;u.moveTo(0,0),u.bezierCurveTo(-o,.25*i,-(.55*o),.8*i,0,i),u.bezierCurveTo(.8*o,.72*i,.6*o,.2*i,0,0);let c=new y.QCA(u,{depth:.012,bevelEnabled:!1,curveSegments:r/2});c.rotateZ(n).translate(e,t,s),a(c,l)};if("gateway"===e)for(let e of[-1,1]){let t=new y.ypk;for(let[r,i]of([[.13,-.48],[.13,.5],[.2,.5],[.2,.39],[.27,.39],[.27,.24],[.34,.24],[.34,.08],[.42,.08],[.42,-.1],[.5,-.1],[.5,-.3],[.57,-.3],[.57,-.48]].forEach(([r,i],o)=>o?t.lineTo(r*e,i):t.moveTo(r*e,i)),t.closePath(),l(t,.15),n(.35*e,-.48,0,.49,.055,.22,2),[[-.31,.4],[-.11,.32],[.07,.24],[.23,.17],[.38,.1]]))for(let t of(n(e*(.13+i/2),r,0,i,.026,.2,1),[-.081,.081]))n(e*(.16+i/2),r+.06,t,Math.max(.025,i-.065),.058,.012,2);for(let t of[-.097,.097]){s([[.151*e,-.4,t],[.151*e,0,t],[.151*e,.45,t]],.007,1);for(let r=0;r<4;r++){let i=-.24+.17*r;u(e*(.41-.075*r),i,.11,.035,-.65*e,1,t)}}}else if("penjor"===e){let e=new y.s0K(new y.Pq0(-.42,-.5,0),new y.Pq0(-.65,.95,-.025),new y.Pq0(.38,.8,.025),new y.Pq0(.4,.08,0));a(new y.j6(e,2*r,.014,i,!1));for(let t=1;t<=10;t++){let r=t/12,o=e.getPoint(r),n=e.getTangent(r),l=new y.Ho_(.018,.018,.009,i);if(l.applyMatrix4(new y.kn4().compose(o,new y.PTz().setFromUnitVectors(new y.Pq0(0,1,0),n),new y.Pq0(1,1,1))),a(l,1),t>=4){let e=-Math.atan2(n.x,n.y);u(o.x,o.y,.105,.025,e-.75,1,.02),u(o.x,o.y,.085,.024,e+.8,2,.025)}}s([[.4,.08,0],[.4,-.05,.01],[.4,-.22,0]],.004,1);for(let e=0;e<4;e++){let t=-.02-.045*e;u(.4,t,.09,.025,-.9,1),u(.4,t,.09,.025,.9,1)}let t=new y.ypk;t.moveTo(.4,-.2),t.lineTo(.455,-.27),t.lineTo(.4,-.34),t.lineTo(.345,-.27),t.closePath(),l(t,.02,1);for(let e=-1;e<=1;e++)s([[.4+.018*e,-.33,0],[.4+.03*e,-.4,.01],[.4+.034*e,-.46,.02]],.003,0===e?2:1)}else if("foliage"===e){let e=new y.ypk;e.moveTo(0,.48),e.bezierCurveTo(-.32,.48,-.47,.18,-.43,-.15),e.bezierCurveTo(-.4,-.43,-.2,-.49,0,-.47),e.bezierCurveTo(.3,-.49,.46,-.25,.43,.05),e.bezierCurveTo(.42,.3,.24,.48,0,.48);let r=new y.wAk;for(let i of(r.absellipse(0,0,.255,.335,0,2*Math.PI,!0),e.holes.push(r),l(e,.075),[-1,1])){s([[.08*i,-.42,.054],[.34*i,-.25,.054],[.35*i,.1,.054],[.15*i,.38,.054],[0,.43,.054]],.009,1);for(let e=0;e<6;e++){let r=-1.16+e/5*2.4,o=i*Math.cos(r)*.34,a=.38*Math.sin(r);u(o,a,.18,.055,i*(-Math.PI/2+.9*r),e%2?0:2,.02),"low"!==t&&u(o,a,.1,.03,i*(-.5+r),1,.063)}}u(0,.37,.2,.07,0,0),u(0,-.37,.17,.065,Math.PI,0)}else{a(new y.Gu$(.064,2*i,i).scale(1,1,.35).translate(0,0,-.035),1);let e=Math.max(6,r/2);for(let t=0;t<5;t++){let i=[],o=[],n=[],l=t*Math.PI*2/5+.2;for(let t=0;t<=r;t++){let a=t/r,n=.045+.49*a,s=.008+.185*Math.pow(Math.sin(Math.PI*a),.8),u=l+.32*a;for(let t=0;t<=e;t++){let r=t/e*2-1,l=r*s;i.push(n*Math.cos(u)-l*Math.sin(u),n*Math.sin(u)+l*Math.cos(u),-.035+.095*Math.sin(a*Math.PI)+r*r*.045+r*a*.035),o.push(a,t/e)}}for(let t=0;t<r;t++)for(let r=0;r<e;r++){let i=t*(e+1)+r,o=i+e+1;n.push(i,o,i+1,o,o+1,i+1)}let s=new y.LoY;s.setAttribute("position",new y.qtW(i,3)),s.setAttribute("uv",new y.qtW(o,2)),s.setIndex(n),s.computeVertexNormals();let u=s.toNonIndexed();s.dispose();let c=u.clone(),h=u.clone();u.dispose();let d=Math.max(1,Math.floor(.2*r))*e*6;for(let[e,t,r,i]of[[c,0,d,1],[h,d,h.getAttribute("position").count,0]]){for(let i of["position","normal","uv"]){let o=e.getAttribute(i);e.setAttribute(i,new y.qtW(o.array.slice(t*o.itemSize,r*o.itemSize),o.itemSize))}e.setDrawRange(0,1/0),a(e,i)}}for(let e=0;e<5;e++){let t=e*Math.PI*2/5+.2;s([[.07*Math.cos(t),.07*Math.sin(t),-.04],[.25*Math.cos(t+.15),.25*Math.sin(t+.15),.015],[.43*Math.cos(t+.28),.43*Math.sin(t+.28),.015]],.0025,2)}}let c=o.map(e=>{let t=(0,b.pP)(e,!1);return e.forEach(e=>e.dispose()),t}),h=(0,b.pP)(c,!0);return c.forEach(e=>e.dispose()),h.computeBoundingBox(),h.computeBoundingSphere(),h})(e,t),[e,t]);return(0,o.useEffect)(()=>()=>d.dispose(),[d]),x(e=>{let t=c(l,l+.025,e)*(1-c(s-.025,s,e));u.current&&(u.current.visible=t>.001),h.current.forEach(e=>{e&&(e.opacity=t,e.depthWrite=t>.98)})}),(0,i.jsx)("group",{ref:u,name:`cultural-${e}`,position:a,rotation:n,scale:r,children:(0,i.jsxs)("mesh",{children:[(0,i.jsx)("primitive",{attach:"geometry",object:d}),M[e].map((t,r)=>(0,i.jsx)("meshStandardMaterial",{ref:e=>{h.current[r]=e},attach:`material-${r}`,color:t,roughness:"jepun"===e?.6:.86,metalness:.2*("foliage"===e&&1===r),side:y.$EB,transparent:!0},r))]})})}function S({mobile:e,quality:t}){return(0,i.jsx)(i.Fragment,{children:["gateway","penjor"].map(r=>(0,i.jsx)(j,{...(0,w.R)(r,e),quality:t},r))})}function T({quality:e}){let{scene:t,gl:r}=(0,a.D)(),n=(0,o.useRef)(null),l=(0,o.useRef)(null),s=(0,o.useMemo)(()=>({ivory:new y.Q1f("#f4ebdd"),heritage:new y.Q1f("#e0cab0"),evening:new y.Q1f("#e5d7c5"),current:new y.Q1f}),[]);return x(e=>{let i=c(.49,.59,e)*(1-c(.66,.77,e)),o=c(.66,.77,e)*(1-c(.83,.93,e));s.current.copy(s.ivory).lerp(s.heritage,i).lerp(s.evening,o),t.background=s.current,r.toneMappingExposure=1-.025*i,n.current&&(n.current.intensity=1.8-.12*o),l.current&&(l.current.intensity=2.4+.15*i)}),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("ambientLight",{ref:n,intensity:1.8}),(0,i.jsx)("directionalLight",{ref:l,position:[5,8,10],intensity:2.4,color:"#fff3df"}),"high"===e&&(0,i.jsx)("hemisphereLight",{args:["#fff8ed","#b66d4d",.3]})]})}function q({quality:e,ceiling:t,onQuality:r}){let{gl:i,invalidate:n}=(0,a.D)(),l=(0,o.useRef)(!0);(0,o.useRef)(0);let s=(0,o.useRef)(1/60),c=(0,o.useMemo)(()=>new u(t,t),[t]);return(0,o.useEffect)(()=>{let e=i.domElement,t=()=>{c.reset(),!document.hidden&&l.current&&n()},r=new IntersectionObserver(([e])=>{l.current=e.isIntersecting,t()});return r.observe(e),document.addEventListener("visibilitychange",t),()=>{r.disconnect(),document.removeEventListener("visibilitychange",t)}},[i,n,c]),(0,o.useEffect)(()=>{i.domElement.dataset.quality=e},[i,e]),(0,a.F)((t,i)=>{var o;if(document.hidden||!l.current)return void c.reset();p.t5.time+=Math.min(i,.05),i<.2&&(s.current+=(i-s.current)*.05);let a=c.sample(i);a!==e&&r(a),"low"!==e&&((o=p.t5.progress)<.54||o>.64)&&v(o)>.015&&n()},-2),(0,a.F)((e,t)=>{},2),null}function P(e,t,r,i,o){e.position.copy(t);let a=i&&o<1?51:43;e.fov!==a&&(e.fov=a,e.updateProjectionMatrix()),e.lookAt(r),e.updateMatrixWorld()}function E({mobile:e}){let[t,r]=(0,o.useMemo)(()=>[new y.Pq0,new y.Pq0],[]),i=(0,a.D)(e=>e.size);return(0,a.F)(({camera:o})=>{(0,p.c5)(p.t5.progress,t,r,e),P(o,t,r,e,i.width/i.height)},-1),null}var C=r(602),R=r(7601);let z=`
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise21(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),
             mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
`,F=`
varying vec2 vUv;
void main() { vUv=uv; gl_Position=vec4(position.xy,0.,1.); }
`,U=`
uniform sampler2D uFrom, uTo, uDepthFrom, uDepthTo;
uniform float uProgress, uAspect, uNear, uFar, uQuality, uScroll;
uniform vec2 uCenter;
varying vec2 vUv;
${z}
float viewDepth(float d) { return (uNear*uFar)/((uFar-uNear)*d-uFar); }
void main() {
  float p=clamp(uProgress,0.,1.);
  // The lens moves behind the ceramic/plate foreground. The reveal travels in space,
  // with closer geometry holding the edge longer, rather than a global crossfade.
  vec2 q=(vUv-uCenter)*vec2(uAspect,1.);
  float radius=length(q);
  float depthA=-viewDepth(texture2D(uDepthFrom,vUv).x);
  float depthB=-viewDepth(texture2D(uDepthTo,vUv).x);
  float foreground=(1.-smoothstep(2.,23.,depthA));
  float receiving=1.-smoothstep(3.,30.,depthB);
  float envelope=sin(p*3.14159265);
  float edgeNoise=(noise21(q*15.+uScroll*2.)-.5)*.012*uQuality;
  float maxRadius=length(vec2(max(uCenter.x,1.-uCenter.x)*uAspect,max(uCenter.y,1.-uCenter.y)));
  float field=radius+foreground*.14-receiving*.025+edgeNoise;
  float reach=mix(-.18,maxRadius+.22,p*p*(3.-2.*p));
  float reveal=1.-smoothstep(reach-.022,reach+.022,field);
  // Explicit endpoints are pixel-identical to each camera, including reverse scroll.
  reveal=p<.00001?0.:(p>.99999?1.:reveal);
  vec2 fromUv=uCenter+(vUv-uCenter)/(1.+.15*p*foreground);
  vec2 toUv=uCenter+(vUv-uCenter)/(1.+.035*(1.-p)*receiving);
  vec2 displacement=q*edgeNoise*.025*envelope;
  vec4 outgoing=texture2D(uFrom,clamp(fromUv+displacement,vec2(.001),vec2(.999)));
  vec4 incoming=texture2D(uTo,clamp(toUv-displacement,vec2(.001),vec2(.999)));
  // Preserve exact endpoints, including perspective scaling.
  if(p<.00001) outgoing=texture2D(uFrom,vUv);
  if(p>.99999) incoming=texture2D(uTo,vUv);
  vec4 color=mix(outgoing,incoming,reveal);
  color.rgb*=1.-.028*dot((vUv-.5),vUv-.5)*envelope;
  gl_FragColor=color;
  #include <colorspace_fragment>
}
`,D=`
uniform float uRelief;
varying vec2 vUv;
varying float vRelief;
void main() {
  vUv=uv;
  vec2 q=(uv-.5)*2.;
  vRelief=pow(max(0.,1.-dot(q,q)),2.);
  vec3 p=position; p.z+=vRelief*uRelief;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
}
`,k=`
uniform sampler2D photo;
uniform vec2 uCover;
uniform float rounded, visibility, uTime, uHeat, uQuality, uWarmth, uScroll, uScene, uTransition;
varying vec2 vUv;
varying float vRelief;
${z}
void main() {
  vec2 uv=(vUv-.5)*uCover+.5;
  vec2 q=(vUv-.5)*2.;
  float alpha=rounded>.5?1.-smoothstep(.94,1.,length(q)):1.;
  if(alpha*visibility<.003) discard;
  #if EFFECT_QUALITY > 0
    // Only the food photograph is refracted. DOM text, buttons and surroundings
    // are never sampled. The mask is anchored to the dish's own UV coordinates.
    if(uHeat>.001) {
    vec2 hot=(vUv-vec2(.56,.61))/vec2(.28,.29);
    float mask=exp(-dot(hot,hot)*2.8)*smoothstep(.3,.52,vUv.y);
    if(mask>.002) {
    float n=noise21(uv*vec2(22.,13.)+vec2(uTime*.19,-uTime*.7));
    #if EFFECT_QUALITY > 1
      n=n*.7+noise21(uv*43.-vec2(uTime*.14,uTime*.52))*.3;
    #endif
    uv+=vec2(n-.5,(n-.5)*.35)*.003*uHeat*mask;
    }
    }
  #endif
  vec3 color=texture2D(photo,clamp(uv,vec2(.001),vec2(.999))).rgb;
  // Neutral food highlights, a little warm bounce in the shadows, no blanket sepia.
  color+=vec3(.009,.004,0.)*(1.-color)*uWarmth;
  color*=1.-.025*dot(q,q)*(1.-vRelief*.4);
  gl_FragColor=vec4(color,alpha*visibility);
  #include <colorspace_fragment>
}
`,I=`
uniform float uTime, uOpacity, uPointScale, uQuality;
attribute vec4 aSeed;
varying float vLife;
varying float vSeed;
${z}
void main() {
  float lifetime=4.8+aSeed.z*3.5;
  float age=fract((uTime+aSeed.w*47.)/lifetime);
  vLife=age; vSeed=aSeed.w;
  vec3 origin=vec3((aSeed.x-.5)*1.9,(aSeed.y-.5)*.22,.08);
  vec4 world=modelMatrix*vec4(origin,1.);
  float turbulence=noise21(vec2(aSeed.w*15.,age*3.+uTime*.17))-.5;
  world.xyz+=vec3(turbulence*age*.9,age*(1.1+aSeed.z*.8),turbulence*.15);
  vec4 view=modelViewMatrix*vec4(origin,1.);
  view=viewMatrix*world;
  gl_Position=projectionMatrix*view;
  gl_PointSize=clamp((.2+age*.6)*uPointScale/max(.2,-view.z),1.,uQuality>1.?88.:58.);
}
`,L=`
uniform float uTime, uOpacity;
varying float vLife;
varying float vSeed;
${z}
void main() {
  vec2 q=(gl_PointCoord-.5)*2.;
  float feather=pow(max(0.,1.-dot(q,q)),2.6);
  float billow=noise21(q*3.+vec2(vSeed*30.,uTime*.12));
  float life=smoothstep(0.,.18,vLife)*(1.-smoothstep(.42,1.,vLife));
  float alpha=feather*life*(.35+billow*.65)*uOpacity;
  if(alpha<.001) discard;
  gl_FragColor=vec4(vec3(.94,.92,.87),alpha);
  #include <colorspace_fragment>
}
`,A=new Map;function _({quality:e,visibility:t}){let r=(0,o.useRef)(null),n=(0,o.useRef)(null),{size:s,gl:u}=(0,a.D)(),c=l[e].particles,h=(0,o.useMemo)(()=>{let e=new Float32Array(4*c);for(let t=0;t<e.length;t++)e[t]=(16807*t+137)%65521/65521;return e},[c]),d=(0,o.useMemo)(()=>new Float32Array(3*c),[c]),f=(0,o.useMemo)(()=>({uTime:{value:0},uOpacity:{value:0},uPointScale:{value:1},uQuality:{value:2}}),[]);return(x(i=>{let o=t(i)*v(i)*v(p.t5.progress)*("high"===e?.105:.075);if(r.current&&(r.current.visible=o>.002&&"low"!==e),!n.current)return;let a=n.current.uniforms;a.uOpacity.value=o,a.uTime.value=p.t5.time,a.uPointScale.value=s.height*u.getPixelRatio()*1.15,a.uQuality.value=l[e].noise}),c)?(0,i.jsxs)("points",{ref:r,frustumCulled:!1,renderOrder:4,children:[(0,i.jsxs)("bufferGeometry",{children:[(0,i.jsx)("bufferAttribute",{attach:"attributes-position",args:[d,3]}),(0,i.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[h,4]})]}),(0,i.jsx)("shaderMaterial",{ref:n,uniforms:f,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:I,fragmentShader:L})]}):null}function Q({src:e,position:t,size:r=[6,4.8],rotation:a=[0,0,0],round:n=0,start:s=-1,end:u=2,hot:h=!1,quality:d="high"}){var f;let m=(0,C.zo)((0,R.LY)(e));m.colorSpace=y.er$,f=(0,R.LY)(e),(0,o.useEffect)(()=>(A.set(m,(A.get(m)||0)+1),()=>{A.set(m,(A.get(m)||1)-1),queueMicrotask(()=>{0===A.get(m)&&(A.delete(m),m.dispose(),C.zo.clear(f))})}),[m,f]);let g=(0,o.useRef)(null),w=m.image,b=w.width/w.height,M=r[0]/r[1],j=(0,o.useMemo)(()=>({photo:{value:m},rounded:{value:n},visibility:{value:1},uCover:{value:new y.I9Y(Math.min(1,M/b),Math.min(1,b/M))},uRelief:{value:"low"!==d&&n?.014*r[0]:0},uTime:{value:0},uHeat:{value:0},uQuality:{value:l[d].noise},uWarmth:{value:1},uScroll:{value:0},uScene:{value:0},uTransition:{value:0}}),[m,n,b,M,d,r[0]]),S=e=>c(s,s+.045,e)*(1-c(u-.045,u,e));x(e=>{if(!g.current)return;let t=g.current.uniforms;t.visibility.value=S(e),t.uTime.value=p.t5.time,t.uScroll.value=e,t.uScene.value=6*e%1,t.uTransition.value=1-v(e),t.uHeat.value=h?v(e)*v(p.t5.progress)*("high"===d?1:.55):0,t.uWarmth.value=1+.25*c(.5,.7,e)});let T=n?l[d].segments:1;return(0,i.jsxs)("group",{position:t,rotation:a,children:[!!n&&"low"!==d&&(0,i.jsxs)("mesh",{position:[.04,-.06,-.035],children:[(0,i.jsx)("planeGeometry",{args:[1.06*r[0],1.06*r[1]]}),(0,i.jsx)("shaderMaterial",{uniforms:j,transparent:!0,side:y.$EB,depthWrite:!1,toneMapped:!1,vertexShader:D,fragmentShader:`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`})]}),(0,i.jsxs)("mesh",{children:[(0,i.jsx)("planeGeometry",{args:[r[0],r[1],T,T]}),(0,i.jsx)("shaderMaterial",{ref:g,uniforms:j,defines:{EFFECT_QUALITY:l[d].noise},transparent:!0,side:y.$EB,depthWrite:!0,toneMapped:!1,vertexShader:D,fragmentShader:k},d)]}),h&&"low"!==d&&(0,i.jsx)(_,{quality:d,visibility:S})]})}function W({mobile:e,quality:t}){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(Q,{quality:t,hot:!0,src:"sate.webp",position:[e?.9:3.3,e?-.5:-.3,0],size:e?[7.8,6.24]:[10,8],round:1,rotation:[0,-.12,-.12],end:.2}),(0,i.jsxs)(o.Suspense,{fallback:null,children:[(0,i.jsx)(Q,{quality:t,hot:!0,src:"rendang.webp",position:[-4,-.7,-5],size:[5.5,4.4],round:1,rotation:[.12,.35,.12],start:.07,end:.3}),(0,i.jsx)(Q,{quality:t,src:"vegetables.webp",position:[4.5,.4,-8],size:[5.3,4.2],round:1,rotation:[-.1,-.3,-.18],start:.08,end:.33}),!e&&(0,i.jsx)(Q,{quality:t,src:"rice.webp",position:[-3.9,2,-10],size:[4,3.2],round:1,rotation:[.15,.25,-.2],start:.1,end:.35})]})]})}function B({mobile:e,quality:t}){let r=(0,o.useRef)(null);return x(e=>{r.current&&(r.current.rotation.x=(1-y.cj9.smoothstep(e,.34,.47))*Math.PI/2)}),(0,i.jsxs)("group",{ref:r,position:[0,0,-26],children:[(0,i.jsx)(Q,{quality:t,src:"sharing.webp",position:[0,.02,0],size:[7,5.6],rotation:[-Math.PI/2,0,0],round:1}),(0,i.jsx)(Q,{quality:t,hot:!0,src:"sate.webp",position:[-5,.1,1],size:[4,3.2],rotation:[-Math.PI/2,0,-.4],round:1}),(0,i.jsx)(Q,{quality:t,hot:!0,src:"rendang.webp",position:[4.5,.14,-1.8],size:[4,3.2],rotation:[-Math.PI/2,0,.3],round:1}),!e&&(0,i.jsx)(Q,{quality:t,src:"vegetables.webp",position:[1,.12,4.1],size:[3.4,2.7],rotation:[-Math.PI/2,0,-.25],round:1})]})}function N({quality:e,mobile:t}){let{gl:r,size:i,invalidate:n}=(0,a.D)(),s=(0,o.useRef)(!1),u=(0,o.useMemo)(()=>{if("low"===e)return null;let t=()=>{let e=new y.nWS(1,1,{type:y.OUM,depthBuffer:!0,stencilBuffer:!1});return e.depthTexture=new y.VCu(1,1),e.texture.generateMipmaps=!1,e},r=t(),i=t(),o=new y.BKk({uniforms:{uFrom:{value:r.texture},uTo:{value:i.texture},uDepthFrom:{value:r.depthTexture},uDepthTo:{value:i.depthTexture},uProgress:{value:0},uAspect:{value:1},uCenter:{value:new y.I9Y(.5,.5)},uNear:{value:.04},uFar:{value:110},uQuality:{value:l[e].noise},uScroll:{value:0}},vertexShader:F,fragmentShader:U,depthTest:!1,depthWrite:!1,toneMapped:!1}),a=new y.bdM(2,2),n=new y.Z58;return n.add(new y.eaF(a,o)),{from:r,to:i,material:o,geometry:a,scene:n,screenCamera:new y.qUd(-1,1,1,-1,0,1),viewCamera:new y.ubm(43,1,.04,110),position:new y.Pq0,target:new y.Pq0}},[e]);return(0,o.useLayoutEffect)(()=>{if(!u)return;let t=r.getPixelRatio()*l[e].targetScale,o=Math.min(1,1600/(i.width*t),Math.sqrt(("high"===e?125e4:72e4)/(i.width*i.height*t*t))),a=Math.max(1,Math.round(i.width*t*o)),s=Math.max(1,Math.round(i.height*t*o));u.from.setSize(a,s),u.to.setSize(a,s),u.material.uniforms.uAspect.value=i.width/i.height,u.viewCamera.aspect=i.width/i.height,u.viewCamera.updateProjectionMatrix(),n()},[u,r,i.width,i.height,e,n]),(0,o.useEffect)(()=>()=>{u&&(u.from.dispose(),u.to.dispose(),u.material.dispose(),u.geometry.dispose(),u.scene.clear())},[u]),(0,a.F)(({scene:e,camera:o})=>{let a=p.t5.progress,n=u&&d(a),l=n&&"shader"===n.mode?n:void 0;if(!u||!l){g(a),r.setRenderTarget(null),r.render(e,o),s.current&&(u?.from.dispose(),u?.to.dispose()),s.current=!1;return}s.current=!0;let{progress:c,outgoing:h,incoming:v}=f(a,l),m=(o,a)=>{(0,p.c5)(o,u.position,u.target,t),P(u.viewCamera,u.position,u.target,t,i.width/i.height),g(o),r.setRenderTarget(a),r.clear(),r.render(e,u.viewCamera)},x=r.getRenderTarget();try{m(h,u.from),m(v,u.to);let e=u.material.uniforms;e.uProgress.value=c,e.uScroll.value=a,e.uCenter.value.set(l.center[0],l.center[1]),r.setRenderTarget(null),r.render(u.scene,u.screenCamera)}finally{g(a),r.setRenderTarget(x)}},1),null}function O({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(Q,{quality:e,src:"sate.webp",end:.74,position:[t?3.2:7.5,1,-44],size:t?[3.2,4.2]:[5,6.5],rotation:[0,-.22,0]}),(0,i.jsx)(Q,{quality:e,src:"sharing.webp",end:.74,position:[t?-2.2:-.6,-.6,-47],size:t?[3.6,2.88]:[5,4],rotation:[0,-.35,0]}),["foliage","jepun"].map(r=>(0,i.jsx)(j,{...(0,w.R)(r,t),quality:e},r))]})}function $({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(Q,{quality:e,src:"sharing.webp",start:.64,position:[t?1.5:4.5,.1,-65],size:t?[7,5.6]:[10,8],round:1,rotation:[0,-.2,.1]}),(0,i.jsx)(Q,{quality:e,hot:!0,src:"rice.webp",start:.64,position:[-4,-3,-63],size:[4,3.2],round:1})]})}function Y({onReady:e}){let t=(0,a.D)(e=>e.invalidate);return(0,o.useEffect)(()=>(p.t5.invalidate=t,e(),()=>{p.t5.invalidate=void 0}),[t,e]),null}function H({onFailure:e}){let t=(0,a.D)(e=>e.gl);return(0,o.useEffect)(()=>{let r=t.domElement,i=t=>{t.preventDefault(),e()},o=t.debug.onShaderError;return t.debug.onShaderError=(t,r)=>{console.error("Bali Bali shader failed:",t.getProgramInfoLog(r)),queueMicrotask(e)},r.addEventListener("webglcontextlost",i),()=>{r.removeEventListener("webglcontextlost",i),t.debug.onShaderError=o}},[t,e]),null}function V({from:e,to:t,children:r}){let a=(0,o.useRef)(null);return x(r=>{a.current&&(a.current.visible=r>=e&&r<=t)}),(0,i.jsx)("group",{ref:a,children:r})}function G({onReady:e,onFailure:t}){let[r,a]=(0,o.useState)(()=>window.innerWidth<768),s=(0,o.useMemo)(()=>{var e;let t=navigator;return(e={mobile:r,cores:t.hardwareConcurrency,memory:t.deviceMemory,saveData:t.connection?.saveData}).saveData||void 0!==e.memory&&e.memory<=2?"low":e.mobile||void 0!==e.cores&&e.cores<=4||void 0!==e.memory&&e.memory<=4?"medium":"high"},[r]),[u,c]=(0,o.useState)(s);(0,o.useEffect)(()=>c(s),[s]),(0,o.useEffect)(()=>{let e=window.matchMedia("(max-width: 767px)"),t=()=>a(e.matches);return e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);let[h,d]=(0,o.useState)(0);return(0,o.useEffect)(()=>{let e=window.setInterval(()=>d(e=>Math.max(e,p.t5.progress>.58?3:p.t5.progress>.38?2:+(p.t5.progress>.12))),250);return()=>clearInterval(e)},[]),(0,i.jsxs)(n.Hl,{"aria-hidden":"true",frameloop:"demand",dpr:Math.min(window.devicePixelRatio||1,l[u].dpr,r?1.2:1.65),camera:{position:[0,1,13],fov:43,near:.04,far:110},gl:{antialias:!r,alpha:!0,powerPreference:"high-performance"},children:[(0,i.jsx)(H,{onFailure:t}),(0,i.jsx)(q,{quality:u,ceiling:s,onQuality:c}),(0,i.jsx)(T,{quality:u}),(0,i.jsx)(E,{mobile:r}),(0,i.jsx)(N,{quality:u,mobile:r}),(0,i.jsxs)(o.Suspense,{fallback:null,children:[(0,i.jsx)(V,{from:0,to:.36,children:(0,i.jsx)(W,{mobile:r,quality:u})}),(0,i.jsx)(V,{from:.085,to:.45,children:(0,i.jsx)(S,{mobile:r,quality:u})}),(0,i.jsx)(Y,{onReady:e})]}),h>=1&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(V,{from:.18,to:.54,children:(0,i.jsx)(B,{mobile:r,quality:u})})}),h>=2&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(V,{from:.49,to:.79,children:(0,i.jsx)(O,{quality:u,mobile:r})})}),h>=3&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(V,{from:.62,to:1,children:(0,i.jsx)($,{quality:u,mobile:r})})})]})}}}]);