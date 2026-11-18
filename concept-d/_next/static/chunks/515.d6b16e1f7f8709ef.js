"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[515],{2515:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ee});var i=r(5155),a=r(2115),o=r(602),n=r(7601),l=r(5860),s=r(6275),u=r(5250),c=r(3696);let d=new Set,v=[],f=()=>{v=[...d].sort((e,t)=>e.priority-t.priority)};function p(e){v.forEach(t=>t.update(e))}function h(e,t=0){let r=(0,a.useRef)(e);(0,a.useLayoutEffect)(()=>{r.current=e}),(0,a.useLayoutEffect)(()=>{let e=e=>r.current(e),i={update:e,priority:t};return d.add(i),f(),e(c.t5.progress),c.t5.invalidate?.(),()=>{d.delete(i),f()}},[t])}var m=r(8521),g=r(8930),x=r(5269),w=r(6383);let y=new Map;function b({mobile:e,quality:t,symbol:r,manifest:o}){let l=`${n.yZ}models/${o.variants[t].file}`,{scene:s}=(0,g.p)(l,!1,!1),c=(0,a.useRef)(null),d=(0,w.R)(r,e),v=(0,a.useMemo)(()=>{let e=s.clone(!0),t=[];return e.traverse(e=>{if(!(e instanceof x.eaF))return;let r=e=>{let r=e.clone();return r.transparent=!0,r.side=x.$EB,t.push(r),r};e.material=Array.isArray(e.material)?e.material.map(r):r(e.material)}),{root:e,materials:t,owners:0}},[s]);return(0,a.useEffect)(()=>(v.owners++,y.set(s,(y.get(s)||0)+1),()=>{v.owners--,y.set(s,(y.get(s)||1)-1),queueMicrotask(()=>{if(v.owners||v.materials.forEach(e=>e.dispose()),0===y.get(s)){let e,t,r;y.delete(s),e=new Set,t=new Set,r=new Set,s.traverse(i=>{if(i instanceof x.eaF)for(let a of(e.add(i.geometry),Array.isArray(i.material)?i.material:[i.material]))t.add(a),Object.values(a).forEach(e=>{e instanceof x.gPd&&r.add(e)})}),e.forEach(e=>e.dispose()),t.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()),g.p.clear(l)}})}),[v,s,l]),h(e=>{let t=(0,u.Jp)(d.from,d.from+.025,e)*(1-(0,u.Jp)(d.to-.025,d.to,e));c.current&&(c.current.visible=t>.001),v.materials.forEach(e=>{e.opacity=t,e.depthWrite=t>.98})}),(0,i.jsx)("group",{ref:c,name:`cultural-${r}-scan`,position:d.position,rotation:d.rotation,scale:d.scale,children:(0,i.jsx)("primitive",{object:v.root,dispose:null})})}function j(e){return(0,i.jsx)(b,{...e,symbol:"gateway",manifest:m})}var M=r(7193);function S(e){return(0,i.jsx)(b,{...e,symbol:"penjor",manifest:M})}function T({mobile:e,quality:t}){let r=(0,a.useDeferredValue)(t);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(j,{mobile:e,quality:r}),(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(S,{mobile:e,quality:r})})]})}function q({quality:e}){let{scene:t,gl:r}=(0,l.D)(),o=(0,a.useRef)(null),n=(0,a.useRef)(null),s=(0,a.useMemo)(()=>({ivory:new x.Q1f("#f4ebdd"),heritage:new x.Q1f("#e0cab0"),evening:new x.Q1f("#e5d7c5"),current:new x.Q1f}),[]);return h(e=>{let i=(0,u.Jp)(.49,.59,e)*(1-(0,u.Jp)(.66,.77,e)),a=(0,u.Jp)(.66,.77,e)*(1-(0,u.Jp)(.83,.93,e));s.current.copy(s.ivory).lerp(s.heritage,i).lerp(s.evening,a),t.background=s.current,r.toneMappingExposure=1-.025*i,o.current&&(o.current.intensity=1.8-.12*a),n.current&&(n.current.intensity=2.4+.15*i)}),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("ambientLight",{ref:o,intensity:1.8}),(0,i.jsx)("directionalLight",{ref:n,position:[5,8,10],intensity:2.4,color:"#fff3df"}),"high"===e&&(0,i.jsx)("hemisphereLight",{args:["#fff8ed","#b66d4d",.3]})]})}function E({quality:e,ceiling:t,onQuality:r}){let{gl:i,invalidate:o}=(0,l.D)(),n=(0,a.useRef)(!0);(0,a.useRef)(0);let s=(0,a.useRef)(1/60),d=(0,a.useMemo)(()=>new u.BR(t,t),[t]);return(0,a.useEffect)(()=>{let e=i.domElement,t=()=>{d.reset(),!document.hidden&&n.current&&o()},r=new IntersectionObserver(([e])=>{n.current=e.isIntersecting,t()});return r.observe(e),document.addEventListener("visibilitychange",t),()=>{r.disconnect(),document.removeEventListener("visibilitychange",t)}},[i,o,d]),(0,a.useEffect)(()=>{i.domElement.dataset.quality=e},[i,e]),(0,l.F)((t,i)=>{if(document.hidden||!n.current)return void d.reset();c.t5.time+=Math.min(i,.05),i<.2&&(s.current+=(i-s.current)*.05);let a=d.sample(i);a!==e&&r(a),"low"!==e&&(0,u.Bx)(c.t5.progress)&&o()},-2),(0,l.F)((e,t)=>{},2),null}function C(e,t,r,i,a){e.position.copy(t);let o=(0,c.t0)(i,a);e.fov!==o&&(e.fov=o,e.updateProjectionMatrix()),e.lookAt(r),e.updateMatrixWorld()}function P({mobile:e}){let[t,r]=(0,a.useMemo)(()=>[new x.Pq0,new x.Pq0],[]),i=(0,l.D)(e=>e.size);return(0,l.F)(({camera:a})=>{(0,c.c5)(c.t5.progress,t,r,e),C(a,t,r,e,i.width/i.height)},-1),null}var F=r(6318);let R=`
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise21(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),
             mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
