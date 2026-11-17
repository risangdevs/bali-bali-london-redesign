"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[715],{6715:(e,t,r)=>{r.r(t),r.d(t,{default:()=>K});var i=r(5155),o=r(2115),a=r(5860),n=r(6275);let l={high:{dpr:1.65,particles:64,segments:24,targetScale:1,noise:2},medium:{dpr:1.2,particles:22,segments:10,targetScale:.8,noise:1},low:{dpr:1,particles:0,segments:1,targetScale:0,noise:0}},s=["low","medium","high"];class u{constructor(e,t){this.level=e,this.ceiling=t,this.count=0,this.total=0,this.slow=0,this.fast=0,this.warmup=30}sample(e){if(e<=0||e>.2)return this.reset(),this.level;if(this.warmup-- >0||(this.total+=e,++this.count<90))return this.level;let t=this.total/this.count;this.count=this.total=0,this.slow=t>1/44?this.slow+1:0,this.fast=t<1/57?this.fast+1:0;let r=s.indexOf(this.level);if(this.slow>=2&&r>0)r--;else{if(!(this.fast>=5&&r<s.indexOf(this.ceiling)))return this.level;r++}return this.level=s[r],this.reset(),this.level}reset(){this.count=this.total=this.slow=this.fast=0,this.warmup=30}}let c=(e,t,r)=>{let i=Math.max(0,Math.min(1,(r-e)/(t-e)));return i*i*(3-2*i)},h=[{from:.125,to:.205,center:[.7,.47],approach:.62},{from:.255,to:.375,center:[.51,.5],approach:.32},{from:.49,to:.57,center:[.62,.48],approach:.28},{from:.66,to:.745,center:[.72,.54],approach:.25},{from:.825,to:.91,center:[.65,.48],approach:.35}];function d(e){return h.find(({from:t,to:r})=>e>=t&&e<=r)}function v(e,t){let{from:r,to:i,approach:o}=t;return{progress:Math.max(0,Math.min(1,(e-r)/(i-r))),outgoing:r+(e-r)*o,incoming:i-(i-e)*.45}}function m(e){let t=d(e);return t?1-Math.sin(v(e,t).progress*Math.PI):1}var f=r(3696);let p=new Set;function q(e){p.forEach(t=>t(e))}function g(e){let t=(0,o.useRef)(e);(0,o.useLayoutEffect)(()=>{t.current=e}),(0,o.useLayoutEffect)(()=>{let e=e=>t.current(e);return p.add(e),e(f.t5.progress),f.t5.invalidate?.(),()=>{p.delete(e)}},[])}var x=r(6766),y=r(7033);let w=JSON.parse('{"glyphs":{"B":{"ha":775,"x_min":57,"x_max":706,"o":"m 417 475 l 417 475 l 432 490 q 576 460 514 490 q 672 376 638 429 q 706 256 706 324 l 706 256 q 669 122 706 182 q 570 28 633 63 q 429 -6 507 -6 l 429 -6 q 328 -1 385 -6 q 225 3 272 3 l 225 3 q 137 1 179 3 q 60 0 94 0 l 60 0 q 57 8 57 0 q 60 17 57 17 l 60 17 q 136 24 110 17 q 172 51 163 31 q 182 113 182 72 l 182 113 l 182 756 q 173 816 182 796 q 138 844 164 836 q 63 851 113 851 l 63 851 q 58 860 58 851 q 63 868 58 868 l 63 868 q 138 866 96 868 q 225 864 179 864 l 225 864 q 308 868 261 864 q 389 872 356 872 l 389 872 q 522 848 471 872 q 598 782 574 824 q 622 689 622 740 l 622 689 q 565 554 622 610 q 417 475 507 499 z m 358 851 l 358 851 q 307 846 326 851 q 279 820 288 840 q 271 753 271 800 l 271 753 l 271 481 l 226 492 q 300 488 271 489 q 333 488 329 488 l 333 488 q 486 542 440 488 q 532 678 532 597 l 532 678 q 515 766 532 726 q 460 828 497 806 q 358 851 422 851 z m 408 19 l 408 19 q 560 73 513 19 q 608 221 608 126 l 608 221 q 547 392 608 325 q 376 458 486 458 l 376 458 q 305 458 342 460 q 231 451 268 457 l 231 451 l 271 467 l 271 113 q 281 58 271 79 q 320 28 290 38 q 408 19 350 19 z "},"A":{"ha":975,"x_min":-4,"x_max":976,"o":"m 661 382 l 269 382 l 283 410 l 651 410 l 661 382 z m 971 17 l 971 17 q 976 8 976 17 q 971 0 976 0 l 971 0 q 889 3 931 0 q 808 6 847 6 l 808 6 q 733 3 765 6 q 663 0 701 0 l 663 0 q 657 8 657 0 q 663 17 657 17 l 663 17 q 754 38 736 17 q 744 119 772 60 l 744 119 l 436 771 l 471 814 l 201 176 q 197 54 167 92 q 318 17 228 17 l 318 17 q 325 8 325 17 q 318 0 325 0 l 318 0 q 242 3 276 0 q 154 6 207 6 l 154 6 q 74 3 104 6 q 1 0 44 0 l 1 0 q -4 8 -4 0 q 1 17 -4 17 l 1 17 q 67 31 39 17 q 119 83 94 46 q 172 189 143 119 l 172 189 l 465 881 q 475 885 468 885 q 483 881 482 885 l 483 881 l 811 190 q 868 84 843 122 q 917 31 893 46 q 971 17 942 17 z "},"L":{"ha":740,"x_min":46,"x_max":724,"o":"m 257 754 l 257 754 l 257 118 q 265 61 257 81 q 298 35 274 42 q 368 29 322 29 l 368 29 l 519 29 q 647 80 600 29 q 708 213 694 131 l 708 213 q 716 216 708 217 q 724 211 724 215 l 724 211 q 715 120 719 174 q 711 21 711 67 l 711 21 q 690 0 711 0 l 690 0 l 49 0 q 46 8 46 0 q 49 17 46 17 l 49 17 q 124 24 99 17 q 158 51 150 31 q 167 113 167 72 l 167 113 l 167 756 q 158 816 167 796 q 124 844 150 836 q 49 851 99 851 l 49 851 q 46 860 46 851 q 49 868 46 868 l 49 868 q 124 866 82 868 q 211 864 165 864 l 211 864 q 301 866 260 864 q 375 868 343 868 l 375 868 q 379 860 379 868 q 375 851 379 851 l 375 851 q 299 844 325 851 q 265 815 274 836 q 257 754 257 794 z "},"I":{"ha":461,"x_min":61,"x_max":399,"o":"m 276 753 l 276 113 q 285 51 276 72 q 319 24 293 31 q 394 17 344 17 l 394 17 q 399 8 399 17 q 394 0 399 0 l 394 0 q 320 1 361 0 q 229 3 279 3 l 229 3 q 141 1 183 3 q 65 0 99 0 l 65 0 q 61 8 61 0 q 65 17 61 17 l 65 17 q 142 24 115 17 q 176 51 168 31 q 185 113 185 72 l 185 113 l 185 756 q 176 816 185 796 q 142 844 168 836 q 65 851 115 851 l 65 851 q 61 860 61 851 q 65 868 61 868 l 65 868 q 141 866 99 868 q 229 864 183 864 l 229 864 q 321 866 279 864 q 394 868 363 868 l 394 868 q 399 860 399 868 q 394 851 399 851 l 394 851 q 319 843 344 851 q 285 814 293 835 q 276 753 276 793 l 276 753 z "},"?":{"ha":457,"x_min":60,"x_max":413,"o":"m 221 850 l 221 850 q 173 829 183 850 q 160 785 163 808 l 160 785 q 153 756 158 771 q 137 733 147 742 q 107 724 126 724 l 107 724 q 72 739 83 724 q 60 771 60 754 l 60 771 q 108 840 60 811 q 225 868 157 868 l 225 868 q 319 850 276 868 q 388 795 363 832 q 413 701 413 758 l 413 701 q 397 624 413 657 q 356 566 381 592 q 307 517 332 540 l 307 517 q 240 431 260 469 q 219 344 219 393 l 219 344 q 222 310 219 328 q 228 268 224 292 l 228 268 q 221 263 229 264 q 211 265 213 261 l 211 265 q 185 353 194 304 q 175 431 175 401 l 175 431 q 190 498 175 471 q 226 547 204 525 q 269 590 247 568 q 305 643 290 613 q 319 718 319 674 l 319 718 q 292 814 319 778 q 221 850 264 850 z m 204 -15 l 204 -15 q 160 1 176 -15 q 143 44 143 17 l 143 44 q 160 87 143 71 q 204 103 176 103 l 204 103 q 249 87 233 103 q 264 44 264 71 l 264 44 q 249 1 264 17 q 204 -15 233 -15 z "}," ":{"ha":325,"x_min":0,"x_max":0,"o":""}},"familyName":"Cormorant Garamond Regular","ascender":1283,"descender":-399,"underlinePosition":-100,"underlineThickness":50,"boundingBox":{"xMin":-103,"xMax":1453,"yMin":-283,"yMax":927},"resolution":1000,"original_font_information":{"source":"public/fonts/editorial.ttf","license":"SIL Open Font License; see public/fonts/CormorantGaramond-LICENSE.txt"}}'),b=new x.K(w);function j({letter:e,quality:t,height:r,position:a,rotation:n=[0,0,0],from:l,to:s}){let u=(0,o.useRef)(null),h=(0,o.useRef)(null),d=(0,o.useRef)(null),v=(0,o.useMemo)(()=>{let r,i,o;return(r=new y._(e,{font:b,size:1,depth:.105,steps:1,curveSegments:"high"===t?12:"medium"===t?6:3,bevelEnabled:"low"!==t,bevelThickness:.006,bevelSize:.003,bevelSegments:"high"===t?2:1})).computeBoundingBox(),o=(i=r.boundingBox).max.y-i.min.y,r.translate(-(i.min.x+i.max.x)/2,-(i.min.y+i.max.y)/2,-(i.min.z+i.max.z)/2),r.scale(1/o,1/o,1/o),r.computeBoundingBox(),r.computeBoundingSphere(),r},[e,t]);return(0,o.useEffect)(()=>()=>v.dispose(),[v]),g(e=>{let t=c(l,l+.025,e)*(1-c(s-.025,s,e));u.current&&(u.current.visible=t>.001),h.current&&(h.current.opacity=t,h.current.depthWrite=t>.98),d.current&&(d.current.opacity=t,d.current.depthWrite=t>.98)}),(0,i.jsx)("group",{ref:u,name:`brand-letter-${e}`,position:a,rotation:n,scale:r,children:(0,i.jsxs)("mesh",{children:[(0,i.jsx)("primitive",{attach:"geometry",object:v}),(0,i.jsx)("meshPhysicalMaterial",{ref:h,attach:"material-0",color:"#652D2B",roughness:.62,clearcoat:.18*("low"!==t),clearcoatRoughness:.5,transparent:!0}),(0,i.jsx)("meshStandardMaterial",{ref:d,attach:"material-1",color:"#B89A62",roughness:.6,metalness:.28,transparent:!0})]})})}function M({mobile:e,quality:t}){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(j,{letter:"B",quality:t,height:e?1.8:7.2,position:[e?.25:1.5,e?-4.5:0,-13],rotation:[0,-.09,0],from:.085,to:.245}),(0,i.jsx)(j,{letter:"A",quality:t,height:e?1.8:6.8,position:[e?.2:.9,e?-3.6:-.1,-19],rotation:[0,.08,0],from:.195,to:.405})]})}var S=r(5269);function T({quality:e}){let{scene:t,gl:r}=(0,a.D)(),n=(0,o.useRef)(null),l=(0,o.useRef)(null),s=(0,o.useMemo)(()=>({ivory:new S.Q1f("#f4ebdd"),heritage:new S.Q1f("#e0cab0"),evening:new S.Q1f("#e5d7c5"),current:new S.Q1f}),[]);return g(e=>{let i=c(.49,.59,e)*(1-c(.66,.77,e)),o=c(.66,.77,e)*(1-c(.83,.93,e));s.current.copy(s.ivory).lerp(s.heritage,i).lerp(s.evening,o),t.background=s.current,r.toneMappingExposure=1-.025*i,n.current&&(n.current.intensity=1.8-.12*o),l.current&&(l.current.intensity=2.4+.15*i)}),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("ambientLight",{ref:n,intensity:1.8}),(0,i.jsx)("directionalLight",{ref:l,position:[5,8,10],intensity:2.4,color:"#fff3df"}),"high"===e&&(0,i.jsx)("hemisphereLight",{args:["#fff8ed","#b66d4d",.3]})]})}function E({quality:e,ceiling:t,onQuality:r}){let{gl:i,invalidate:n}=(0,a.D)(),l=(0,o.useRef)(!0);(0,o.useRef)(0);let s=(0,o.useRef)(1/60),c=(0,o.useMemo)(()=>new u(t,t),[t]);return(0,o.useEffect)(()=>{let e=i.domElement,t=()=>{c.reset(),!document.hidden&&l.current&&n()},r=new IntersectionObserver(([e])=>{l.current=e.isIntersecting,t()});return r.observe(e),document.addEventListener("visibilitychange",t),()=>{r.disconnect(),document.removeEventListener("visibilitychange",t)}},[i,n,c]),(0,o.useEffect)(()=>{i.domElement.dataset.quality=e},[i,e]),(0,a.F)((t,i)=>{var o;if(document.hidden||!l.current)return void c.reset();f.t5.time+=Math.min(i,.05),i<.2&&(s.current+=(i-s.current)*.05);let a=c.sample(i);a!==e&&r(a),"low"!==e&&((o=f.t5.progress)<.24||o>.375&&o<.49||o>.91)&&n()},-2),(0,a.F)((e,t)=>{},2),null}function C(e,t,r,i,o){e.position.copy(t);let a=i&&o<1?51:43;e.fov!==a&&(e.fov=a,e.updateProjectionMatrix()),e.lookAt(r),e.updateMatrixWorld()}function z({mobile:e}){let[t,r]=(0,o.useMemo)(()=>[new S.Pq0,new S.Pq0],[]),i=(0,a.D)(e=>e.size);return(0,a.F)(({camera:o})=>{(0,f.c5)(f.t5.progress,t,r),C(o,t,r,e,i.width/i.height)},-1),null}var R=r(602),_=r(7601);let F=`
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise21(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),
             mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
