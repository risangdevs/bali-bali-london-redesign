"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[452],{6977:(e,t,r)=>{r.d(t,{XR:()=>n,XW:()=>o});var i=r(5269),a=r(8750);let o={foliage:["#60372a","#b18a51","#815641"]};function n(e,t){let r="high"===t?24:"medium"===t?12:6,o="high"===t?8:"medium"===t?6:4,n=[[],[],[]],l=(e,t=0)=>{let r=e.index?e.toNonIndexed():e;if(r!==e&&e.dispose(),!r.getAttribute("color")){let e=new Float32Array(3*r.getAttribute("position").count).fill(1);r.setAttribute("color",new i.qtW(e,3))}r.clearGroups(),n[t].push(r)},s=(e,t,a=0)=>l(new i.j6(new i.B6O(e.map(e=>new i.Pq0(...e))),r,t,o,!1),a),u=(e,a,o,n,s,u,c=.04,d=!1)=>{let v=new i.ypk;v.moveTo(0,0),d?(v.bezierCurveTo(-(.9*n),.1*o,-(1.1*n),.28*o,-(.7*n),.36*o),v.bezierCurveTo(-(1.25*n),.38*o,-(.8*n),.58*o,-(.4*n),.62*o),v.bezierCurveTo(-(.8*n),.75*o,-(.4*n),.88*o,.15*n,o),v.bezierCurveTo(.7*n,.8*o,.95*n,.8*o,.55*n,.64*o),v.bezierCurveTo(1.1*n,.55*o,.9*n,.45*o,.6*n,.35*o),v.bezierCurveTo(n,.2*o,.4*n,.1*o,0,0)):(v.bezierCurveTo(-n,.25*o,-(.55*n),.8*o,0,o),v.bezierCurveTo(.8*n,.72*o,.6*n,.2*o,0,0));let f=new i.QCA(v,{depth:.012,bevelEnabled:"low"!==t,bevelSize:.0015,bevelThickness:.0015,bevelSegments:1,curveSegments:d?"high"===t?4:"medium"===t?3:2:r/2}),p=f.getAttribute("position");for(let e=0;e<p.count;e++){let t=p.getY(e)/o;p.setZ(e,p.getZ(e)+.014*Math.sin(t*Math.PI)+t*t*.012)}f.computeVertexNormals(),f.rotateZ(s).translate(e,a,c),l(f,u)};if("foliage"===e){let e=new i.ypk;e.moveTo(0,.48),e.bezierCurveTo(-.32,.48,-.47,.18,-.43,-.15),e.bezierCurveTo(-.4,-.43,-.2,-.49,0,-.47),e.bezierCurveTo(.3,-.49,.46,-.25,.43,.05),e.bezierCurveTo(.42,.3,.24,.48,0,.48);let a=new i.wAk;for(let o of(a.absellipse(0,0,.28,.36,0,2*Math.PI,!0),e.holes.push(a),((e,a=0,o=0)=>{l(new i.QCA(e,{depth:.075,steps:1,curveSegments:r/2,bevelEnabled:"low"!==t,bevelSegments:"high"===t?2:1,bevelSize:.003,bevelThickness:.003}).translate(0,0,o-.0375),a)})(e),[-1,1])){s([[.08*o,-.42,.054],[.34*o,-.25,.054],[.35*o,.1,.054],[.15*o,.38,.054],[0,.43,.054]],.009,1);for(let e=0;e<6;e++){let r=-1.16+e/5*2.4,i=o*Math.cos(r)*.34,a=.38*Math.sin(r);u(i,a,.18,.055,o*(-Math.PI/2+.9*r),e%2?0:2,.02,!0),"low"!==t&&u(i,a,.1,.03,o*(-.5+r),1,.063,!0),(1===e||4===e)&&s(Array.from({length:15},(e,t)=>{let r=t/14*Math.PI*2.15,n=.055*(1-t/18);return[i+o*(.025+Math.cos(r)*n),a+Math.sin(r)*n,.073]}),.0045,1)}}u(0,.37,.2,.07,0,0,.04,!0),u(0,-.37,.17,.065,Math.PI,0,.04,!0)}let c=n.map(e=>{let t=(0,a.pP)(e,!1);return e.forEach(e=>e.dispose()),t}),d=(0,a.pP)(c,!0);return c.forEach(e=>e.dispose()),d.computeBoundingBox(),d.computeBoundingSphere(),d}},9452:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ee});var i=r(5155),a=r(2115),o=r(5269),n=r(5860);let l=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function s(e,t){let r=(0,n.D)(e=>e.gl),i=(0,n.H)(o.Tap,l(e)?Object.values(e):e);return(0,a.useLayoutEffect)(()=>{null==t||t(i)},[t]),(0,a.useEffect)(()=>{if("initTexture"in r){let e=[];Array.isArray(i)?e=i:i instanceof o.gPd?e=[i]:l(i)&&(e=Object.values(i)),e.forEach(e=>{e instanceof o.gPd&&r.initTexture(e)})}},[r,i]),(0,a.useMemo)(()=>{if(!l(e))return i;{let t={},r=0;for(let a in e)t[a]=i[r++];return t}},[e,i])}s.preload=e=>n.H.preload(o.Tap,e),s.clear=e=>n.H.clear(o.Tap,e);var u=r(7601),c=r(6275),d=r(5250),v=r(3696);let f=new Set,p=[],h=()=>{p=[...f].sort((e,t)=>e.priority-t.priority)};function m(e){p.forEach(t=>t.update(e))}function g(e,t=0){let r=(0,a.useRef)(e);(0,a.useLayoutEffect)(()=>{r.current=e}),(0,a.useLayoutEffect)(()=>{let e=e=>r.current(e),i={update:e,priority:t};return f.add(i),h(),e(v.t5.progress),v.t5.invalidate?.(),()=>{f.delete(i),h()}},[t])}var x=r(8521),w=r(8930),y=r(6383);let b=new Map;function j({mobile:e,quality:t,symbol:r,manifest:n}){let l=`${u.yZ}models/${n.variants[t].file}`,{scene:s}=(0,w.p)(l,!1,!1),c=(0,a.useRef)(null),v=(0,y.R)(r,e),f=(0,a.useMemo)(()=>{let e=s.clone(!0),t=[];return e.traverse(e=>{if(!(e instanceof o.eaF))return;let r=e=>{let r=e.clone();return r.transparent=!0,r.side=o.$EB,t.push(r),r};e.material=Array.isArray(e.material)?e.material.map(r):r(e.material)}),{root:e,materials:t,owners:0}},[s]);return(0,a.useEffect)(()=>(f.owners++,b.set(s,(b.get(s)||0)+1),()=>{f.owners--,b.set(s,(b.get(s)||1)-1),queueMicrotask(()=>{if(f.owners||f.materials.forEach(e=>e.dispose()),0===b.get(s)){let e,t,r;b.delete(s),e=new Set,t=new Set,r=new Set,s.traverse(i=>{if(i instanceof o.eaF)for(let a of(e.add(i.geometry),Array.isArray(i.material)?i.material:[i.material]))t.add(a),Object.values(a).forEach(e=>{e instanceof o.gPd&&r.add(e)})}),e.forEach(e=>e.dispose()),t.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()),w.p.clear(l)}})}),[f,s,l]),g(e=>{let t=(0,d.Jp)(v.from,v.from+.025,e)*(1-(0,d.Jp)(v.to-.025,v.to,e));c.current&&(c.current.visible=t>.001),f.materials.forEach(e=>{e.opacity=t,e.depthWrite=t>.98})}),(0,i.jsx)("group",{ref:c,name:`cultural-${r}-scan`,position:v.position,rotation:v.rotation,scale:v.scale,children:(0,i.jsx)("primitive",{object:f.root,dispose:null})})}function M(e){return(0,i.jsx)(j,{...e,symbol:"gateway",manifest:x})}var S=r(7193);function T(e){return(0,i.jsx)(j,{...e,symbol:"penjor",manifest:S})}function E({mobile:e,quality:t}){let r=(0,a.useDeferredValue)(t);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(M,{mobile:e,quality:r}),(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(T,{mobile:e,quality:r})})]})}function q({quality:e}){let{scene:t,gl:r}=(0,n.D)(),l=(0,a.useRef)(null),s=(0,a.useRef)(null),u=(0,a.useMemo)(()=>({ivory:new o.Q1f("#f4ebdd"),heritage:new o.Q1f("#e0cab0"),evening:new o.Q1f("#e5d7c5"),current:new o.Q1f}),[]);return g(e=>{let i=(0,d.Jp)(.49,.59,e)*(1-(0,d.Jp)(.66,.77,e)),a=(0,d.Jp)(.66,.77,e)*(1-(0,d.Jp)(.83,.93,e));u.current.copy(u.ivory).lerp(u.heritage,i).lerp(u.evening,a),t.background=u.current,r.toneMappingExposure=1-.025*i,l.current&&(l.current.intensity=1.8-.12*a),s.current&&(s.current.intensity=2.4+.15*i)}),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("ambientLight",{ref:l,intensity:1.8}),(0,i.jsx)("directionalLight",{ref:s,position:[5,8,10],intensity:2.4,color:"#fff3df"}),"high"===e&&(0,i.jsx)("hemisphereLight",{args:["#fff8ed","#b66d4d",.3]})]})}function C({quality:e,ceiling:t,onQuality:r}){let{gl:i,invalidate:o}=(0,n.D)(),l=(0,a.useRef)(!0);(0,a.useRef)(0);let s=(0,a.useRef)(1/60),u=(0,a.useMemo)(()=>new d.BR(t,t),[t]);return(0,a.useEffect)(()=>{let e=i.domElement,t=()=>{u.reset(),!document.hidden&&l.current&&o()},r=new IntersectionObserver(([e])=>{l.current=e.isIntersecting,t()});return r.observe(e),document.addEventListener("visibilitychange",t),()=>{r.disconnect(),document.removeEventListener("visibilitychange",t)}},[i,o,u]),(0,a.useEffect)(()=>{i.domElement.dataset.quality=e},[i,e]),(0,n.F)((t,i)=>{if(document.hidden||!l.current)return void u.reset();v.t5.time+=Math.min(i,.05),i<.2&&(s.current+=(i-s.current)*.05);let a=u.sample(i);a!==e&&r(a),"low"!==e&&(0,d.Bx)(v.t5.progress)&&o()},-2),(0,n.F)((e,t)=>{},2),null}function P(e,t,r,i,a){e.position.copy(t);let o=(0,v.t0)(i,a);e.fov!==o&&(e.fov=o,e.updateProjectionMatrix()),e.lookAt(r),e.updateMatrixWorld()}function F({mobile:e}){let[t,r]=(0,a.useMemo)(()=>[new o.Pq0,new o.Pq0],[]),i=(0,n.D)(e=>e.size);return(0,n.F)(({camera:a})=>{(0,v.c5)(v.t5.progress,t,r,e),P(a,t,r,e,i.width/i.height)},-1),null}var R=r(6318);let A=`
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise21(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),
             mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