`,z=`
varying vec2 vUv;
void main() { vUv=uv; gl_Position=vec4(position.xy,0.,1.); }
`,U=`
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
`,A=`
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
`,L=`
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
`,k=`
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
`,_=new Map;function I({quality:e,visibility:t}){let r=(0,a.useRef)(null),o=(0,a.useRef)(null),{size:n,gl:s}=(0,l.D)(),d=u.Fx[e].particles,v=(0,a.useMemo)(()=>{let e=new Float32Array(4*d);for(let t=0;t<e.length;t++)e[t]=(16807*t+137)%65521/65521;return e},[d]),f=(0,a.useMemo)(()=>new Float32Array(3*d),[d]),p=(0,a.useMemo)(()=>({uTime:{value:0},uOpacity:{value:0},uPointScale:{value:1},uQuality:{value:2}}),[]);return(h(i=>{let a=t(i)*(0,u.vp)(i)*(0,u.vp)(c.t5.progress)*("high"===e?.105:.075);if(r.current&&(r.current.visible=a>.002&&"low"!==e),!o.current)return;let l=o.current.uniforms;l.uOpacity.value=a,l.uTime.value=c.t5.time,l.uPointScale.value=n.height*s.getPixelRatio()*1.15,l.uQuality.value=u.Fx[e].noise}),d)?(0,i.jsxs)("points",{ref:r,frustumCulled:!1,renderOrder:4,children:[(0,i.jsxs)("bufferGeometry",{children:[(0,i.jsx)("bufferAttribute",{attach:"attributes-position",args:[f,3]}),(0,i.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[v,4]})]}),(0,i.jsx)("shaderMaterial",{ref:o,uniforms:p,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:L,fragmentShader:k})]}):null}function W({id:e,src:t,position:r,size:s=[6,4.8],rotation:d=[0,0,0],round:v=0,start:f=-1,end:p=2,hot:m=!1,fit:g=!1,quality:w="high"}){var y;let b=(0,a.useRef)(null),j=(0,l.D)(e=>e.size),M=(0,a.useMemo)(()=>new x.ubm((0,c.t0)(j.width<768,j.width/j.height),j.width/j.height,.04,110),[j.width,j.height]),S=(0,a.useMemo)(()=>({camera:new x.Pq0,target:new x.Pq0,center:new x.Pq0,normal:new x.Pq0,toLens:new x.Pq0,scale:new x.Pq0,projected:new x.Pq0}),[]),T=(0,o.zo)((0,n.LY)(t));T.colorSpace=x.er$,y=(0,n.LY)(t),(0,a.useEffect)(()=>(_.set(T,(_.get(T)||0)+1),()=>{_.set(T,(_.get(T)||1)-1),queueMicrotask(()=>{0===_.get(T)&&(_.delete(T),T.dispose(),o.zo.clear(y))})}),[T,y]);let q=(0,a.useRef)(null),E=(0,a.useRef)(null),C=T.image,P=C.width/C.height,R=s[0]/s[1],z=(0,a.useMemo)(()=>({photo:{value:T},rounded:{value:v},visibility:{value:1},uCover:{value:new x.I9Y(Math.min(1,R/P),Math.min(1,P/R))},uRelief:{value:"low"!==w&&v?.014*s[0]:0},uTime:{value:0},uHeat:{value:0},uQuality:{value:u.Fx[w].noise},uWarmth:{value:1},uScroll:{value:0},uScene:{value:0},uTransition:{value:0}}),[T,v,P,R,w,s[0]]),U=e=>{let t=(0,F.Pc)(e,f,p);if(!t||!b.current)return 0;let r=j.width<768;(0,c.c5)(e,S.camera,S.target,r),g&&b.current.scale.setScalar(1),b.current.updateWorldMatrix(!0,!1),b.current.getWorldPosition(S.center),b.current.getWorldScale(S.scale),S.normal.set(0,0,1).transformDirection(b.current.matrixWorld),S.toLens.copy(S.camera).sub(S.center);let i=S.normal.dot(S.toLens)/Math.max(.001,S.toLens.length()),a=S.toLens.negate().dot(S.target.sub(S.camera).normalize());M.position.copy(S.camera),M.lookAt(S.toLens.copy(S.camera).add(S.target)),M.updateMatrixWorld(),S.projected.copy(S.center).project(M);let o=g?(0,F.UV)(a,s[0]*S.scale.x,s[1]*S.scale.y,j.width/j.height,(0,c.t0)(r,j.width/j.height),S.projected.x,S.projected.y,Array.isArray(g)?g[0]:void 0,Array.isArray(g)?g[1]:void 0):1;return g&&(b.current.scale.setScalar(o),b.current.updateWorldMatrix(!1,!1)),t*(0,F.H_)(a,s[0]*S.scale.x*o,s[1]*S.scale.y*o,j.width/j.height,(0,c.t0)(r,j.width/j.height),i,S.projected.x,S.projected.y)};h(e=>{let t=U(e);if(b.current&&(b.current.visible=t>.001),E.current&&(E.current.uniforms.visibility.value=t),!q.current)return;let r=q.current.uniforms;r.visibility.value=t,r.uTime.value=c.t5.time,r.uScroll.value=e,r.uScene.value=6*e%1,r.uTransition.value=1-(0,u.vp)(e),r.uHeat.value=m?(0,u.vp)(e)*(0,u.vp)(c.t5.progress)*("high"===w?1:.55):0,r.uWarmth.value=1+.25*(0,u.Jp)(.5,.7,e)},-10);let L=v?u.Fx[w].segments:1;return(0,i.jsxs)("group",{ref:b,name:e,position:r,rotation:d,children:[!!v&&"low"!==w&&(0,i.jsxs)("mesh",{position:[.04,-.06,-.035],children:[(0,i.jsx)("planeGeometry",{args:[1.06*s[0],1.06*s[1]]}),(0,i.jsx)("shaderMaterial",{ref:E,uniforms:z,transparent:!0,side:x.$EB,depthWrite:!1,toneMapped:!1,vertexShader:D,fragmentShader:`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`})]}),(0,i.jsxs)("mesh",{children:[(0,i.jsx)("planeGeometry",{args:[s[0],s[1],L,L]}),(0,i.jsx)("shaderMaterial",{ref:q,uniforms:z,defines:{EFFECT_QUALITY:u.Fx[w].noise},transparent:!0,side:x.$EB,depthWrite:!1,toneMapped:!1,vertexShader:D,fragmentShader:A},w)]}),m&&"low"!==w&&(0,i.jsx)(I,{quality:w,visibility:U})]})}function Q({mobile:e,quality:t}){return(0,i.jsx)(i.Fragment,{children:[{id:"food-sate",src:"sate.webp",position:[e?.2:3.5,e?-3.2:-.3,-13],size:e?[3.1,2.48]:[5.4,4.32],rotation:[0,-.1,-.05],round:1,start:.145,end:.34,hot:!0},...e?[]:[{id:"food-rendang",src:"rendang.webp",position:[-3.5,-.3,-15.5],size:[3.6,2.88],rotation:[.06,.15,.06],round:1,start:.19,end:.335,hot:!0}],...e?[]:[{id:"food-vegetables",src:"vegetables.webp",position:[4.8,.2,-17],size:[3.6,2.88],rotation:[0,-.15,-.05],round:1,start:.225,end:.35}]].map(e=>(0,i.jsx)(W,{...e,quality:t},e.id))})}function B({mobile:e,quality:t}){let r=(0,a.useRef)(null);return h(e=>{r.current&&(r.current.rotation.x=(1-(0,F.e1)((e-.35)/.12))*Math.PI/2)},-20),(0,i.jsx)("group",{ref:r,position:[0,0,-26],children:[{id:"sharing-main",fit:!e||[.5,.18],src:"sharing.webp",position:[1.8*!e,.02,.4*!!e],size:e?[4.5,3.6]:[7,5.6],rotation:[-Math.PI/2,0,0],round:1,start:.305,end:.535},...e?[]:[{id:"sharing-sate",src:"sate.webp",position:[-3.2,.1,1.3],size:[3.1,2.48],rotation:[-Math.PI/2,0,-.2],round:1,start:.33,end:.515,hot:!0},{id:"sharing-rendang",src:"rendang.webp",position:[6,.14,-3.3],size:[2.8,2.24],rotation:[-Math.PI/2,0,.15],round:1,start:.34,end:.52,hot:!0}]].map(e=>(0,i.jsx)(W,{...e,quality:t},e.id))})}function $({quality:e,mobile:t}){let{gl:r,size:i,invalidate:o}=(0,l.D)(),n=(0,a.useRef)(!1),s=(0,a.useMemo)(()=>{if("low"===e)return null;let t=()=>{let e=new x.nWS(1,1,{type:x.OUM,depthBuffer:!0,stencilBuffer:!1});return e.depthTexture=new x.VCu(1,1),e.texture.generateMipmaps=!1,e},r=t(),i=t(),a=new x.BKk({uniforms:{uFrom:{value:r.texture},uTo:{value:i.texture},uDepthFrom:{value:r.depthTexture},uDepthTo:{value:i.depthTexture},uProgress:{value:0},uAspect:{value:1},uCenter:{value:new x.I9Y(.5,.5)},uNear:{value:.04},uFar:{value:110},uQuality:{value:u.Fx[e].noise},uScroll:{value:0}},vertexShader:z,fragmentShader:U,depthTest:!1,depthWrite:!1,toneMapped:!1}),o=new x.bdM(2,2),n=new x.Z58;return n.add(new x.eaF(o,a)),{from:r,to:i,material:a,geometry:o,scene:n,screenCamera:new x.qUd(-1,1,1,-1,0,1),viewCamera:new x.ubm(43,1,.04,110),position:new x.Pq0,target:new x.Pq0}},[e]);return(0,a.useLayoutEffect)(()=>{if(!s)return;let t=r.getPixelRatio()*u.Fx[e].targetScale,a=Math.min(1,1600/(i.width*t),Math.sqrt(("high"===e?125e4:72e4)/(i.width*i.height*t*t))),n=Math.max(1,Math.round(i.width*t*a)),l=Math.max(1,Math.round(i.height*t*a));s.from.setSize(n,l),s.to.setSize(n,l),s.material.uniforms.uAspect.value=i.width/i.height,s.viewCamera.aspect=i.width/i.height,s.viewCamera.updateProjectionMatrix(),o()},[s,r,i.width,i.height,e,o]),(0,a.useEffect)(()=>()=>{s&&(s.from.dispose(),s.to.dispose(),s.material.dispose(),s.geometry.dispose(),s.scene.clear())},[s]),(0,l.F)(({scene:e,camera:a})=>{let o=c.t5.progress,l=s&&(0,u.lx)(o),d=l&&"shader"===l.mode?l:void 0;if(!s||!d){p(o),r.setRenderTarget(null),r.render(e,a),n.current&&(s?.from.dispose(),s?.to.dispose()),n.current=!1;return}n.current=!0;let{progress:v,outgoing:f,incoming:h}=(0,u.vD)(o,d),m=(a,o)=>{(0,c.c5)(a,s.position,s.target,t),C(s.viewCamera,s.position,s.target,t,i.width/i.height),p(a),r.setRenderTarget(o),r.clear(),r.render(e,s.viewCamera)},g=r.getRenderTarget();try{m(f,s.from),m(h,s.to);let e=s.material.uniforms;e.uProgress.value=v,e.uScroll.value=o,e.uCenter.value.set(d.center[0],d.center[1]),r.setRenderTarget(null),r.render(s.scene,s.screenCamera)}finally{p(o),r.setRenderTarget(g)}},1),null}var N=r(1588);function O({mobile:e,quality:t}){let r=(0,a.useDeferredValue)(t);return(0,i.jsx)(b,{mobile:e,quality:r,symbol:"jepun",manifest:N})}var J=r(8750);let V={foliage:["#60372a","#b18a51","#815641"]};function Y({symbol:e,quality:t,scale:r,position:o,rotation:n,from:l,to:s}){let c=(0,a.useRef)(null),d=(0,a.useRef)([]),v=(0,a.useMemo)(()=>(function(e,t){let r="high"===t?24:"medium"===t?12:6,i="high"===t?8:"medium"===t?6:4,a=[[],[],[]],o=(e,t=0)=>{let r=e.index?e.toNonIndexed():e;if(r!==e&&e.dispose(),!r.getAttribute("color")){let e=new Float32Array(3*r.getAttribute("position").count).fill(1);r.setAttribute("color",new x.qtW(e,3))}r.clearGroups(),a[t].push(r)},n=(e,t,a=0)=>o(new x.j6(new x.B6O(e.map(e=>new x.Pq0(...e))),r,t,i,!1),a),l=(e,i,a,n,l,s,u=.04,c=!1)=>{let d=new x.ypk;d.moveTo(0,0),c?(d.bezierCurveTo(-(.9*n),.1*a,-(1.1*n),.28*a,-(.7*n),.36*a),d.bezierCurveTo(-(1.25*n),.38*a,-(.8*n),.58*a,-(.4*n),.62*a),d.bezierCurveTo(-(.8*n),.75*a,-(.4*n),.88*a,.15*n,a),d.bezierCurveTo(.7*n,.8*a,.95*n,.8*a,.55*n,.64*a),d.bezierCurveTo(1.1*n,.55*a,.9*n,.45*a,.6*n,.35*a),d.bezierCurveTo(n,.2*a,.4*n,.1*a,0,0)):(d.bezierCurveTo(-n,.25*a,-(.55*n),.8*a,0,a),d.bezierCurveTo(.8*n,.72*a,.6*n,.2*a,0,0));let v=new x.QCA(d,{depth:.012,bevelEnabled:"low"!==t,bevelSize:.0015,bevelThickness:.0015,bevelSegments:1,curveSegments:c?"high"===t?4:"medium"===t?3:2:r/2}),f=v.getAttribute("position");for(let e=0;e<f.count;e++){let t=f.getY(e)/a;f.setZ(e,f.getZ(e)+.014*Math.sin(t*Math.PI)+t*t*.012)}v.computeVertexNormals(),v.rotateZ(l).translate(e,i,u),o(v,s)};if("foliage"===e){let e=new x.ypk;e.moveTo(0,.48),e.bezierCurveTo(-.32,.48,-.47,.18,-.43,-.15),e.bezierCurveTo(-.4,-.43,-.2,-.49,0,-.47),e.bezierCurveTo(.3,-.49,.46,-.25,.43,.05),e.bezierCurveTo(.42,.3,.24,.48,0,.48);let i=new x.wAk;for(let a of(i.absellipse(0,0,.28,.36,0,2*Math.PI,!0),e.holes.push(i),((e,i=0,a=0)=>{o(new x.QCA(e,{depth:.075,steps:1,curveSegments:r/2,bevelEnabled:"low"!==t,bevelSegments:"high"===t?2:1,bevelSize:.003,bevelThickness:.003}).translate(0,0,a-.0375),i)})(e),[-1,1])){n([[.08*a,-.42,.054],[.34*a,-.25,.054],[.35*a,.1,.054],[.15*a,.38,.054],[0,.43,.054]],.009,1);for(let e=0;e<6;e++){let r=-1.16+e/5*2.4,i=a*Math.cos(r)*.34,o=.38*Math.sin(r);l(i,o,.18,.055,a*(-Math.PI/2+.9*r),e%2?0:2,.02,!0),"low"!==t&&l(i,o,.1,.03,a*(-.5+r),1,.063,!0),(1===e||4===e)&&n(Array.from({length:15},(e,t)=>{let r=t/14*Math.PI*2.15,n=.055*(1-t/18);return[i+a*(.025+Math.cos(r)*n),o+Math.sin(r)*n,.073]}),.0045,1)}}l(0,.37,.2,.07,0,0,.04,!0),l(0,-.37,.17,.065,Math.PI,0,.04,!0)}let s=a.map(e=>{let t=(0,J.pP)(e,!1);return e.forEach(e=>e.dispose()),t}),u=(0,J.pP)(s,!0);return s.forEach(e=>e.dispose()),u.computeBoundingBox(),u.computeBoundingSphere(),u})(e,t),[e,t]);return(0,a.useEffect)(()=>()=>v.dispose(),[v]),h(e=>{let t=(0,u.Jp)(l,l+.025,e)*(1-(0,u.Jp)(s-.025,s,e));c.current&&(c.current.visible=t>.001),d.current.forEach(e=>{e&&(e.opacity=t,e.depthWrite=t>.98)})}),(0,i.jsx)("group",{ref:c,name:`cultural-${e}`,position:o,rotation:n,scale:r,children:(0,i.jsxs)("mesh",{children:[(0,i.jsx)("primitive",{attach:"geometry",object:v}),V[e].map((t,r)=>(0,i.jsx)("meshStandardMaterial",{ref:e=>{d.current[r]=e},attach:`material-${r}`,color:t,vertexColors:!0,roughness:.66,metalness:.2*("foliage"===e&&1===r),side:x.$EB,transparent:!0},r))]})})}function H({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[[{id:"heritage-sate",src:"sate.webp",position:[t?.5:6,t?-1.4:.3,-47],size:t?[3.2,2.56]:[5,4],rotation:[0,-.15,0],round:1,start:.49,end:.635},...t?[]:[{id:"heritage-sharing",src:"sharing.webp",position:[-.6,-1,-49],size:[3.6,2.88],rotation:[0,.1,0],round:1,start:.51,end:.62}]].map(t=>(0,i.jsx)(W,{...t,quality:e},t.id)),(0,i.jsx)(Y,{...(0,w.R)("foliage",t),quality:e}),(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(O,{mobile:t,quality:e})})]})}function Z({mobile:e,quality:t}){return(0,i.jsx)("group",{children:[{id:"booking-sharing",src:"sharing.webp",position:[2.7*!e,e?-1.7:-.4,-65],size:e?[3.8,3.04]:[6.4,5.12],rotation:[0,-.1,.03],round:1,start:.735,end:2},...e?[]:[{id:"booking-rice",src:"rice.webp",position:[-3,-2.5,-66],size:[2.8,2.24],rotation:[0,.1,0],round:1,start:.81,end:2,hot:!0}]].map(e=>(0,i.jsx)(W,{...e,quality:t},e.id))})}function G({onReady:e}){let t=(0,l.D)(e=>e.invalidate);return(0,a.useEffect)(()=>(c.t5.invalidate=t,e(),()=>{c.t5.invalidate=void 0}),[t,e]),null}function K({onFailure:e}){let t=(0,l.D)(e=>e.gl);return(0,a.useEffect)(()=>{let r=t.domElement,i=t=>{t.preventDefault(),e()},a=t.debug.onShaderError;return t.debug.onShaderError=(t,r)=>{console.error("Bali Bali shader failed:",t.getProgramInfoLog(r)),queueMicrotask(e)},r.addEventListener("webglcontextlost",i),()=>{r.removeEventListener("webglcontextlost",i),t.debug.onShaderError=a}},[t,e]),null}function X({from:e,to:t,children:r}){let o=(0,a.useRef)(null);return h(r=>{o.current&&(o.current.visible=r>=e&&r<=t)}),(0,i.jsx)("group",{ref:o,children:r})}function ee({onReady:e,onFailure:t}){let[r,l]=(0,a.useState)(()=>window.innerWidth<768),d=(0,a.useMemo)(()=>{let e=navigator;return(0,u.oV)({mobile:r,cores:e.hardwareConcurrency,memory:e.deviceMemory,saveData:e.connection?.saveData})},[r]),[v,f]=(0,a.useState)(d);(0,a.useEffect)(()=>f(d),[d]),(0,a.useEffect)(()=>{let e=window.matchMedia("(max-width: 767px)"),t=()=>l(e.matches);return e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);let[p,h]=(0,a.useState)(0);return(0,a.useEffect)(()=>{c.t5.prepare=e=>h(t=>Math.max(t,e>.58?3:e>.38?2:+(e>.12))),o.zo.preload((0,n.LY)("sharing.webp"));let e=window.setInterval(()=>h(e=>Math.max(e,c.t5.progress>.58?3:c.t5.progress>.38?2:+(c.t5.progress>.12))),250);return()=>{clearInterval(e),c.t5.prepare=void 0}},[]),(0,i.jsxs)(s.Hl,{"aria-hidden":"true",frameloop:"demand",dpr:Math.min(window.devicePixelRatio||1,u.Fx[v].dpr,r?1.2:1.65),camera:{position:[0,1,13],fov:43,near:.04,far:110},gl:{antialias:!r,alpha:!0,powerPreference:"high-performance"},children:[(0,i.jsx)(K,{onFailure:t}),(0,i.jsx)(E,{quality:v,ceiling:d,onQuality:f}),(0,i.jsx)(q,{quality:v}),(0,i.jsx)(P,{mobile:r}),(0,i.jsx)($,{quality:v,mobile:r}),(0,i.jsxs)(a.Suspense,{fallback:null,children:[(0,i.jsx)(X,{from:0,to:.36,children:(0,i.jsx)(Q,{mobile:r,quality:v})}),(0,i.jsx)(X,{from:0,to:.45,children:(0,i.jsx)(T,{mobile:r,quality:v})}),(0,i.jsx)(G,{onReady:e})]}),p>=1&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(X,{from:.18,to:.58,children:(0,i.jsx)(B,{mobile:r,quality:v})})}),p>=2&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(X,{from:.49,to:.79,children:(0,i.jsx)(H,{quality:v,mobile:r})})}),p>=3&&(0,i.jsx)(a.Suspense,{fallback:null,children:(0,i.jsx)(X,{from:.62,to:1,children:(0,i.jsx)(Z,{quality:v,mobile:r})})})]})}}}]);