`,P=`
varying vec2 vUv;
void main() { vUv=uv; gl_Position=vec4(position.xy,0.,1.); }
`,D=`
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
`,L=`
uniform sampler2D photo;
uniform vec2 uCover;
uniform float rounded, visibility, uTime, uHeat, uQuality, uWarmth, uScroll, uScene, uTransition;
varying vec2 vUv;
varying float vRelief;
${F}
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
`,B=`
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
`,I=new Map;function A({quality:e,visibility:t}){let r=(0,o.useRef)(null),n=(0,o.useRef)(null),{size:s,gl:u}=(0,a.D)(),c=l[e].particles,h=(0,o.useMemo)(()=>{let e=new Float32Array(4*c);for(let t=0;t<e.length;t++)e[t]=(16807*t+137)%65521/65521;return e},[c]),d=(0,o.useMemo)(()=>new Float32Array(3*c),[c]),v=(0,o.useMemo)(()=>({uTime:{value:0},uOpacity:{value:0},uPointScale:{value:1},uQuality:{value:2}}),[]);return(g(i=>{let o=t(i)*m(i)*m(f.t5.progress)*("high"===e?.105:.075);if(r.current&&(r.current.visible=o>.002&&"low"!==e),!n.current)return;let a=n.current.uniforms;a.uOpacity.value=o,a.uTime.value=f.t5.time,a.uPointScale.value=s.height*u.getPixelRatio()*1.15,a.uQuality.value=l[e].noise}),c)?(0,i.jsxs)("points",{ref:r,frustumCulled:!1,renderOrder:4,children:[(0,i.jsxs)("bufferGeometry",{children:[(0,i.jsx)("bufferAttribute",{attach:"attributes-position",args:[d,3]}),(0,i.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[h,4]})]}),(0,i.jsx)("shaderMaterial",{ref:n,uniforms:v,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:k,fragmentShader:B})]}):null}function Q({src:e,position:t,size:r=[6,4.8],rotation:a=[0,0,0],round:n=0,start:s=-1,end:u=2,hot:h=!1,quality:d="high"}){var v;let p=(0,R.zo)((0,_.LY)(e));p.colorSpace=S.er$,v=(0,_.LY)(e),(0,o.useEffect)(()=>(I.set(p,(I.get(p)||0)+1),()=>{I.set(p,(I.get(p)||1)-1),queueMicrotask(()=>{0===I.get(p)&&(I.delete(p),p.dispose(),R.zo.clear(v))})}),[p,v]);let q=(0,o.useRef)(null),x=p.image,y=x.width/x.height,w=r[0]/r[1],b=(0,o.useMemo)(()=>({photo:{value:p},rounded:{value:n},visibility:{value:1},uCover:{value:new S.I9Y(Math.min(1,w/y),Math.min(1,y/w))},uRelief:{value:"low"!==d&&n?.014*r[0]:0},uTime:{value:0},uHeat:{value:0},uQuality:{value:l[d].noise},uWarmth:{value:1},uScroll:{value:0},uScene:{value:0},uTransition:{value:0}}),[p,n,y,w,d,r[0]]),j=e=>c(s,s+.045,e)*(1-c(u-.045,u,e));g(e=>{if(!q.current)return;let t=q.current.uniforms;t.visibility.value=j(e),t.uTime.value=f.t5.time,t.uScroll.value=e,t.uScene.value=6*e%1,t.uTransition.value=1-m(e),t.uHeat.value=h?m(e)*m(f.t5.progress)*("high"===d?1:.55):0,t.uWarmth.value=1+.25*c(.5,.7,e)});let M=n?l[d].segments:1;return(0,i.jsxs)("group",{position:t,rotation:a,children:[!!n&&"low"!==d&&(0,i.jsxs)("mesh",{position:[.04,-.06,-.035],children:[(0,i.jsx)("planeGeometry",{args:[1.06*r[0],1.06*r[1]]}),(0,i.jsx)("shaderMaterial",{uniforms:b,transparent:!0,side:S.$EB,depthWrite:!1,toneMapped:!1,vertexShader:U,fragmentShader:`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`})]}),(0,i.jsxs)("mesh",{children:[(0,i.jsx)("planeGeometry",{args:[r[0],r[1],M,M]}),(0,i.jsx)("shaderMaterial",{ref:q,uniforms:b,defines:{EFFECT_QUALITY:l[d].noise},transparent:!0,side:S.$EB,depthWrite:!0,toneMapped:!1,vertexShader:U,fragmentShader:L},d)]}),h&&"low"!==d&&(0,i.jsx)(A,{quality:d,visibility:j})]})}function O({mobile:e,quality:t}){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(Q,{quality:t,hot:!0,src:"sate.webp",position:[e?.9:3.3,e?-.5:-.3,0],size:e?[7.8,6.24]:[10,8],round:1,rotation:[0,-.12,-.12],end:.2}),(0,i.jsxs)(o.Suspense,{fallback:null,children:[(0,i.jsx)(Q,{quality:t,hot:!0,src:"rendang.webp",position:[-4,-.7,-5],size:[5.5,4.4],round:1,rotation:[.12,.35,.12],start:.07,end:.3}),(0,i.jsx)(Q,{quality:t,src:"vegetables.webp",position:[4.5,.4,-8],size:[5.3,4.2],round:1,rotation:[-.1,-.3,-.18],start:.08,end:.33}),!e&&(0,i.jsx)(Q,{quality:t,src:"rice.webp",position:[-3.9,2,-10],size:[4,3.2],round:1,rotation:[.15,.25,-.2],start:.1,end:.35})]})]})}function N({mobile:e,quality:t}){let r=(0,o.useRef)(null);return g(e=>{r.current&&(r.current.rotation.x=(1-S.cj9.smoothstep(e,.34,.47))*Math.PI/2)}),(0,i.jsxs)("group",{ref:r,position:[0,0,-26],children:[(0,i.jsx)(Q,{quality:t,src:"sharing.webp",position:[0,.02,0],size:[7,5.6],rotation:[-Math.PI/2,0,0],round:1}),(0,i.jsx)(Q,{quality:t,hot:!0,src:"sate.webp",position:[-5,.1,1],size:[4,3.2],rotation:[-Math.PI/2,0,-.4],round:1}),(0,i.jsx)(Q,{quality:t,hot:!0,src:"rendang.webp",position:[4.5,.14,-1.8],size:[4,3.2],rotation:[-Math.PI/2,0,.3],round:1}),!e&&(0,i.jsx)(Q,{quality:t,src:"vegetables.webp",position:[1,.12,4.1],size:[3.4,2.7],rotation:[-Math.PI/2,0,-.25],round:1})]})}function W({quality:e,mobile:t}){let{gl:r,size:i,invalidate:n}=(0,a.D)(),s=(0,o.useRef)(!1),u=(0,o.useMemo)(()=>{if("low"===e)return null;let t=()=>{let e=new S.nWS(1,1,{type:S.OUM,depthBuffer:!0,stencilBuffer:!1});return e.depthTexture=new S.VCu(1,1),e.texture.generateMipmaps=!1,e},r=t(),i=t(),o=new S.BKk({uniforms:{uFrom:{value:r.texture},uTo:{value:i.texture},uDepthFrom:{value:r.depthTexture},uDepthTo:{value:i.depthTexture},uProgress:{value:0},uAspect:{value:1},uCenter:{value:new S.I9Y(.5,.5)},uNear:{value:.04},uFar:{value:110},uQuality:{value:l[e].noise},uScroll:{value:0}},vertexShader:P,fragmentShader:D,depthTest:!1,depthWrite:!1,toneMapped:!1}),a=new S.bdM(2,2),n=new S.Z58;return n.add(new S.eaF(a,o)),{from:r,to:i,material:o,geometry:a,scene:n,screenCamera:new S.qUd(-1,1,1,-1,0,1),viewCamera:new S.ubm(43,1,.04,110),position:new S.Pq0,target:new S.Pq0}},[e]);return(0,o.useLayoutEffect)(()=>{if(!u)return;let t=r.getPixelRatio()*l[e].targetScale,o=Math.min(1,1600/(i.width*t),Math.sqrt(("high"===e?125e4:72e4)/(i.width*i.height*t*t))),a=Math.max(1,Math.round(i.width*t*o)),s=Math.max(1,Math.round(i.height*t*o));u.from.setSize(a,s),u.to.setSize(a,s),u.material.uniforms.uAspect.value=i.width/i.height,u.viewCamera.aspect=i.width/i.height,u.viewCamera.updateProjectionMatrix(),n()},[u,r,i.width,i.height,e,n]),(0,o.useEffect)(()=>()=>{u&&(u.from.dispose(),u.to.dispose(),u.material.dispose(),u.geometry.dispose(),u.scene.clear())},[u]),(0,a.F)(({scene:e,camera:o})=>{let a=f.t5.progress,n=u&&d(a);if(!u||!n){q(a),r.setRenderTarget(null),r.render(e,o),s.current&&(u?.from.dispose(),u?.to.dispose()),s.current=!1;return}s.current=!0;let{progress:l,outgoing:c,incoming:h}=v(a,n),m=(o,a)=>{(0,f.c5)(o,u.position,u.target),C(u.viewCamera,u.position,u.target,t,i.width/i.height),q(o),r.setRenderTarget(a),r.clear(),r.render(e,u.viewCamera)},p=r.getRenderTarget();try{m(c,u.from),m(h,u.to);let e=u.material.uniforms;e.uProgress.value=l,e.uScroll.value=a,e.uCenter.value.set(n.center[0],n.center[1]),r.setRenderTarget(null),r.render(u.scene,u.screenCamera)}finally{q(a),r.setRenderTarget(p)}},1),null}function $({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(Q,{quality:e,src:"sate.webp",end:.74,position:[t?1.4:3.6,1,-44],size:t?[3.2,4.2]:[5,6.5],rotation:[0,-.22,0]}),(0,i.jsx)(Q,{quality:e,src:"sharing.webp",end:.74,position:[t?2.5:6,-.6,-47],size:[5,4],rotation:[0,-.35,0]}),(0,i.jsx)(j,{letter:"L",quality:e,height:t?2:6.6,position:[t?.2:2.9,t?-.4:0,-42.5],rotation:[0,-.12,0],from:.49,to:.655}),(0,i.jsx)(j,{letter:"I",quality:e,height:t?1.35:3.1,position:[t?.2:1.6,t?.15:1.4,-41.5],rotation:[0,.12,0],from:.625,to:.745})]})}function Y({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(Q,{quality:e,src:"sharing.webp",position:[t?1.5:4.5,.1,-65],size:t?[7,5.6]:[10,8],round:1,rotation:[0,-.2,.1]}),(0,i.jsx)(Q,{quality:e,hot:!0,src:"rice.webp",position:[-4,-3,-63],size:[4,3.2],round:1})]})}function H({onReady:e}){let t=(0,a.D)(e=>e.invalidate);return(0,o.useEffect)(()=>(f.t5.invalidate=t,e(),()=>{f.t5.invalidate=void 0}),[t,e]),null}function G({onFailure:e}){let t=(0,a.D)(e=>e.gl);return(0,o.useEffect)(()=>{let r=t.domElement,i=t=>{t.preventDefault(),e()},o=t.debug.onShaderError;return t.debug.onShaderError=(t,r)=>{console.error("Bali Bali shader failed:",t.getProgramInfoLog(r)),queueMicrotask(e)},r.addEventListener("webglcontextlost",i),()=>{r.removeEventListener("webglcontextlost",i),t.debug.onShaderError=o}},[t,e]),null}function V({from:e,to:t,children:r}){let a=(0,o.useRef)(null);return g(r=>{a.current&&(a.current.visible=r>=e&&r<=t)}),(0,i.jsx)("group",{ref:a,children:r})}function K({onReady:e,onFailure:t}){let[r,a]=(0,o.useState)(()=>window.innerWidth<768),s=(0,o.useMemo)(()=>{var e;let t=navigator;return(e={mobile:r,cores:t.hardwareConcurrency,memory:t.deviceMemory,saveData:t.connection?.saveData}).saveData||void 0!==e.memory&&e.memory<=2?"low":e.mobile||void 0!==e.cores&&e.cores<=4||void 0!==e.memory&&e.memory<=4?"medium":"high"},[r]),[u,c]=(0,o.useState)(s);(0,o.useEffect)(()=>c(s),[s]),(0,o.useEffect)(()=>{let e=window.matchMedia("(max-width: 767px)"),t=()=>a(e.matches);return e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);let[h,d]=(0,o.useState)(0);return(0,o.useEffect)(()=>{let e=window.setInterval(()=>d(e=>Math.max(e,f.t5.progress>.72?3:f.t5.progress>.38?2:+(f.t5.progress>.12))),250);return()=>clearInterval(e)},[]),(0,i.jsxs)(n.Hl,{"aria-hidden":"true",frameloop:"demand",dpr:Math.min(window.devicePixelRatio||1,l[u].dpr,r?1.2:1.65),camera:{position:[0,1,13],fov:43,near:.04,far:110},gl:{antialias:!r,alpha:!0,powerPreference:"high-performance"},children:[(0,i.jsx)(G,{onFailure:t}),(0,i.jsx)(E,{quality:u,ceiling:s,onQuality:c}),(0,i.jsx)(T,{quality:u}),(0,i.jsx)(z,{mobile:r}),(0,i.jsx)(W,{quality:u,mobile:r}),(0,i.jsxs)(o.Suspense,{fallback:null,children:[(0,i.jsx)(V,{from:0,to:.36,children:(0,i.jsx)(O,{mobile:r,quality:u})}),(0,i.jsx)(V,{from:.085,to:.405,children:(0,i.jsx)(M,{mobile:r,quality:u})}),(0,i.jsx)(H,{onReady:e})]}),h>=1&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(V,{from:.18,to:.54,children:(0,i.jsx)(N,{mobile:r,quality:u})})}),h>=2&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(V,{from:.5,to:.755,children:(0,i.jsx)($,{quality:u,mobile:r})})}),h>=3&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(V,{from:.8,to:1,children:(0,i.jsx)(Y,{quality:u,mobile:r})})})]})}}}]);