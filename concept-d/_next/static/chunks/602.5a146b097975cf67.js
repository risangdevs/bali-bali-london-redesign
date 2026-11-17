"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[602],{6602:(e,t,r)=>{r.r(t),r.d(t,{default:()=>G});var i=r(5155),o=r(2115),a=r(5860),n=r(6275);let s={high:{dpr:1.65,particles:64,segments:24,targetScale:1,noise:2},medium:{dpr:1.2,particles:22,segments:10,targetScale:.8,noise:1},low:{dpr:1,particles:0,segments:1,targetScale:0,noise:0}},l=["low","medium","high"];class u{constructor(e,t){this.level=e,this.ceiling=t,this.count=0,this.total=0,this.slow=0,this.fast=0,this.warmup=30}sample(e){if(e<=0||e>.2)return this.reset(),this.level;if(this.warmup-- >0||(this.total+=e,++this.count<90))return this.level;let t=this.total/this.count;this.count=this.total=0,this.slow=t>1/44?this.slow+1:0,this.fast=t<1/57?this.fast+1:0;let r=l.indexOf(this.level);if(this.slow>=2&&r>0)r--;else{if(!(this.fast>=5&&r<l.indexOf(this.ceiling)))return this.level;r++}return this.level=l[r],this.reset(),this.level}reset(){this.count=this.total=this.slow=this.fast=0,this.warmup=30}}let c=(e,t,r)=>{let i=Math.max(0,Math.min(1,(r-e)/(t-e)));return i*i*(3-2*i)},h=[{from:.125,to:.205,center:[.7,.47],approach:.62},{from:.255,to:.375,center:[.51,.5],approach:.32},{from:.49,to:.57,center:[.62,.48],approach:.28},{from:.66,to:.745,center:[.72,.54],approach:.25},{from:.825,to:.91,center:[.65,.48],approach:.35}];function d(e){return h.find(({from:t,to:r})=>e>=t&&e<=r)}function v(e,t){let{from:r,to:i,approach:o}=t;return{progress:Math.max(0,Math.min(1,(e-r)/(i-r))),outgoing:r+(e-r)*o,incoming:i-(i-e)*.45}}function f(e){let t=d(e);return t?1-Math.sin(v(e,t).progress*Math.PI):1}var m=r(3696);let p=new Set;function g(e){p.forEach(t=>t(e))}function x(e){let t=(0,o.useRef)(e);(0,o.useLayoutEffect)(()=>{t.current=e}),(0,o.useLayoutEffect)(()=>{let e=e=>t.current(e);return p.add(e),e(m.t5.progress),m.t5.invalidate?.(),()=>{p.delete(e)}},[])}var w=r(5269);function y({mobile:e}){return(0,i.jsxs)("group",{position:[0,0,-13],children:[(0,i.jsxs)("mesh",{children:[(0,i.jsx)("torusGeometry",{args:[3.1,.68,e?12:24,e?48:96]}),(0,i.jsx)("meshPhysicalMaterial",{clearcoat:.18,clearcoatRoughness:.5,color:"#652D2B",roughness:.7,side:w.$EB})]}),(0,i.jsxs)("mesh",{position:[0,0,.21],children:[(0,i.jsx)("torusGeometry",{args:[3.15,.026,8,96]}),(0,i.jsx)("meshStandardMaterial",{color:"#B89A62",roughness:.6})]}),(0,i.jsxs)("mesh",{position:[0,0,-.65],children:[(0,i.jsx)("torusGeometry",{args:[3.1,.28,12,64]}),(0,i.jsx)("meshStandardMaterial",{color:"#B66D4D",roughness:.9})]})]})}function b({quality:e}){let{scene:t,gl:r}=(0,a.D)(),n=(0,o.useRef)(null),s=(0,o.useRef)(null),l=(0,o.useMemo)(()=>({ivory:new w.Q1f("#f4ebdd"),heritage:new w.Q1f("#e0cab0"),evening:new w.Q1f("#e5d7c5"),current:new w.Q1f}),[]);return x(e=>{let i=c(.49,.59,e)*(1-c(.66,.77,e)),o=c(.66,.77,e)*(1-c(.83,.93,e));l.current.copy(l.ivory).lerp(l.heritage,i).lerp(l.evening,o),t.background=l.current,r.toneMappingExposure=1-.025*i,n.current&&(n.current.intensity=1.8-.12*o),s.current&&(s.current.intensity=2.4+.15*i)}),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("ambientLight",{ref:n,intensity:1.8}),(0,i.jsx)("directionalLight",{ref:s,position:[5,8,10],intensity:2.4,color:"#fff3df"}),"high"===e&&(0,i.jsx)("hemisphereLight",{args:["#fff8ed","#b66d4d",.3]})]})}function j({quality:e,ceiling:t,onQuality:r}){let{gl:i,invalidate:n}=(0,a.D)(),s=(0,o.useRef)(!0);(0,o.useRef)(0);let l=(0,o.useRef)(1/60),c=(0,o.useMemo)(()=>new u(t,t),[t]);return(0,o.useEffect)(()=>{let e=i.domElement,t=()=>{c.reset(),!document.hidden&&s.current&&n()},r=new IntersectionObserver(([e])=>{s.current=e.isIntersecting,t()});return r.observe(e),document.addEventListener("visibilitychange",t),()=>{r.disconnect(),document.removeEventListener("visibilitychange",t)}},[i,n,c]),(0,o.useEffect)(()=>{i.domElement.dataset.quality=e},[i,e]),(0,a.F)((t,i)=>{var o;if(document.hidden||!s.current)return void c.reset();m.t5.time+=Math.min(i,.05),i<.2&&(l.current+=(i-l.current)*.05);let a=c.sample(i);a!==e&&r(a),"low"!==e&&((o=m.t5.progress)<.24||o>.375&&o<.49||o>.91)&&n()},-2),(0,a.F)((e,t)=>{},2),null}function M(e,t,r,i,o){e.position.copy(t);let a=i&&o<1?51:43;e.fov!==a&&(e.fov=a,e.updateProjectionMatrix()),e.lookAt(r),e.updateMatrixWorld()}function S({mobile:e}){let[t,r]=(0,o.useMemo)(()=>[new w.Pq0,new w.Pq0],[]),i=(0,a.D)(e=>e.size);return(0,a.F)(({camera:o})=>{(0,m.c5)(m.t5.progress,t,r),M(o,t,r,e,i.width/i.height)},-1),null}var q=r(602),T=r(7601);let E=`
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise21(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),
             mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
