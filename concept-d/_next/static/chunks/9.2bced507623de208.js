"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9],{5009:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Z});var i=r(5155),a=r(2115),o=r(602),n=r(7601),l=r(5860),s=r(6275),u=r(5250),c=r(3696);let v=new Set;function d(e){v.forEach(t=>t(e))}function f(e){let t=(0,a.useRef)(e);(0,a.useLayoutEffect)(()=>{t.current=e}),(0,a.useLayoutEffect)(()=>{let e=e=>t.current(e);return v.add(e),e(c.t5.progress),c.t5.invalidate?.(),()=>{v.delete(e)}},[])}var p=r(8521),h=r(8930),m=r(5269),g=r(6383);let x=new Map;function w({mobile:e,quality:t,symbol:r,manifest:o}){let l=`${n.yZ}models/${o.variants[t].file}`,{scene:s}=(0,h.p)(l,!1,!1),c=(0,a.useRef)(null),v=(0,g.R)(r,e),d=(0,a.useMemo)(()=>{let e=s.clone(!0),t=[];return e.traverse(e=>{if(!(e instanceof m.eaF))return;let r=e=>{let r=e.clone();return r.transparent=!0,r.side=m.$EB,t.push(r),r};e.material=Array.isArray(e.material)?e.material.map(r):r(e.material)}),{root:e,materials:t,owners:0}},[s]);return(0,a.useEffect)(()=>(d.owners++,x.set(s,(x.get(s)||0)+1),()=>{d.owners--,x.set(s,(x.get(s)||1)-1),queueMicrotask(()=>{if(d.owners||d.materials.forEach(e=>e.dispose()),0===x.get(s)){let e,t,r;x.delete(s),e=new Set,t=new Set,r=new Set,s.traverse(i=>{if(i instanceof m.eaF)for(let a of(e.add(i.geometry),Array.isArray(i.material)?i.material:[i.material]))t.add(a),Object.values(a).forEach(e=>{e instanceof m.gPd&&r.add(e)})}),e.forEach(e=>e.dispose()),t.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()),h.p.clear(l)}})}),[d,s,l]),f(e=>{let t=(0,u.Jp)(v.from,v.from+.025,e)*(1-(0,u.Jp)(v.to-.025,v.to,e));c.current&&(c.current.visible=t>.001),d.materials.forEach(e=>{e.opacity=t,e.depthWrite=t>.98})}),(0,i.jsx)("group",{ref:c,name:`cultural-${r}-scan`,position:v.position,rotation:v.rotation,scale:v.scale,children:(0,i.jsx)("primitive",{object:d.root,dispose:null})})}function y(e){return(0,i.jsx)(w,{...e,symbol:"gateway",manifest:p})}var b=r(8750);let j={penjor:["#b88a4c","#e2c68d","#72805a"],foliage:["#60372a","#b18a51","#815641"]};function M({symbol:e,quality:t,scale:r,position:o,rotation:n,from:l,to:s}){let c=(0,a.useRef)(null),v=(0,a.useRef)([]),d=(0,a.useMemo)(()=>(function(e,t){let r="high"===t?24:"medium"===t?12:6,i="high"===t?8:"medium"===t?6:4,a=[[],[],[]],o=(e,t=0)=>{let r=e.index?e.toNonIndexed():e;if(r!==e&&e.dispose(),!r.getAttribute("color")){let e=new Float32Array(3*r.getAttribute("position").count).fill(1);r.setAttribute("color",new m.qtW(e,3))}r.clearGroups(),a[t].push(r)},n=(e,i,a=0,n=0)=>{o(new m.QCA(e,{depth:i,steps:1,curveSegments:r/2,bevelEnabled:"low"!==t,bevelSegments:"high"===t?2:1,bevelSize:.003,bevelThickness:.003}).translate(0,0,n-i/2),a)},l=(e,t,a=0)=>o(new m.j6(new m.B6O(e.map(e=>new m.Pq0(...e))),r,t,i,!1),a),s=(e,i,a,n,l,s,u=.04,c=!1)=>{let v=new m.ypk;v.moveTo(0,0),c?(v.bezierCurveTo(-(.9*n),.1*a,-(1.1*n),.28*a,-(.7*n),.36*a),v.bezierCurveTo(-(1.25*n),.38*a,-(.8*n),.58*a,-(.4*n),.62*a),v.bezierCurveTo(-(.8*n),.75*a,-(.4*n),.88*a,.15*n,a),v.bezierCurveTo(.7*n,.8*a,.95*n,.8*a,.55*n,.64*a),v.bezierCurveTo(1.1*n,.55*a,.9*n,.45*a,.6*n,.35*a),v.bezierCurveTo(n,.2*a,.4*n,.1*a,0,0)):(v.bezierCurveTo(-n,.25*a,-(.55*n),.8*a,0,a),v.bezierCurveTo(.8*n,.72*a,.6*n,.2*a,0,0));let d=new m.QCA(v,{depth:.012,bevelEnabled:"low"!==t,bevelSize:.0015,bevelThickness:.0015,bevelSegments:1,curveSegments:c?"high"===t?4:"medium"===t?3:2:r/2}),f=d.getAttribute("position");for(let e=0;e<f.count;e++){let t=f.getY(e)/a;f.setZ(e,f.getZ(e)+.014*Math.sin(t*Math.PI)+t*t*.012)}d.computeVertexNormals(),d.rotateZ(l).translate(e,i,u),o(d,s)};if("penjor"===e){let e=new m.s0K(new m.Pq0(-.42,-.5,0),new m.Pq0(-.65,.95,-.025),new m.Pq0(.38,.8,.025),new m.Pq0(.4,.08,0));o(new m.j6(e,2*r,.014,i,!1));for(let t=1;t<=10;t++){let r=t/12,a=e.getPoint(r),n=e.getTangent(r),l=new m.Ho_(.018,.018,.009,i);if(l.applyMatrix4(new m.kn4().compose(a,new m.PTz().setFromUnitVectors(new m.Pq0(0,1,0),n),new m.Pq0(1,1,1))),o(l,1),t>=4){let e=-Math.atan2(n.x,n.y);s(a.x,a.y,.105,.025,e-.75,1,.02),s(a.x,a.y,.085,.024,e+.8,2,.025)}}l([[.4,.08,0],[.4,-.05,.01],[.4,-.22,0]],.004,1);for(let e=0;e<4;e++){let t=-.02-.045*e;s(.4,t,.09,.025,-.9,1),s(.4,t,.09,.025,.9,1)}let t=new m.ypk;t.moveTo(.4,-.2),t.lineTo(.455,-.27),t.lineTo(.4,-.34),t.lineTo(.345,-.27),t.closePath(),n(t,.02,1);for(let e=-1;e<=1;e++)l([[.4+.018*e,-.33,0],[.4+.03*e,-.4,.01],[.4+.034*e,-.46,.02]],.003,0===e?2:1)}else if("foliage"===e){let e=new m.ypk;e.moveTo(0,.48),e.bezierCurveTo(-.32,.48,-.47,.18,-.43,-.15),e.bezierCurveTo(-.4,-.43,-.2,-.49,0,-.47),e.bezierCurveTo(.3,-.49,.46,-.25,.43,.05),e.bezierCurveTo(.42,.3,.24,.48,0,.48);let r=new m.wAk;for(let i of(r.absellipse(0,0,.28,.36,0,2*Math.PI,!0),e.holes.push(r),n(e,.075),[-1,1])){l([[.08*i,-.42,.054],[.34*i,-.25,.054],[.35*i,.1,.054],[.15*i,.38,.054],[0,.43,.054]],.009,1);for(let e=0;e<6;e++){let r=-1.16+e/5*2.4,a=i*Math.cos(r)*.34,o=.38*Math.sin(r);s(a,o,.18,.055,i*(-Math.PI/2+.9*r),e%2?0:2,.02,!0),"low"!==t&&s(a,o,.1,.03,i*(-.5+r),1,.063,!0),(1===e||4===e)&&l(Array.from({length:15},(e,t)=>{let r=t/14*Math.PI*2.15,n=.055*(1-t/18);return[a+i*(.025+Math.cos(r)*n),o+Math.sin(r)*n,.073]}),.0045,1)}}s(0,.37,.2,.07,0,0,.04,!0),s(0,-.37,.17,.065,Math.PI,0,.04,!0)}let u=a.map(e=>{let t=(0,b.pP)(e,!1);return e.forEach(e=>e.dispose()),t}),c=(0,b.pP)(u,!0);return u.forEach(e=>e.dispose()),c.computeBoundingBox(),c.computeBoundingSphere(),c})(e,t),[e,t]);return(0,a.useEffect)(()=>()=>d.dispose(),[d]),f(e=>{let t=(0,u.Jp)(l,l+.025,e)*(1-(0,u.Jp)(s-.025,s,e));c.current&&(c.current.visible=t>.001),v.current.forEach(e=>{e&&(e.opacity=t,e.depthWrite=t>.98)})}),(0,i.jsx)("group",{ref:c,name:`cultural-${e}`,position:o,rotation:n,scale:r,children:(0,i.jsxs)("mesh",{children:[(0,i.jsx)("primitive",{attach:"geometry",object:d}),j[e].map((t,r)=>(0,i.jsx)("meshStandardMaterial",{ref:e=>{v.current[r]=e},attach:`material-${r}`,color:t,vertexColors:!0,roughness:"foliage"===e?.66:.82,metalness:.2*("foliage"===e&&1===r),side:m.$EB,transparent:!0},r))]})})}function S({mobile:e,quality:t}){let r=(0,a.useDeferredValue)(t);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(y,{mobile:e,quality:r}),(0,i.jsx)(M,{...(0,g.R)("penjor",e),symbol:"penjor",quality:t})]})}function T({quality:e}){let{scene:t,gl:r}=(0,l.D)(),o=(0,a.useRef)(null),n=(0,a.useRef)(null),s=(0,a.useMemo)(()=>({ivory:new m.Q1f("#f4ebdd"),heritage:new m.Q1f("#e0cab0"),evening:new m.Q1f("#e5d7c5"),current:new m.Q1f}),[]);return f(e=>{let i=(0,u.Jp)(.49,.59,e)*(1-(0,u.Jp)(.66,.77,e)),a=(0,u.Jp)(.66,.77,e)*(1-(0,u.Jp)(.83,.93,e));s.current.copy(s.ivory).lerp(s.heritage,i).lerp(s.evening,a),t.background=s.current,r.toneMappingExposure=1-.025*i,o.current&&(o.current.intensity=1.8-.12*a),n.current&&(n.current.intensity=2.4+.15*i)}),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("ambientLight",{ref:o,intensity:1.8}),(0,i.jsx)("directionalLight",{ref:n,position:[5,8,10],intensity:2.4,color:"#fff3df"}),"high"===e&&(0,i.jsx)("hemisphereLight",{args:["#fff8ed","#b66d4d",.3]})]})}function q({quality:e,ceiling:t,onQuality:r}){let{gl:i,invalidate:o}=(0,l.D)(),n=(0,a.useRef)(!0);(0,a.useRef)(0);let s=(0,a.useRef)(1/60),v=(0,a.useMemo)(()=>new u.BR(t,t),[t]);return(0,a.useEffect)(()=>{let e=i.domElement,t=()=>{v.reset(),!document.hidden&&n.current&&o()},r=new IntersectionObserver(([e])=>{n.current=e.isIntersecting,t()});return r.observe(e),document.addEventListener("visibilitychange",t),()=>{r.disconnect(),document.removeEventListener("visibilitychange",t)}},[i,o,v]),(0,a.useEffect)(()=>{i.domElement.dataset.quality=e},[i,e]),(0,l.F)((t,i)=>{if(document.hidden||!n.current)return void v.reset();c.t5.time+=Math.min(i,.05),i<.2&&(s.current+=(i-s.current)*.05);let a=v.sample(i);a!==e&&r(a),"low"!==e&&(0,u.Bx)(c.t5.progress)&&o()},-2),(0,l.F)((e,t)=>{},2),null}function E(e,t,r,i,a){e.position.copy(t);let o=i&&a<1?51:43;e.fov!==o&&(e.fov=o,e.updateProjectionMatrix()),e.lookAt(r),e.updateMatrixWorld()}function C({mobile:e}){let[t,r]=(0,a.useMemo)(()=>[new m.Pq0,new m.Pq0],[]),i=(0,l.D)(e=>e.size);return(0,l.F)(({camera:a})=>{(0,c.c5)(c.t5.progress,t,r,e),E(a,t,r,e,i.width/i.height)},-1),null}var P=r(6318);let F=`
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise21(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),
             mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
