"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4],{4004:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ee});var i=r(5155),a=r(2115),n=r(5269),o=r(5860);let l=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function u(e,t){let r=(0,o.D)(e=>e.gl),i=(0,o.H)(n.Tap,l(e)?Object.values(e):e);return(0,a.useLayoutEffect)(()=>{null==t||t(i)},[t]),(0,a.useEffect)(()=>{if("initTexture"in r){let e=[];Array.isArray(i)?e=i:i instanceof n.gPd?e=[i]:l(i)&&(e=Object.values(i)),e.forEach(e=>{e instanceof n.gPd&&r.initTexture(e)})}},[r,i]),(0,a.useMemo)(()=>{if(!l(e))return i;{let t={},r=0;for(let a in e)t[a]=i[r++];return t}},[e,i])}u.preload=e=>o.H.preload(n.Tap,e),u.clear=e=>o.H.clear(n.Tap,e);var s=r(7601),c=r(6275),d=r(5250),f=r(3696);let v=new Set,p=[],h=()=>{p=[...v].sort((e,t)=>e.priority-t.priority)};function m(e){p.forEach(t=>t.update(e))}function g(e,t=0){let r=(0,a.useRef)(e);(0,a.useLayoutEffect)(()=>{r.current=e}),(0,a.useLayoutEffect)(()=>{let e=e=>r.current(e),i={update:e,priority:t};return v.add(i),h(),e(f.t5.progress),f.t5.invalidate?.(),()=>{v.delete(i),h()}},[t])}var x=r(8521),y=r(8930),w=r(6383);let b=new Map;function j({mobile:e,quality:t,symbol:r,manifest:l}){let u=`${s.yZ}models/${l.variants[t].file}`,{scene:c}=(0,y.p)(u,!1,!1),f=(0,a.useRef)(null),{gl:v,invalidate:p}=(0,o.D)(),h=(0,w.R)(r,e),m=(0,a.useMemo)(()=>{let e=c.clone(!0),t=[];return e.traverse(e=>{if(!(e instanceof n.eaF))return;let r=e=>{let r=e.clone();return r.transparent=!0,r.side=n.$EB,t.push(r),r};e.material=Array.isArray(e.material)?e.material.map(r):r(e.material)}),{root:e,materials:t,owners:0}},[c]);return(0,a.useLayoutEffect)(()=>{if("gateway"!==r)return;let i=Math.min(v.capabilities.getMaxAnisotropy(),e||"low"===t?1:"high"===t?8:4),a=new Set;m.materials.forEach(e=>Object.values(e).forEach(e=>{e instanceof n.gPd&&a.add(e)})),a.forEach(e=>{e.anisotropy!==i&&(e.anisotropy=i,e.needsUpdate=!0)}),p()},[m,v,p,e,t,r]),(0,a.useEffect)(()=>(m.owners++,b.set(c,(b.get(c)||0)+1),()=>{m.owners--,b.set(c,(b.get(c)||1)-1),queueMicrotask(()=>{if(m.owners||m.materials.forEach(e=>e.dispose()),0===b.get(c)){let e,t,r;b.delete(c),e=new Set,t=new Set,r=new Set,c.traverse(i=>{if(i instanceof n.eaF)for(let a of(e.add(i.geometry),Array.isArray(i.material)?i.material:[i.material]))t.add(a),Object.values(a).forEach(e=>{e instanceof n.gPd&&r.add(e)})}),e.forEach(e=>e.dispose()),t.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()),y.p.clear(u)}})}),[m,c,u]),g(e=>{let t=(0,d.Jp)(h.from,h.from+.025,e)*(1-(0,d.Jp)(h.to-.025,h.to,e));f.current&&(f.current.visible=t>.001),m.materials.forEach(e=>{e.opacity=t,e.depthWrite=t>.98})}),(0,i.jsx)("group",{ref:f,name:`cultural-${r}-scan`,position:h.position,rotation:h.rotation,scale:h.scale,children:(0,i.jsx)("primitive",{object:m.root,dispose:null})})}function M(e){let t=(0,a.useDeferredValue)(e.quality,"high"===e.quality?"medium":e.quality);return(0,i.jsx)(j,{...e,quality:t,symbol:"gateway",manifest:x})}var S=r(7193);function q(e){return(0,i.jsx)(j,{...e,symbol:"penjor",manifest:S})}function E({mobile:e,quality:t}){let r=(0,a.useDeferredValue)(t);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(M,{mobile:e,quality:r}),(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(q,{mobile:e,quality:r})})]})}function T({quality:e}){let{scene:t,gl:r}=(0,o.D)(),l=(0,a.useRef)(null),u=(0,a.useRef)(null),s=(0,a.useMemo)(()=>({ivory:new n.Q1f("#f4ebdd"),heritage:new n.Q1f("#e0cab0"),evening:new n.Q1f("#e5d7c5"),current:new n.Q1f}),[]);return g(e=>{let i=(0,d.Jp)(.49,.59,e)*(1-(0,d.Jp)(.66,.77,e)),a=(0,d.Jp)(.66,.77,e)*(1-(0,d.Jp)(.83,.93,e));s.current.copy(s.ivory).lerp(s.heritage,i).lerp(s.evening,a),t.background=s.current,r.toneMappingExposure=1-.025*i,l.current&&(l.current.intensity=1.8-.12*a),u.current&&(u.current.intensity=2.4+.15*i)}),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("ambientLight",{ref:l,intensity:1.8}),(0,i.jsx)("directionalLight",{ref:u,position:[5,8,10],intensity:2.4,color:"#fff3df"}),"high"===e&&(0,i.jsx)("hemisphereLight",{args:["#fff8ed","#b66d4d",.3]})]})}function F({quality:e,ceiling:t,onQuality:r}){let{gl:i,invalidate:n}=(0,o.D)(),l=(0,a.useRef)(!0);(0,a.useRef)(0);let u=(0,a.useRef)(1/60),s=(0,a.useMemo)(()=>new d.BR(t,t),[t]);return(0,a.useEffect)(()=>{let e=i.domElement,t=()=>{s.reset(),!document.hidden&&l.current&&n()},r=new IntersectionObserver(([e])=>{l.current=e.isIntersecting,t()});return r.observe(e),document.addEventListener("visibilitychange",t),()=>{r.disconnect(),document.removeEventListener("visibilitychange",t)}},[i,n,s]),(0,a.useEffect)(()=>{i.domElement.dataset.quality=e},[i,e]),(0,o.F)((t,i)=>{if(document.hidden||!l.current)return void s.reset();f.t5.time+=Math.min(i,.05),i<.2&&(u.current+=(i-u.current)*.05);let a=s.sample(i);a!==e&&r(a),"low"!==e&&(0,d.Bx)(f.t5.progress)&&n()},-2),(0,o.F)((e,t)=>{},2),null}function P(e,t,r,i,a){e.position.copy(t);let n=(0,f.t0)(i,a);e.fov!==n&&(e.fov=n,e.updateProjectionMatrix()),e.lookAt(r),e.updateMatrixWorld()}function D({mobile:e}){let[t,r]=(0,a.useMemo)(()=>[new n.Pq0,new n.Pq0],[]),i=(0,o.D)(e=>e.size);return(0,o.F)(({camera:a})=>{(0,f.c5)(f.t5.progress,t,r,e),P(a,t,r,e,i.width/i.height)},-1),null}var U=r(6318);let R=`
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise21(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),
             mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