`,C=`
varying vec2 vUv;
void main() { vUv=uv; gl_Position=vec4(position.xy,0.,1.); }
`,D=`
uniform sampler2D uFrom, uTo, uDepthFrom, uDepthTo;
uniform float uProgress, uAspect, uNear, uFar, uQuality, uScroll;
uniform vec2 uCenter;
varying vec2 vUv;
${E}
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
`,F=`
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
`,P=`
uniform sampler2D photo;
uniform vec2 uCover;
uniform float rounded, visibility, uTime, uHeat, uQuality, uWarmth, uScroll, uScene, uTransition;
varying vec2 vUv;
varying float vRelief;
${E}
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
`,R=`
uniform float uTime, uOpacity, uPointScale, uQuality;
attribute vec4 aSeed;
varying float vLife;
varying float vSeed;
${E}
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
`,U=`
uniform float uTime, uOpacity;
varying float vLife;
varying float vSeed;
${E}
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
`,z=new Map;function L({quality:e,visibility:t}){let r=(0,o.useRef)(null),n=(0,o.useRef)(null),{size:l,gl:u}=(0,a.D)(),c=s[e].particles,h=(0,o.useMemo)(()=>{let e=new Float32Array(4*c);for(let t=0;t<e.length;t++)e[t]=(16807*t+137)%65521/65521;return e},[c]),d=(0,o.useMemo)(()=>new Float32Array(3*c),[c]),v=(0,o.useMemo)(()=>({uTime:{value:0},uOpacity:{value:0},uPointScale:{value:1},uQuality:{value:2}}),[]);return(x(i=>{let o=t(i)*f(i)*f(m.t5.progress)*("high"===e?.105:.075);if(r.current&&(r.current.visible=o>.002&&"low"!==e),!n.current)return;let a=n.current.uniforms;a.uOpacity.value=o,a.uTime.value=m.t5.time,a.uPointScale.value=l.height*u.getPixelRatio()*1.15,a.uQuality.value=s[e].noise}),c)?(0,i.jsxs)("points",{ref:r,frustumCulled:!1,renderOrder:4,children:[(0,i.jsxs)("bufferGeometry",{children:[(0,i.jsx)("bufferAttribute",{attach:"attributes-position",args:[d,3]}),(0,i.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[h,4]})]}),(0,i.jsx)("shaderMaterial",{ref:n,uniforms:v,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:R,fragmentShader:U})]}):null}function _({src:e,position:t,size:r=[6,4.8],rotation:a=[0,0,0],round:n=0,start:l=-1,end:u=2,hot:h=!1,quality:d="high"}){var v;let p=(0,q.zo)((0,T.LY)(e));p.colorSpace=w.er$,v=(0,T.LY)(e),(0,o.useEffect)(()=>(z.set(p,(z.get(p)||0)+1),()=>{z.set(p,(z.get(p)||1)-1),queueMicrotask(()=>{0===z.get(p)&&(z.delete(p),p.dispose(),q.zo.clear(v))})}),[p,v]);let g=(0,o.useRef)(null),y=p.image,b=y.width/y.height,j=r[0]/r[1],M=(0,o.useMemo)(()=>({photo:{value:p},rounded:{value:n},visibility:{value:1},uCover:{value:new w.I9Y(Math.min(1,j/b),Math.min(1,b/j))},uRelief:{value:"low"!==d&&n?.014*r[0]:0},uTime:{value:0},uHeat:{value:0},uQuality:{value:s[d].noise},uWarmth:{value:1},uScroll:{value:0},uScene:{value:0},uTransition:{value:0}}),[p,n,b,j,d,r[0]]),S=e=>c(l,l+.045,e)*(1-c(u-.045,u,e));x(e=>{if(!g.current)return;let t=g.current.uniforms;t.visibility.value=S(e),t.uTime.value=m.t5.time,t.uScroll.value=e,t.uScene.value=6*e%1,t.uTransition.value=1-f(e),t.uHeat.value=h?f(e)*f(m.t5.progress)*("high"===d?1:.55):0,t.uWarmth.value=1+.25*c(.5,.7,e)});let E=n?s[d].segments:1;return(0,i.jsxs)("group",{position:t,rotation:a,children:[!!n&&"low"!==d&&(0,i.jsxs)("mesh",{position:[.04,-.06,-.035],children:[(0,i.jsx)("planeGeometry",{args:[1.06*r[0],1.06*r[1]]}),(0,i.jsx)("shaderMaterial",{uniforms:M,transparent:!0,side:w.$EB,depthWrite:!1,toneMapped:!1,vertexShader:F,fragmentShader:`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`})]}),(0,i.jsxs)("mesh",{children:[(0,i.jsx)("planeGeometry",{args:[r[0],r[1],E,E]}),(0,i.jsx)("shaderMaterial",{ref:g,uniforms:M,defines:{EFFECT_QUALITY:s[d].noise},transparent:!0,side:w.$EB,depthWrite:!0,toneMapped:!1,vertexShader:F,fragmentShader:P},d)]}),h&&"low"!==d&&(0,i.jsx)(L,{quality:d,visibility:S})]})}function k({mobile:e,quality:t}){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(_,{quality:t,hot:!0,src:"sate.webp",position:[e?.9:3.3,e?-.5:-.3,0],size:e?[7.8,6.24]:[10,8],round:1,rotation:[0,-.12,-.12],end:.2}),(0,i.jsxs)(o.Suspense,{fallback:null,children:[(0,i.jsx)(_,{quality:t,hot:!0,src:"rendang.webp",position:[-4,-.7,-5],size:[5.5,4.4],round:1,rotation:[.12,.35,.12],start:.07,end:.3}),(0,i.jsx)(_,{quality:t,src:"vegetables.webp",position:[4.5,.4,-8],size:[5.3,4.2],round:1,rotation:[-.1,-.3,-.18],start:.08,end:.33}),!e&&(0,i.jsx)(_,{quality:t,src:"rice.webp",position:[-3.9,2,-10],size:[4,3.2],round:1,rotation:[.15,.25,-.2],start:.1,end:.35})]})]})}function Q({mobile:e,quality:t}){let r=(0,o.useRef)(null);return x(e=>{r.current&&(r.current.rotation.x=(1-w.cj9.smoothstep(e,.34,.47))*Math.PI/2)}),(0,i.jsxs)("group",{ref:r,position:[0,0,-26],children:[(0,i.jsx)(_,{quality:t,src:"sharing.webp",position:[0,.02,0],size:[7,5.6],rotation:[-Math.PI/2,0,0],round:1}),(0,i.jsx)(_,{quality:t,hot:!0,src:"sate.webp",position:[-5,.1,1],size:[4,3.2],rotation:[-Math.PI/2,0,-.4],round:1}),(0,i.jsx)(_,{quality:t,hot:!0,src:"rendang.webp",position:[4.5,.14,-1.8],size:[4,3.2],rotation:[-Math.PI/2,0,.3],round:1}),!e&&(0,i.jsx)(_,{quality:t,src:"vegetables.webp",position:[1,.12,4.1],size:[3.4,2.7],rotation:[-Math.PI/2,0,-.25],round:1})]})}function A({quality:e,mobile:t}){let{gl:r,size:i,invalidate:n}=(0,a.D)(),l=(0,o.useRef)(!1),u=(0,o.useMemo)(()=>{if("low"===e)return null;let t=()=>{let e=new w.nWS(1,1,{type:w.OUM,depthBuffer:!0,stencilBuffer:!1});return e.depthTexture=new w.VCu(1,1),e.texture.generateMipmaps=!1,e},r=t(),i=t(),o=new w.BKk({uniforms:{uFrom:{value:r.texture},uTo:{value:i.texture},uDepthFrom:{value:r.depthTexture},uDepthTo:{value:i.depthTexture},uProgress:{value:0},uAspect:{value:1},uCenter:{value:new w.I9Y(.5,.5)},uNear:{value:.04},uFar:{value:110},uQuality:{value:s[e].noise},uScroll:{value:0}},vertexShader:C,fragmentShader:D,depthTest:!1,depthWrite:!1,toneMapped:!1}),a=new w.bdM(2,2),n=new w.Z58;return n.add(new w.eaF(a,o)),{from:r,to:i,material:o,geometry:a,scene:n,screenCamera:new w.qUd(-1,1,1,-1,0,1),viewCamera:new w.ubm(43,1,.04,110),position:new w.Pq0,target:new w.Pq0}},[e]);return(0,o.useLayoutEffect)(()=>{if(!u)return;let t=r.getPixelRatio()*s[e].targetScale,o=Math.min(1,1600/(i.width*t),Math.sqrt(("high"===e?125e4:72e4)/(i.width*i.height*t*t))),a=Math.max(1,Math.round(i.width*t*o)),l=Math.max(1,Math.round(i.height*t*o));u.from.setSize(a,l),u.to.setSize(a,l),u.material.uniforms.uAspect.value=i.width/i.height,u.viewCamera.aspect=i.width/i.height,u.viewCamera.updateProjectionMatrix(),n()},[u,r,i.width,i.height,e,n]),(0,o.useEffect)(()=>()=>{u&&(u.from.dispose(),u.to.dispose(),u.material.dispose(),u.geometry.dispose(),u.scene.clear())},[u]),(0,a.F)(({scene:e,camera:o})=>{let a=m.t5.progress,n=u&&d(a);if(!u||!n){g(a),r.setRenderTarget(null),r.render(e,o),l.current&&(u?.from.dispose(),u?.to.dispose()),l.current=!1;return}l.current=!0;let{progress:s,outgoing:c,incoming:h}=v(a,n),f=(o,a)=>{(0,m.c5)(o,u.position,u.target),M(u.viewCamera,u.position,u.target,t,i.width/i.height),g(o),r.setRenderTarget(a),r.clear(),r.render(e,u.viewCamera)},p=r.getRenderTarget();try{f(c,u.from),f(h,u.to);let e=u.material.uniforms;e.uProgress.value=s,e.uScroll.value=a,e.uCenter.value.set(n.center[0],n.center[1]),r.setRenderTarget(null),r.render(u.scene,u.screenCamera)}finally{g(a),r.setRenderTarget(p)}},1),null}function I({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(_,{quality:e,src:"sate.webp",position:[t?1.4:3.6,1,-44],size:t?[3.2,4.2]:[5,6.5],rotation:[0,-.22,0]}),(0,i.jsx)(_,{quality:e,src:"sharing.webp",position:[t?2.5:6,-.6,-47],size:[5,4],rotation:[0,-.35,0]}),(0,i.jsxs)("mesh",{position:[-6,0,-48],children:[(0,i.jsx)("boxGeometry",{args:[.14,12,3]}),(0,i.jsx)("meshStandardMaterial",{color:"#652D2B"})]}),(0,i.jsxs)("mesh",{position:[6.2,0,-50],children:[(0,i.jsx)("boxGeometry",{args:[.14,12,3]}),(0,i.jsx)("meshStandardMaterial",{color:"#652D2B"})]})]})}function B({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(_,{quality:e,src:"sharing.webp",position:[t?1.5:4.5,.1,-65],size:t?[7,5.6]:[10,8],round:1,rotation:[0,-.2,.1]}),(0,i.jsx)(_,{quality:e,hot:!0,src:"rice.webp",position:[-4,-3,-63],size:[4,3.2],round:1})]})}function O({onReady:e}){let t=(0,a.D)(e=>e.invalidate);return(0,o.useEffect)(()=>(m.t5.invalidate=t,e(),()=>{m.t5.invalidate=void 0}),[t,e]),null}function W({onFailure:e}){let t=(0,a.D)(e=>e.gl);return(0,o.useEffect)(()=>{let r=t.domElement,i=t=>{t.preventDefault(),e()},o=t.debug.onShaderError;return t.debug.onShaderError=(t,r)=>{console.error("Bali Bali shader failed:",t.getProgramInfoLog(r)),queueMicrotask(e)},r.addEventListener("webglcontextlost",i),()=>{r.removeEventListener("webglcontextlost",i),t.debug.onShaderError=o}},[t,e]),null}function N({from:e,to:t,children:r}){let a=(0,o.useRef)(null);return x(r=>{a.current&&(a.current.visible=r>=e&&r<=t)}),(0,i.jsx)("group",{ref:a,children:r})}function G({onReady:e,onFailure:t}){let[r,a]=(0,o.useState)(()=>window.innerWidth<768),l=(0,o.useMemo)(()=>{var e;let t=navigator;return(e={mobile:r,cores:t.hardwareConcurrency,memory:t.deviceMemory,saveData:t.connection?.saveData}).saveData||void 0!==e.memory&&e.memory<=2?"low":e.mobile||void 0!==e.cores&&e.cores<=4||void 0!==e.memory&&e.memory<=4?"medium":"high"},[r]),[u,c]=(0,o.useState)(l);(0,o.useEffect)(()=>c(l),[l]),(0,o.useEffect)(()=>{let e=window.matchMedia("(max-width: 767px)"),t=()=>a(e.matches);return e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);let[h,d]=(0,o.useState)(0);return(0,o.useEffect)(()=>{let e=window.setInterval(()=>d(e=>Math.max(e,m.t5.progress>.72?3:m.t5.progress>.38?2:+(m.t5.progress>.12))),250);return()=>clearInterval(e)},[]),(0,i.jsxs)(n.Hl,{"aria-hidden":"true",frameloop:"demand",dpr:Math.min(window.devicePixelRatio||1,s[u].dpr,r?1.2:1.65),camera:{position:[0,1,13],fov:43,near:.04,far:110},gl:{antialias:!r,alpha:!0,powerPreference:"high-performance"},children:[(0,i.jsx)(W,{onFailure:t}),(0,i.jsx)(j,{quality:u,ceiling:l,onQuality:c}),(0,i.jsx)(b,{quality:u}),(0,i.jsx)(S,{mobile:r}),(0,i.jsx)(A,{quality:u,mobile:r}),(0,i.jsxs)(o.Suspense,{fallback:null,children:[(0,i.jsx)(N,{from:0,to:.36,children:(0,i.jsx)(k,{mobile:r,quality:u})}),(0,i.jsx)(N,{from:.1,to:.4,children:(0,i.jsx)(y,{mobile:r||"high"!==u})}),(0,i.jsx)(O,{onReady:e})]}),h>=1&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(N,{from:.18,to:.54,children:(0,i.jsx)(Q,{mobile:r,quality:u})})}),h>=2&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(N,{from:.5,to:.74,children:(0,i.jsx)(I,{quality:u,mobile:r})})}),h>=3&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(N,{from:.8,to:1,children:(0,i.jsx)(B,{quality:u,mobile:r})})})]})}}}]);