`,z=`
varying vec2 vUv;
void main() { vUv=uv; gl_Position=vec4(position.xy,0.,1.); }
`,R=`
uniform sampler2D uFrom, uTo, uDepthFrom, uDepthTo;
uniform float uProgress, uAspect, uNear, uFar, uQuality, uScroll;
uniform vec2 uCenter;
varying vec2 vUv;
${F}
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
  float envelope=pow(sin(p*3.14159265),2.);
  float edgeNoise=(noise21(q*15.+uScroll*2.)-.5)*.003*uQuality;
  float maxRadius=length(vec2(max(uCenter.x,1.-uCenter.x)*uAspect,max(uCenter.y,1.-uCenter.y)));
  float field=radius+foreground*.14-receiving*.025+edgeNoise;
  float eased=p*p*p*(p*(p*6.-15.)+10.);
  float reach=mix(-.24,maxRadius+.28,eased);
  float reveal=1.-smoothstep(reach-.095,reach+.095,field);
  // Explicit endpoints are pixel-identical to each camera, including reverse scroll.
  reveal=p<.00001?0.:(p>.99999?1.:reveal);
  vec2 fromUv=uCenter+(vUv-uCenter)/(1.+.045*envelope*(1.-p)*foreground);
  vec2 toUv=uCenter+(vUv-uCenter)/(1.+.02*envelope*p*receiving);
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
`,U=`
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
`,D=`
uniform sampler2D photo;
uniform vec2 uCover;
uniform float rounded, visibility, uTime, uHeat, uQuality, uWarmth, uScroll, uScene, uTransition;
varying vec2 vUv;
varying float vRelief;
${F}
void main() {
  vec2 uv=(vUv-.5)*uCover+.5;
  vec2 q=(vUv-.5)*2.;
  float edge=min(min(vUv.x,1.-vUv.x),min(vUv.y,1.-vUv.y));
  float alpha=rounded>.5?1.-smoothstep(.81,1.,length(q)):smoothstep(0.,.025,edge);
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
`,k=`
uniform float uTime, uOpacity, uPointScale, uQuality;
attribute vec4 aSeed;
varying float vLife;
varying float vSeed;
${F}
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
`,A=`
uniform float uTime, uOpacity;
varying float vLife;
varying float vSeed;
${F}
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
`,L=new Map;function I({quality:e,visibility:t}){let r=(0,a.useRef)(null),o=(0,a.useRef)(null),{size:n,gl:s}=(0,l.D)(),v=u.Fx[e].particles,d=(0,a.useMemo)(()=>{let e=new Float32Array(4*v);for(let t=0;t<e.length;t++)e[t]=(16807*t+137)%65521/65521;return e},[v]),p=(0,a.useMemo)(()=>new Float32Array(3*v),[v]),h=(0,a.useMemo)(()=>({uTime:{value:0},uOpacity:{value:0},uPointScale:{value:1},uQuality:{value:2}}),[]);return(f(i=>{let a=t(i)*(0,u.vp)(i)*(0,u.vp)(c.t5.progress)*("high"===e?.105:.075);if(r.current&&(r.current.visible=a>.002&&"low"!==e),!o.current)return;let l=o.current.uniforms;l.uOpacity.value=a,l.uTime.value=c.t5.time,l.uPointScale.value=n.height*s.getPixelRatio()*1.15,l.uQuality.value=u.Fx[e].noise}),v)?(0,i.jsxs)("points",{ref:r,frustumCulled:!1,renderOrder:4,children:[(0,i.jsxs)("bufferGeometry",{children:[(0,i.jsx)("bufferAttribute",{attach:"attributes-position",args:[p,3]}),(0,i.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[d,4]})]}),(0,i.jsx)("shaderMaterial",{ref:o,uniforms:h,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:k,fragmentShader:A})]}):null}function _({src:e,position:t,size:r=[6,4.8],rotation:l=[0,0,0],round:s=0,start:v=-1,end:d=2,hot:p=!1,quality:h="high"}){var g;let x=(0,o.zo)((0,n.LY)(e));x.colorSpace=m.er$,g=(0,n.LY)(e),(0,a.useEffect)(()=>(L.set(x,(L.get(x)||0)+1),()=>{L.set(x,(L.get(x)||1)-1),queueMicrotask(()=>{0===L.get(x)&&(L.delete(x),x.dispose(),o.zo.clear(g))})}),[x,g]);let w=(0,a.useRef)(null),y=(0,a.useRef)(null),b=x.image,j=b.width/b.height,M=r[0]/r[1],S=(0,a.useMemo)(()=>({photo:{value:x},rounded:{value:s},visibility:{value:1},uCover:{value:new m.I9Y(Math.min(1,M/j),Math.min(1,j/M))},uRelief:{value:"low"!==h&&s?.014*r[0]:0},uTime:{value:0},uHeat:{value:0},uQuality:{value:u.Fx[h].noise},uWarmth:{value:1},uScroll:{value:0},uScene:{value:0},uTransition:{value:0}}),[x,s,j,M,h,r[0]]),T=e=>(0,P.Pc)(e,v,d);f(e=>{if(y.current&&(y.current.uniforms.visibility.value=T(e)),!w.current)return;let t=w.current.uniforms;t.visibility.value=T(e),t.uTime.value=c.t5.time,t.uScroll.value=e,t.uScene.value=6*e%1,t.uTransition.value=1-(0,u.vp)(e),t.uHeat.value=p?(0,u.vp)(e)*(0,u.vp)(c.t5.progress)*("high"===h?1:.55):0,t.uWarmth.value=1+.25*(0,u.Jp)(.5,.7,e)});let q=s?u.Fx[h].segments:1;return(0,i.jsxs)("group",{position:t,rotation:l,children:[!!s&&"low"!==h&&(0,i.jsxs)("mesh",{position:[.04,-.06,-.035],children:[(0,i.jsx)("planeGeometry",{args:[1.06*r[0],1.06*r[1]]}),(0,i.jsx)("shaderMaterial",{ref:y,uniforms:S,transparent:!0,side:m.$EB,depthWrite:!1,toneMapped:!1,vertexShader:U,fragmentShader:`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`})]}),(0,i.jsxs)("mesh",{children:[(0,i.jsx)("planeGeometry",{args:[r[0],r[1],q,q]}),(0,i.jsx)("shaderMaterial",{ref:w,uniforms:S,defines:{EFFECT_QUALITY:u.Fx[h].noise},transparent:!0,side:m.$EB,depthWrite:!1,toneMapped:!1,vertexShader:U,fragmentShader:D},h)]}),p&&"low"!==h&&(0,i.jsx)(I,{quality:h,visibility:T})]})}function Q({mobile:e,quality:t}){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(_,{quality:t,hot:!0,src:"sate.webp",position:[e?.9:3.3,e?-.5:-.3,0],size:e?[7.8,6.24]:[10,8],round:1,rotation:[0,-.12,-.12],start:.1,end:.2}),(0,i.jsxs)(a.Suspense,{fallback:null,children:[(0,i.jsx)(_,{quality:t,hot:!0,src:"rendang.webp",position:[-4,-.7,-5],size:[5.5,4.4],round:1,rotation:[.12,.35,.12],start:.115,end:.3}),(0,i.jsx)(_,{quality:t,src:"vegetables.webp",position:[4.5,.4,-8],size:[5.3,4.2],round:1,rotation:[-.1,-.3,-.18],start:.12,end:.33}),!e&&(0,i.jsx)(_,{quality:t,src:"rice.webp",position:[-3.9,2,-10],size:[4,3.2],round:1,rotation:[.15,.25,-.2],start:.125,end:.35})]})]})}function B({mobile:e,quality:t}){let r=(0,a.useRef)(null);return f(e=>{r.current&&(r.current.rotation.x=(1-m.cj9.smoothstep(e,.34,.47))*Math.PI/2)}),(0,i.jsxs)("group",{ref:r,position:[0,0,-26],children:[(0,i.jsx)(_,{start:.18,end:.57,quality:t,src:"sharing.webp",position:[0,.02,0],size:[7,5.6],rotation:[-Math.PI/2,0,0],round:1}),(0,i.jsx)(_,{start:.18,end:.57,quality:t,hot:!0,src:"sate.webp",position:[-5,.1,1],size:[4,3.2],rotation:[-Math.PI/2,0,-.4],round:1}),(0,i.jsx)(_,{start:.18,end:.57,quality:t,hot:!0,src:"rendang.webp",position:[4.5,.14,-1.8],size:[4,3.2],rotation:[-Math.PI/2,0,.3],round:1}),!e&&(0,i.jsx)(_,{start:.18,end:.57,quality:t,src:"vegetables.webp",position:[1,.12,4.1],size:[3.4,2.7],rotation:[-Math.PI/2,0,-.25],round:1})]})}function W({quality:e,mobile:t}){let{gl:r,size:i,invalidate:o}=(0,l.D)(),n=(0,a.useRef)(!1),s=(0,a.useMemo)(()=>{if("low"===e)return null;let t=()=>{let e=new m.nWS(1,1,{type:m.OUM,depthBuffer:!0,stencilBuffer:!1});return e.depthTexture=new m.VCu(1,1),e.texture.generateMipmaps=!1,e},r=t(),i=t(),a=new m.BKk({uniforms:{uFrom:{value:r.texture},uTo:{value:i.texture},uDepthFrom:{value:r.depthTexture},uDepthTo:{value:i.depthTexture},uProgress:{value:0},uAspect:{value:1},uCenter:{value:new m.I9Y(.5,.5)},uNear:{value:.04},uFar:{value:110},uQuality:{value:u.Fx[e].noise},uScroll:{value:0}},vertexShader:z,fragmentShader:R,depthTest:!1,depthWrite:!1,toneMapped:!1}),o=new m.bdM(2,2),n=new m.Z58;return n.add(new m.eaF(o,a)),{from:r,to:i,material:a,geometry:o,scene:n,screenCamera:new m.qUd(-1,1,1,-1,0,1),viewCamera:new m.ubm(43,1,.04,110),position:new m.Pq0,target:new m.Pq0}},[e]);return(0,a.useLayoutEffect)(()=>{if(!s)return;let t=r.getPixelRatio()*u.Fx[e].targetScale,a=Math.min(1,1600/(i.width*t),Math.sqrt(("high"===e?125e4:72e4)/(i.width*i.height*t*t))),n=Math.max(1,Math.round(i.width*t*a)),l=Math.max(1,Math.round(i.height*t*a));s.from.setSize(n,l),s.to.setSize(n,l),s.material.uniforms.uAspect.value=i.width/i.height,s.viewCamera.aspect=i.width/i.height,s.viewCamera.updateProjectionMatrix(),o()},[s,r,i.width,i.height,e,o]),(0,a.useEffect)(()=>()=>{s&&(s.from.dispose(),s.to.dispose(),s.material.dispose(),s.geometry.dispose(),s.scene.clear())},[s]),(0,l.F)(({scene:e,camera:a})=>{let o=c.t5.progress,l=s&&(0,u.lx)(o),v=l&&"shader"===l.mode?l:void 0;if(!s||!v){d(o),r.setRenderTarget(null),r.render(e,a),n.current&&(s?.from.dispose(),s?.to.dispose()),n.current=!1;return}n.current=!0;let{progress:f,outgoing:p,incoming:h}=(0,u.vD)(o,v),m=(a,o)=>{(0,c.c5)(a,s.position,s.target,t),E(s.viewCamera,s.position,s.target,t,i.width/i.height),d(a),r.setRenderTarget(o),r.clear(),r.render(e,s.viewCamera)},g=r.getRenderTarget();try{m(p,s.from),m(h,s.to);let e=s.material.uniforms;e.uProgress.value=f,e.uScroll.value=o,e.uCenter.value.set(v.center[0],v.center[1]),r.setRenderTarget(null),r.render(s.scene,s.screenCamera)}finally{d(o),r.setRenderTarget(g)}},1),null}var $=r(1588);function N({mobile:e,quality:t}){let r=(0,a.useDeferredValue)(t);return(0,i.jsx)(w,{mobile:e,quality:r,symbol:"jepun",manifest:$})}function O({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(_,{quality:e,start:.49,src:"sate.webp",end:.74,position:[t?3.2:7.5,1,-44],size:t?[3.2,4.2]:[5,6.5],rotation:[0,-.22,0]}),(0,i.jsx)(_,{quality:e,start:.49,src:"sharing.webp",end:.74,position:[t?-2.2:-.6,-.6,-47],size:t?[3.6,2.88]:[5,4],rotation:[0,-.35,0]}),(0,i.jsx)(M,{...(0,g.R)("foliage",t),quality:e}),(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(N,{mobile:t,quality:e})})]})}function J({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(_,{quality:e,src:"sharing.webp",start:.64,position:[t?1.5:4.5,.1,-65],size:t?[7,5.6]:[10,8],round:1,rotation:[0,-.2,.1]}),(0,i.jsx)(_,{quality:e,hot:!0,src:"rice.webp",start:.64,position:[-4,-3,-63],size:[4,3.2],round:1})]})}function V({onReady:e}){let t=(0,l.D)(e=>e.invalidate);return(0,a.useEffect)(()=>(c.t5.invalidate=t,e(),()=>{c.t5.invalidate=void 0}),[t,e]),null}function Y({onFailure:e}){let t=(0,l.D)(e=>e.gl);return(0,a.useEffect)(()=>{let r=t.domElement,i=t=>{t.preventDefault(),e()},a=t.debug.onShaderError;return t.debug.onShaderError=(t,r)=>{console.error("Bali Bali shader failed:",t.getProgramInfoLog(r)),queueMicrotask(e)},r.addEventListener("webglcontextlost",i),()=>{r.removeEventListener("webglcontextlost",i),t.debug.onShaderError=a}},[t,e]),null}function H({from:e,to:t,children:r}){let o=(0,a.useRef)(null);return f(r=>{o.current&&(o.current.visible=r>=e&&r<=t)}),(0,i.jsx)("group",{ref:o,children:r})}function Z({onReady:e,onFailure:t}){let[r,l]=(0,a.useState)(()=>window.innerWidth<768),v=(0,a.useMemo)(()=>{let e=navigator;return(0,u.oV)({mobile:r,cores:e.hardwareConcurrency,memory:e.deviceMemory,saveData:e.connection?.saveData})},[r]),[d,f]=(0,a.useState)(v);(0,a.useEffect)(()=>f(v),[v]),(0,a.useEffect)(()=>{let e=window.matchMedia("(max-width: 767px)"),t=()=>l(e.matches);return e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);let[p,h]=(0,a.useState)(0);return(0,a.useEffect)(()=>{c.t5.prepare=e=>h(t=>Math.max(t,e>.58?3:e>.38?2:+(e>.12))),o.zo.preload((0,n.LY)("sharing.webp"));let e=window.setInterval(()=>h(e=>Math.max(e,c.t5.progress>.58?3:c.t5.progress>.38?2:+(c.t5.progress>.12))),250);return()=>{clearInterval(e),c.t5.prepare=void 0}},[]),(0,i.jsxs)(s.Hl,{"aria-hidden":"true",frameloop:"demand",dpr:Math.min(window.devicePixelRatio||1,u.Fx[d].dpr,r?1.2:1.65),camera:{position:[0,1,13],fov:43,near:.04,far:110},gl:{antialias:!r,alpha:!0,powerPreference:"high-performance"},children:[(0,i.jsx)(Y,{onFailure:t}),(0,i.jsx)(q,{quality:d,ceiling:v,onQuality:f}),(0,i.jsx)(T,{quality:d}),(0,i.jsx)(C,{mobile:r}),(0,i.jsx)(W,{quality:d,mobile:r}),(0,i.jsxs)(a.Suspense,{fallback:null,children:[(0,i.jsx)(H,{from:0,to:.36,children:(0,i.jsx)(Q,{mobile:r,quality:d})}),(0,i.jsx)(H,{from:0,to:.45,children:(0,i.jsx)(S,{mobile:r,quality:d})}),(0,i.jsx)(V,{onReady:e})]}),p>=1&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(H,{from:.18,to:.58,children:(0,i.jsx)(B,{mobile:r,quality:d})})}),p>=2&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(H,{from:.49,to:.79,children:(0,i.jsx)(O,{quality:d,mobile:r})})}),p>=3&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(H,{from:.62,to:1,children:(0,i.jsx)(J,{quality:d,mobile:r})})})]})}}}]);