`,C=`
varying vec2 vUv;
void main() { vUv=uv; gl_Position=vec4(position.xy,0.,1.); }
`,L=`
uniform sampler2D uFrom, uTo, uDepthFrom, uDepthTo;
uniform float uProgress, uAspect, uNear, uFar, uQuality, uScroll;
uniform vec2 uCenter;
varying vec2 vUv;
${R}
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
`,A=`
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
${R}
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
`,z=`
uniform float uTime, uOpacity, uPointScale, uQuality;
attribute vec4 aSeed;
varying float vLife;
varying float vSeed;
${R}
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
`,_=`
uniform float uTime, uOpacity;
varying float vLife;
varying float vSeed;
${R}
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
`,W=new Map;function Q({quality:e,visibility:t}){let r=(0,a.useRef)(null),n=(0,a.useRef)(null),{size:l,gl:u}=(0,o.D)(),s=d.Fx[e].particles,c=(0,a.useMemo)(()=>{let e=new Float32Array(4*s);for(let t=0;t<e.length;t++)e[t]=(16807*t+137)%65521/65521;return e},[s]),v=(0,a.useMemo)(()=>new Float32Array(3*s),[s]),p=(0,a.useMemo)(()=>({uTime:{value:0},uOpacity:{value:0},uPointScale:{value:1},uQuality:{value:2}}),[]);return(g(i=>{let a=t(i)*(0,d.vp)(i)*(0,d.vp)(f.t5.progress)*("high"===e?.105:.075);if(r.current&&(r.current.visible=a>.002&&"low"!==e),!n.current)return;let o=n.current.uniforms;o.uOpacity.value=a,o.uTime.value=f.t5.time,o.uPointScale.value=l.height*u.getPixelRatio()*1.15,o.uQuality.value=d.Fx[e].noise}),s)?(0,i.jsxs)("points",{ref:r,frustumCulled:!1,renderOrder:4,children:[(0,i.jsxs)("bufferGeometry",{children:[(0,i.jsx)("bufferAttribute",{attach:"attributes-position",args:[v,3]}),(0,i.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[c,4]})]}),(0,i.jsx)("shaderMaterial",{ref:n,uniforms:p,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:z,fragmentShader:_})]}):null}function O({id:e,src:t,position:r,size:l=[6,4.8],rotation:c=[0,0,0],round:v=0,start:p=-1,end:h=2,hot:m=!1,fit:x=!1,quality:y="high"}){var w;let b=(0,a.useRef)(null),j=(0,o.D)(e=>e.size),M=(0,a.useMemo)(()=>new n.ubm((0,f.t0)(j.width<768,j.width/j.height),j.width/j.height,.04,110),[j.width,j.height]),S=(0,a.useMemo)(()=>({camera:new n.Pq0,target:new n.Pq0,center:new n.Pq0,normal:new n.Pq0,toLens:new n.Pq0,scale:new n.Pq0,projected:new n.Pq0}),[]),q=u((0,s.LY)(t));q.colorSpace=n.er$,w=(0,s.LY)(t),(0,a.useEffect)(()=>(W.set(q,(W.get(q)||0)+1),()=>{W.set(q,(W.get(q)||1)-1),queueMicrotask(()=>{0===W.get(q)&&(W.delete(q),q.dispose(),u.clear(w))})}),[q,w]);let E=(0,a.useRef)(null),T=(0,a.useRef)(null),F=q.image,P=F.width/F.height,D=l[0]/l[1],R=(0,a.useMemo)(()=>({photo:{value:q},rounded:{value:v},visibility:{value:1},uCover:{value:new n.I9Y(Math.min(1,D/P),Math.min(1,P/D))},uRelief:{value:"low"!==y&&v?.014*l[0]:0},uTime:{value:0},uHeat:{value:0},uQuality:{value:d.Fx[y].noise},uWarmth:{value:1},uScroll:{value:0},uScene:{value:0},uTransition:{value:0}}),[q,v,P,D,y,l[0]]),C=e=>{let t=(0,U.Pc)(e,p,h);if(!t||!b.current)return 0;let r=j.width<768;(0,f.c5)(e,S.camera,S.target,r),x&&b.current.scale.setScalar(1),b.current.updateWorldMatrix(!0,!1),b.current.getWorldPosition(S.center),b.current.getWorldScale(S.scale),S.normal.set(0,0,1).transformDirection(b.current.matrixWorld),S.toLens.copy(S.camera).sub(S.center);let i=S.normal.dot(S.toLens)/Math.max(.001,S.toLens.length()),a=S.toLens.negate().dot(S.target.sub(S.camera).normalize());M.position.copy(S.camera),M.lookAt(S.toLens.copy(S.camera).add(S.target)),M.updateMatrixWorld(),S.projected.copy(S.center).project(M);let n=x?(0,U.UV)(a,l[0]*S.scale.x,l[1]*S.scale.y,j.width/j.height,(0,f.t0)(r,j.width/j.height),S.projected.x,S.projected.y,Array.isArray(x)?x[0]:void 0,Array.isArray(x)?x[1]:void 0):1;return x&&(b.current.scale.setScalar(n),b.current.updateWorldMatrix(!1,!1)),t*(0,U.H_)(a,l[0]*S.scale.x*n,l[1]*S.scale.y*n,j.width/j.height,(0,f.t0)(r,j.width/j.height),i,S.projected.x,S.projected.y)};g(e=>{let t=C(e);if(b.current&&(b.current.visible=t>.001),T.current&&(T.current.uniforms.visibility.value=t),!E.current)return;let r=E.current.uniforms;r.visibility.value=t,r.uTime.value=f.t5.time,r.uScroll.value=e,r.uScene.value=6*e%1,r.uTransition.value=1-(0,d.vp)(e),r.uHeat.value=m?(0,d.vp)(e)*(0,d.vp)(f.t5.progress)*("high"===y?1:.55):0,r.uWarmth.value=1+.25*(0,d.Jp)(.5,.7,e)},-10);let L=v?d.Fx[y].segments:1;return(0,i.jsxs)("group",{ref:b,name:e,position:r,rotation:c,children:[!!v&&"low"!==y&&(0,i.jsxs)("mesh",{position:[.04,-.06,-.035],children:[(0,i.jsx)("planeGeometry",{args:[1.06*l[0],1.06*l[1]]}),(0,i.jsx)("shaderMaterial",{ref:T,uniforms:R,transparent:!0,side:n.$EB,depthWrite:!1,toneMapped:!1,vertexShader:A,fragmentShader:`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`})]}),(0,i.jsxs)("mesh",{children:[(0,i.jsx)("planeGeometry",{args:[l[0],l[1],L,L]}),(0,i.jsx)("shaderMaterial",{ref:E,uniforms:R,defines:{EFFECT_QUALITY:d.Fx[y].noise},transparent:!0,side:n.$EB,depthWrite:!1,toneMapped:!1,vertexShader:A,fragmentShader:k},y)]}),m&&"low"!==y&&(0,i.jsx)(Q,{quality:y,visibility:C})]})}function I({mobile:e,quality:t}){return(0,i.jsx)(i.Fragment,{children:[{id:"food-sate",src:"sate.webp",position:[e?.2:3.5,e?-3.2:-.3,-13],size:e?[3.1,2.48]:[5.4,4.32],rotation:[0,-.1,-.05],round:1,start:.145,end:.34,hot:!0},...e?[]:[{id:"food-rendang",src:"rendang.webp",position:[-3.5,-.3,-15.5],size:[3.6,2.88],rotation:[.06,.15,.06],round:1,start:.19,end:.335,hot:!0}],...e?[]:[{id:"food-vegetables",src:"vegetables.webp",position:[4.8,.2,-17],size:[3.6,2.88],rotation:[0,-.15,-.05],round:1,start:.225,end:.35}]].map(e=>(0,i.jsx)(O,{...e,quality:t},e.id))})}function B({mobile:e,quality:t}){let r=(0,a.useRef)(null);return g(e=>{r.current&&(r.current.rotation.x=(1-(0,U.e1)((e-.35)/.12))*Math.PI/2)},-20),(0,i.jsx)("group",{ref:r,position:[0,0,-26],children:[{id:"sharing-main",fit:!e||[.5,.18],src:"sharing.webp",position:[1.8*!e,.02,.4*!!e],size:e?[4.5,3.6]:[7,5.6],rotation:[-Math.PI/2,0,0],round:1,start:.305,end:.535},...e?[]:[{id:"sharing-sate",src:"sate.webp",position:[-3.2,.1,1.3],size:[3.1,2.48],rotation:[-Math.PI/2,0,-.2],round:1,start:.33,end:.515,hot:!0},{id:"sharing-rendang",src:"rendang.webp",position:[6,.14,-3.3],size:[2.8,2.24],rotation:[-Math.PI/2,0,.15],round:1,start:.34,end:.52,hot:!0}]].map(e=>(0,i.jsx)(O,{...e,quality:t},e.id))})}function $({quality:e,mobile:t}){let{gl:r,size:i,invalidate:l}=(0,o.D)(),u=(0,a.useRef)(!1),s=(0,a.useMemo)(()=>{if("low"===e)return null;let t=()=>{let e=new n.nWS(1,1,{type:n.OUM,depthBuffer:!0,stencilBuffer:!1});return e.depthTexture=new n.VCu(1,1),e.texture.generateMipmaps=!1,e},r=t(),i=t(),a=new n.BKk({uniforms:{uFrom:{value:r.texture},uTo:{value:i.texture},uDepthFrom:{value:r.depthTexture},uDepthTo:{value:i.depthTexture},uProgress:{value:0},uAspect:{value:1},uCenter:{value:new n.I9Y(.5,.5)},uNear:{value:.04},uFar:{value:110},uQuality:{value:d.Fx[e].noise},uScroll:{value:0}},vertexShader:C,fragmentShader:L,depthTest:!1,depthWrite:!1,toneMapped:!1}),o=new n.bdM(2,2),l=new n.Z58;return l.add(new n.eaF(o,a)),{from:r,to:i,material:a,geometry:o,scene:l,screenCamera:new n.qUd(-1,1,1,-1,0,1),viewCamera:new n.ubm(43,1,.04,110),position:new n.Pq0,target:new n.Pq0}},[e]);return(0,a.useLayoutEffect)(()=>{if(!s)return;let t=r.getPixelRatio()*d.Fx[e].targetScale,a=Math.min(1,1600/(i.width*t),Math.sqrt(("high"===e?125e4:72e4)/(i.width*i.height*t*t))),n=Math.max(1,Math.round(i.width*t*a)),o=Math.max(1,Math.round(i.height*t*a));s.from.setSize(n,o),s.to.setSize(n,o),s.material.uniforms.uAspect.value=i.width/i.height,s.viewCamera.aspect=i.width/i.height,s.viewCamera.updateProjectionMatrix(),l()},[s,r,i.width,i.height,e,l]),(0,a.useEffect)(()=>()=>{s&&(s.from.dispose(),s.to.dispose(),s.material.dispose(),s.geometry.dispose(),s.scene.clear())},[s]),(0,o.F)(({scene:e,camera:a})=>{let n=f.t5.progress,o=s&&(0,d.lx)(n),l=o&&"shader"===o.mode?o:void 0;if(!s||!l){m(n),r.setRenderTarget(null),r.render(e,a),u.current&&(s?.from.dispose(),s?.to.dispose()),u.current=!1;return}u.current=!0;let{progress:c,outgoing:v,incoming:p}=(0,d.vD)(n,l),h=(a,n)=>{(0,f.c5)(a,s.position,s.target,t),P(s.viewCamera,s.position,s.target,t,i.width/i.height),m(a),r.setRenderTarget(n),r.clear(),r.render(e,s.viewCamera)},g=r.getRenderTarget();try{h(v,s.from),h(p,s.to);let e=s.material.uniforms;e.uProgress.value=c,e.uScroll.value=n,e.uCenter.value.set(l.center[0],l.center[1]),r.setRenderTarget(null),r.render(s.scene,s.screenCamera)}finally{m(n),r.setRenderTarget(g)}},1),null}var H=r(1588);function N({mobile:e,quality:t}){let r=(0,a.useDeferredValue)(t);return(0,i.jsx)(j,{mobile:e,quality:r,symbol:"jepun",manifest:H})}var V=r(2058);function Y({mobile:e,quality:t}){let r=(0,a.useDeferredValue)(t);return(0,i.jsx)(j,{mobile:e,quality:r,symbol:"dwarapala",manifest:V})}function J({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[[{id:"heritage-sate",src:"sate.webp",position:[t?.5:6,t?-1.4:.3,-47],size:t?[3.2,2.56]:[5,4],rotation:[0,-.15,0],round:1,start:.49,end:.635},...t?[]:[{id:"heritage-sharing",src:"sharing.webp",position:[-.6,-1,-49],size:[3.6,2.88],rotation:[0,.1,0],round:1,start:.51,end:.62}]].map(t=>(0,i.jsx)(O,{...t,quality:e},t.id)),(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(Y,{mobile:t,quality:e})}),(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(N,{mobile:t,quality:e})})]})}function G({mobile:e,quality:t}){return(0,i.jsx)("group",{children:[{id:"booking-sharing",src:"sharing.webp",position:[2.7*!e,e?-1.7:-.4,-65],size:e?[3.8,3.04]:[6.4,5.12],rotation:[0,-.1,.03],round:1,start:.735,end:2},...e?[]:[{id:"booking-rice",src:"rice.webp",position:[-3,-2.5,-66],size:[2.8,2.24],rotation:[0,.1,0],round:1,start:.81,end:2,hot:!0}]].map(e=>(0,i.jsx)(O,{...e,quality:t},e.id))})}function Z({onReady:e}){let t=(0,o.D)(e=>e.invalidate);return(0,a.useEffect)(()=>(f.t5.invalidate=t,e(),()=>{f.t5.invalidate=void 0}),[t,e]),null}function K({onFailure:e}){let t=(0,o.D)(e=>e.gl);return(0,a.useEffect)(()=>{let r=t.domElement,i=t=>{t.preventDefault(),e()},a=t.debug.onShaderError;return t.debug.onShaderError=(t,r)=>{console.error("Bali Bali shader failed:",t.getProgramInfoLog(r)),queueMicrotask(e)},r.addEventListener("webglcontextlost",i),()=>{r.removeEventListener("webglcontextlost",i),t.debug.onShaderError=a}},[t,e]),null}function X({from:e,to:t,children:r}){let n=(0,a.useRef)(null);return g(r=>{n.current&&(n.current.visible=r>=e&&r<=t)}),(0,i.jsx)("group",{ref:n,children:r})}function ee({onReady:e,onFailure:t}){let[r,n]=(0,a.useState)(()=>window.innerWidth<768),o=(0,a.useMemo)(()=>{let e=navigator;return(0,d.oV)({mobile:r,cores:e.hardwareConcurrency,memory:e.deviceMemory,saveData:e.connection?.saveData})},[r]),[l,v]=(0,a.useState)(o);(0,a.useEffect)(()=>v(o),[o]),(0,a.useEffect)(()=>{let e=window.matchMedia("(max-width: 767px)"),t=()=>n(e.matches);return e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);let[p,h]=(0,a.useState)(0);return(0,a.useEffect)(()=>{f.t5.prepare=e=>h(t=>Math.max(t,e>.58?3:e>.38?2:+(e>.12))),u.preload((0,s.LY)("sharing.webp"));let e=window.setInterval(()=>h(e=>Math.max(e,f.t5.progress>.58?3:f.t5.progress>.38?2:+(f.t5.progress>.12))),250);return()=>{clearInterval(e),f.t5.prepare=void 0}},[]),(0,i.jsxs)(c.Hl,{"aria-hidden":"true",frameloop:"demand",dpr:Math.min(window.devicePixelRatio||1,d.Fx[l].dpr,r?1.2:1.65),camera:{position:[0,1,13],fov:43,near:.04,far:110},gl:{antialias:!r,alpha:!0,powerPreference:"high-performance"},children:[(0,i.jsx)(K,{onFailure:t}),(0,i.jsx)(F,{quality:l,ceiling:o,onQuality:v}),(0,i.jsx)(T,{quality:l}),(0,i.jsx)(D,{mobile:r}),(0,i.jsx)($,{quality:l,mobile:r}),(0,i.jsxs)(a.Suspense,{fallback:null,children:[(0,i.jsx)(X,{from:0,to:.36,children:(0,i.jsx)(I,{mobile:r,quality:l})}),(0,i.jsx)(X,{from:0,to:.45,children:(0,i.jsx)(E,{mobile:r,quality:l})}),(0,i.jsx)(Z,{onReady:e})]}),p>=1&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(X,{from:.18,to:.58,children:(0,i.jsx)(B,{mobile:r,quality:l})})}),p>=2&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(X,{from:.49,to:.79,children:(0,i.jsx)(J,{quality:l,mobile:r})})}),p>=3&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(X,{from:.62,to:1,children:(0,i.jsx)(G,{quality:l,mobile:r})})})]})}}}]);