`,U=`
varying vec2 vUv;
void main() { vUv=uv; gl_Position=vec4(position.xy,0.,1.); }
`,z=`
uniform sampler2D uFrom, uTo, uDepthFrom, uDepthTo;
uniform float uProgress, uAspect, uNear, uFar, uQuality, uScroll;
uniform vec2 uCenter;
varying vec2 vUv;
${A}
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
`,L=`
uniform sampler2D photo;
uniform vec2 uCover;
uniform float rounded, visibility, uTime, uHeat, uQuality, uWarmth, uScroll, uScene, uTransition;
varying vec2 vUv;
varying float vRelief;
${A}
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
${A}
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
`,W=`
uniform float uTime, uOpacity;
varying float vLife;
varying float vSeed;
${A}
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
`,_=new Map;function I({quality:e,visibility:t}){let r=(0,a.useRef)(null),o=(0,a.useRef)(null),{size:l,gl:s}=(0,n.D)(),u=d.Fx[e].particles,c=(0,a.useMemo)(()=>{let e=new Float32Array(4*u);for(let t=0;t<e.length;t++)e[t]=(16807*t+137)%65521/65521;return e},[u]),f=(0,a.useMemo)(()=>new Float32Array(3*u),[u]),p=(0,a.useMemo)(()=>({uTime:{value:0},uOpacity:{value:0},uPointScale:{value:1},uQuality:{value:2}}),[]);return(g(i=>{let a=t(i)*(0,d.vp)(i)*(0,d.vp)(v.t5.progress)*("high"===e?.105:.075);if(r.current&&(r.current.visible=a>.002&&"low"!==e),!o.current)return;let n=o.current.uniforms;n.uOpacity.value=a,n.uTime.value=v.t5.time,n.uPointScale.value=l.height*s.getPixelRatio()*1.15,n.uQuality.value=d.Fx[e].noise}),u)?(0,i.jsxs)("points",{ref:r,frustumCulled:!1,renderOrder:4,children:[(0,i.jsxs)("bufferGeometry",{children:[(0,i.jsx)("bufferAttribute",{attach:"attributes-position",args:[f,3]}),(0,i.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[c,4]})]}),(0,i.jsx)("shaderMaterial",{ref:o,uniforms:p,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:k,fragmentShader:W})]}):null}function Q({id:e,src:t,position:r,size:l=[6,4.8],rotation:c=[0,0,0],round:f=0,start:p=-1,end:h=2,hot:m=!1,fit:x=!1,quality:w="high"}){var y;let b=(0,a.useRef)(null),j=(0,n.D)(e=>e.size),M=(0,a.useMemo)(()=>new o.ubm((0,v.t0)(j.width<768,j.width/j.height),j.width/j.height,.04,110),[j.width,j.height]),S=(0,a.useMemo)(()=>({camera:new o.Pq0,target:new o.Pq0,center:new o.Pq0,normal:new o.Pq0,toLens:new o.Pq0,scale:new o.Pq0,projected:new o.Pq0}),[]),T=s((0,u.LY)(t));T.colorSpace=o.er$,y=(0,u.LY)(t),(0,a.useEffect)(()=>(_.set(T,(_.get(T)||0)+1),()=>{_.set(T,(_.get(T)||1)-1),queueMicrotask(()=>{0===_.get(T)&&(_.delete(T),T.dispose(),s.clear(y))})}),[T,y]);let E=(0,a.useRef)(null),q=(0,a.useRef)(null),C=T.image,P=C.width/C.height,F=l[0]/l[1],A=(0,a.useMemo)(()=>({photo:{value:T},rounded:{value:f},visibility:{value:1},uCover:{value:new o.I9Y(Math.min(1,F/P),Math.min(1,P/F))},uRelief:{value:"low"!==w&&f?.014*l[0]:0},uTime:{value:0},uHeat:{value:0},uQuality:{value:d.Fx[w].noise},uWarmth:{value:1},uScroll:{value:0},uScene:{value:0},uTransition:{value:0}}),[T,f,P,F,w,l[0]]),U=e=>{let t=(0,R.Pc)(e,p,h);if(!t||!b.current)return 0;let r=j.width<768;(0,v.c5)(e,S.camera,S.target,r),x&&b.current.scale.setScalar(1),b.current.updateWorldMatrix(!0,!1),b.current.getWorldPosition(S.center),b.current.getWorldScale(S.scale),S.normal.set(0,0,1).transformDirection(b.current.matrixWorld),S.toLens.copy(S.camera).sub(S.center);let i=S.normal.dot(S.toLens)/Math.max(.001,S.toLens.length()),a=S.toLens.negate().dot(S.target.sub(S.camera).normalize());M.position.copy(S.camera),M.lookAt(S.toLens.copy(S.camera).add(S.target)),M.updateMatrixWorld(),S.projected.copy(S.center).project(M);let o=x?(0,R.UV)(a,l[0]*S.scale.x,l[1]*S.scale.y,j.width/j.height,(0,v.t0)(r,j.width/j.height),S.projected.x,S.projected.y,Array.isArray(x)?x[0]:void 0,Array.isArray(x)?x[1]:void 0):1;return x&&(b.current.scale.setScalar(o),b.current.updateWorldMatrix(!1,!1)),t*(0,R.H_)(a,l[0]*S.scale.x*o,l[1]*S.scale.y*o,j.width/j.height,(0,v.t0)(r,j.width/j.height),i,S.projected.x,S.projected.y)};g(e=>{let t=U(e);if(b.current&&(b.current.visible=t>.001),q.current&&(q.current.uniforms.visibility.value=t),!E.current)return;let r=E.current.uniforms;r.visibility.value=t,r.uTime.value=v.t5.time,r.uScroll.value=e,r.uScene.value=6*e%1,r.uTransition.value=1-(0,d.vp)(e),r.uHeat.value=m?(0,d.vp)(e)*(0,d.vp)(v.t5.progress)*("high"===w?1:.55):0,r.uWarmth.value=1+.25*(0,d.Jp)(.5,.7,e)},-10);let z=f?d.Fx[w].segments:1;return(0,i.jsxs)("group",{ref:b,name:e,position:r,rotation:c,children:[!!f&&"low"!==w&&(0,i.jsxs)("mesh",{position:[.04,-.06,-.035],children:[(0,i.jsx)("planeGeometry",{args:[1.06*l[0],1.06*l[1]]}),(0,i.jsx)("shaderMaterial",{ref:q,uniforms:A,transparent:!0,side:o.$EB,depthWrite:!1,toneMapped:!1,vertexShader:D,fragmentShader:`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`})]}),(0,i.jsxs)("mesh",{children:[(0,i.jsx)("planeGeometry",{args:[l[0],l[1],z,z]}),(0,i.jsx)("shaderMaterial",{ref:E,uniforms:A,defines:{EFFECT_QUALITY:d.Fx[w].noise},transparent:!0,side:o.$EB,depthWrite:!1,toneMapped:!1,vertexShader:D,fragmentShader:L},w)]}),m&&"low"!==w&&(0,i.jsx)(I,{quality:w,visibility:U})]})}function B({mobile:e,quality:t}){return(0,i.jsx)(i.Fragment,{children:[{id:"food-sate",src:"sate.webp",position:[e?.2:3.5,e?-3.2:-.3,-13],size:e?[3.1,2.48]:[5.4,4.32],rotation:[0,-.1,-.05],round:1,start:.145,end:.34,hot:!0},...e?[]:[{id:"food-rendang",src:"rendang.webp",position:[-3.5,-.3,-15.5],size:[3.6,2.88],rotation:[.06,.15,.06],round:1,start:.19,end:.335,hot:!0}],...e?[]:[{id:"food-vegetables",src:"vegetables.webp",position:[4.8,.2,-17],size:[3.6,2.88],rotation:[0,-.15,-.05],round:1,start:.225,end:.35}]].map(e=>(0,i.jsx)(Q,{...e,quality:t},e.id))})}function O({mobile:e,quality:t}){let r=(0,a.useRef)(null);return g(e=>{r.current&&(r.current.rotation.x=(1-(0,R.e1)((e-.35)/.12))*Math.PI/2)},-20),(0,i.jsx)("group",{ref:r,position:[0,0,-26],children:[{id:"sharing-main",fit:!e||[.5,.18],src:"sharing.webp",position:[1.8*!e,.02,.4*!!e],size:e?[4.5,3.6]:[7,5.6],rotation:[-Math.PI/2,0,0],round:1,start:.305,end:.535},...e?[]:[{id:"sharing-sate",src:"sate.webp",position:[-3.2,.1,1.3],size:[3.1,2.48],rotation:[-Math.PI/2,0,-.2],round:1,start:.33,end:.515,hot:!0},{id:"sharing-rendang",src:"rendang.webp",position:[6,.14,-3.3],size:[2.8,2.24],rotation:[-Math.PI/2,0,.15],round:1,start:.34,end:.52,hot:!0}]].map(e=>(0,i.jsx)(Q,{...e,quality:t},e.id))})}function $({quality:e,mobile:t}){let{gl:r,size:i,invalidate:l}=(0,n.D)(),s=(0,a.useRef)(!1),u=(0,a.useMemo)(()=>{if("low"===e)return null;let t=()=>{let e=new o.nWS(1,1,{type:o.OUM,depthBuffer:!0,stencilBuffer:!1});return e.depthTexture=new o.VCu(1,1),e.texture.generateMipmaps=!1,e},r=t(),i=t(),a=new o.BKk({uniforms:{uFrom:{value:r.texture},uTo:{value:i.texture},uDepthFrom:{value:r.depthTexture},uDepthTo:{value:i.depthTexture},uProgress:{value:0},uAspect:{value:1},uCenter:{value:new o.I9Y(.5,.5)},uNear:{value:.04},uFar:{value:110},uQuality:{value:d.Fx[e].noise},uScroll:{value:0}},vertexShader:U,fragmentShader:z,depthTest:!1,depthWrite:!1,toneMapped:!1}),n=new o.bdM(2,2),l=new o.Z58;return l.add(new o.eaF(n,a)),{from:r,to:i,material:a,geometry:n,scene:l,screenCamera:new o.qUd(-1,1,1,-1,0,1),viewCamera:new o.ubm(43,1,.04,110),position:new o.Pq0,target:new o.Pq0}},[e]);return(0,a.useLayoutEffect)(()=>{if(!u)return;let t=r.getPixelRatio()*d.Fx[e].targetScale,a=Math.min(1,1600/(i.width*t),Math.sqrt(("high"===e?125e4:72e4)/(i.width*i.height*t*t))),o=Math.max(1,Math.round(i.width*t*a)),n=Math.max(1,Math.round(i.height*t*a));u.from.setSize(o,n),u.to.setSize(o,n),u.material.uniforms.uAspect.value=i.width/i.height,u.viewCamera.aspect=i.width/i.height,u.viewCamera.updateProjectionMatrix(),l()},[u,r,i.width,i.height,e,l]),(0,a.useEffect)(()=>()=>{u&&(u.from.dispose(),u.to.dispose(),u.material.dispose(),u.geometry.dispose(),u.scene.clear())},[u]),(0,n.F)(({scene:e,camera:a})=>{let o=v.t5.progress,n=u&&(0,d.lx)(o),l=n&&"shader"===n.mode?n:void 0;if(!u||!l){m(o),r.setRenderTarget(null),r.render(e,a),s.current&&(u?.from.dispose(),u?.to.dispose()),s.current=!1;return}s.current=!0;let{progress:c,outgoing:f,incoming:p}=(0,d.vD)(o,l),h=(a,o)=>{(0,v.c5)(a,u.position,u.target,t),P(u.viewCamera,u.position,u.target,t,i.width/i.height),m(a),r.setRenderTarget(o),r.clear(),r.render(e,u.viewCamera)},g=r.getRenderTarget();try{h(f,u.from),h(p,u.to);let e=u.material.uniforms;e.uProgress.value=c,e.uScroll.value=o,e.uCenter.value.set(l.center[0],l.center[1]),r.setRenderTarget(null),r.render(u.scene,u.screenCamera)}finally{m(o),r.setRenderTarget(g)}},1),null}var N=r(1588);function H({mobile:e,quality:t}){let r=(0,a.useDeferredValue)(t);return(0,i.jsx)(j,{mobile:e,quality:r,symbol:"jepun",manifest:N})}var J=r(6977);function V({symbol:e,quality:t,scale:r,position:n,rotation:l,from:s,to:u}){let c=(0,a.useRef)(null),v=(0,a.useRef)([]),f=(0,a.useMemo)(()=>(0,J.XR)(e,t),[e,t]);return(0,a.useEffect)(()=>()=>f.dispose(),[f]),g(e=>{let t=(0,d.Jp)(s,s+.025,e)*(1-(0,d.Jp)(u-.025,u,e));c.current&&(c.current.visible=t>.001),v.current.forEach(e=>{e&&(e.opacity=t,e.depthWrite=t>.98)})}),(0,i.jsx)("group",{ref:c,name:`cultural-${e}`,position:n,rotation:l,scale:r,children:(0,i.jsxs)("mesh",{children:[(0,i.jsx)("primitive",{attach:"geometry",object:f}),J.XW[e].map((t,r)=>(0,i.jsx)("meshStandardMaterial",{ref:e=>{v.current[r]=e},attach:`material-${r}`,color:t,vertexColors:!0,roughness:.66,metalness:.2*("foliage"===e&&1===r),side:o.$EB,transparent:!0},r))]})})}function Y({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[[{id:"heritage-sate",src:"sate.webp",position:[t?.5:6,t?-1.4:.3,-47],size:t?[3.2,2.56]:[5,4],rotation:[0,-.15,0],round:1,start:.49,end:.635},...t?[]:[{id:"heritage-sharing",src:"sharing.webp",position:[-.6,-1,-49],size:[3.6,2.88],rotation:[0,.1,0],round:1,start:.51,end:.62}]].map(t=>(0,i.jsx)(Q,{...t,quality:e},t.id)),(0,i.jsx)(V,{...(0,y.R)("foliage",t),quality:e}),(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(H,{mobile:t,quality:e})})]})}function Z({mobile:e,quality:t}){return(0,i.jsx)("group",{children:[{id:"booking-sharing",src:"sharing.webp",position:[2.7*!e,e?-1.7:-.4,-65],size:e?[3.8,3.04]:[6.4,5.12],rotation:[0,-.1,.03],round:1,start:.735,end:2},...e?[]:[{id:"booking-rice",src:"rice.webp",position:[-3,-2.5,-66],size:[2.8,2.24],rotation:[0,.1,0],round:1,start:.81,end:2,hot:!0}]].map(e=>(0,i.jsx)(Q,{...e,quality:t},e.id))})}function G({onReady:e}){let t=(0,n.D)(e=>e.invalidate);return(0,a.useEffect)(()=>(v.t5.invalidate=t,e(),()=>{v.t5.invalidate=void 0}),[t,e]),null}function X({onFailure:e}){let t=(0,n.D)(e=>e.gl);return(0,a.useEffect)(()=>{let r=t.domElement,i=t=>{t.preventDefault(),e()},a=t.debug.onShaderError;return t.debug.onShaderError=(t,r)=>{console.error("Bali Bali shader failed:",t.getProgramInfoLog(r)),queueMicrotask(e)},r.addEventListener("webglcontextlost",i),()=>{r.removeEventListener("webglcontextlost",i),t.debug.onShaderError=a}},[t,e]),null}function K({from:e,to:t,children:r}){let o=(0,a.useRef)(null);return g(r=>{o.current&&(o.current.visible=r>=e&&r<=t)}),(0,i.jsx)("group",{ref:o,children:r})}function ee({onReady:e,onFailure:t}){let[r,o]=(0,a.useState)(()=>window.innerWidth<768),n=(0,a.useMemo)(()=>{let e=navigator;return(0,d.oV)({mobile:r,cores:e.hardwareConcurrency,memory:e.deviceMemory,saveData:e.connection?.saveData})},[r]),[l,f]=(0,a.useState)(n);(0,a.useEffect)(()=>f(n),[n]),(0,a.useEffect)(()=>{let e=window.matchMedia("(max-width: 767px)"),t=()=>o(e.matches);return e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);let[p,h]=(0,a.useState)(0);return(0,a.useEffect)(()=>{v.t5.prepare=e=>h(t=>Math.max(t,e>.58?3:e>.38?2:+(e>.12))),s.preload((0,u.LY)("sharing.webp"));let e=window.setInterval(()=>h(e=>Math.max(e,v.t5.progress>.58?3:v.t5.progress>.38?2:+(v.t5.progress>.12))),250);return()=>{clearInterval(e),v.t5.prepare=void 0}},[]),(0,i.jsxs)(c.Hl,{"aria-hidden":"true",frameloop:"demand",dpr:Math.min(window.devicePixelRatio||1,d.Fx[l].dpr,r?1.2:1.65),camera:{position:[0,1,13],fov:43,near:.04,far:110},gl:{antialias:!r,alpha:!0,powerPreference:"high-performance"},children:[(0,i.jsx)(X,{onFailure:t}),(0,i.jsx)(C,{quality:l,ceiling:n,onQuality:f}),(0,i.jsx)(q,{quality:l}),(0,i.jsx)(F,{mobile:r}),(0,i.jsx)($,{quality:l,mobile:r}),(0,i.jsxs)(a.Suspense,{fallback:null,children:[(0,i.jsx)(K,{from:0,to:.36,children:(0,i.jsx)(B,{mobile:r,quality:l})}),(0,i.jsx)(K,{from:0,to:.45,children:(0,i.jsx)(E,{mobile:r,quality:l})}),(0,i.jsx)(G,{onReady:e})]}),p>=1&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(K,{from:.18,to:.58,children:(0,i.jsx)(O,{mobile:r,quality:l})})}),p>=2&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(K,{from:.49,to:.79,children:(0,i.jsx)(Y,{quality:l,mobile:r})})}),p>=3&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(K,{from:.62,to:1,children:(0,i.jsx)(Z,{quality:l,mobile:r})})})]})}}}]);