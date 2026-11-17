"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[221],{2221:(e,t,r)=>{r.r(t),r.d(t,{default:()=>O});var i=r(5155),o=r(2115),a=r(602),n=r(7601),l=r(5860),s=r(6275),u=r(5250),c=r(3696);let v=new Set;function d(e){v.forEach(t=>t(e))}function f(e){let t=(0,o.useRef)(e);(0,o.useLayoutEffect)(()=>{t.current=e}),(0,o.useLayoutEffect)(()=>{let e=e=>t.current(e);return v.add(e),e(c.t5.progress),c.t5.invalidate?.(),()=>{v.delete(e)}},[])}var h=r(6383),p=r(5269),m=r(2904),g=r(6318),x=r(8750);let w={gateway:["#ac9273","#d1b48a","#786650"],penjor:["#b88a4c","#e2c68d","#72805a"],foliage:["#60372a","#b18a51","#815641"],jepun:["#ffffff","#dfb456","#d3c2a7"]};function b({symbol:e,quality:t,scale:r,position:a,rotation:n,from:l,to:s}){let c=(0,o.useRef)(null),v=(0,o.useRef)([]),d=(0,o.useMemo)(()=>(function(e,t){let r="high"===t?24:"medium"===t?12:6,i="high"===t?8:"medium"===t?6:4,o=[[],[],[]],a=(e,t=0)=>{let r=e.index?e.toNonIndexed():e;if(r!==e&&e.dispose(),!r.getAttribute("color")){let e=new Float32Array(3*r.getAttribute("position").count).fill(1);r.setAttribute("color",new p.qtW(e,3))}r.clearGroups(),o[t].push(r)},n=(e,r,i,o,n,l,s=0)=>a(("low"===t?new p.iNn(o,n,l):new m.j(o,n,l,1,.18*Math.min(o,n,l,.03))).translate(e,r,i),s),l=(e,i,o=0,n=0)=>{a(new p.QCA(e,{depth:i,steps:1,curveSegments:r/2,bevelEnabled:"low"!==t,bevelSegments:"high"===t?2:1,bevelSize:.003,bevelThickness:.003}).translate(0,0,n-i/2),o)},s=(e,t,o=0)=>a(new p.j6(new p.B6O(e.map(e=>new p.Pq0(...e))),r,t,i,!1),o),u=(e,i,o,n,l,s,u=.04,c=!1)=>{let v=new p.ypk;v.moveTo(0,0),c?(v.bezierCurveTo(-(.9*n),.1*o,-(1.1*n),.28*o,-(.7*n),.36*o),v.bezierCurveTo(-(1.25*n),.38*o,-(.8*n),.58*o,-(.4*n),.62*o),v.bezierCurveTo(-(.8*n),.75*o,-(.4*n),.88*o,.15*n,o),v.bezierCurveTo(.7*n,.8*o,.95*n,.8*o,.55*n,.64*o),v.bezierCurveTo(1.1*n,.55*o,.9*n,.45*o,.6*n,.35*o),v.bezierCurveTo(n,.2*o,.4*n,.1*o,0,0)):(v.bezierCurveTo(-n,.25*o,-(.55*n),.8*o,0,o),v.bezierCurveTo(.8*n,.72*o,.6*n,.2*o,0,0));let d=new p.QCA(v,{depth:.012,bevelEnabled:"low"!==t,bevelSize:.0015,bevelThickness:.0015,bevelSegments:1,curveSegments:c?"high"===t?4:"medium"===t?3:2:r/2}),f=d.getAttribute("position");for(let e=0;e<f.count;e++){let t=f.getY(e)/o;f.setZ(e,f.getZ(e)+.014*Math.sin(t*Math.PI)+t*t*.012)}d.computeVertexNormals(),d.rotateZ(l).translate(e,i,u),a(d,s)};if("gateway"===e)for(let e of[-1,1]){let t=new p.ypk;for(let[r,i]of([[.13,-.48],[.13,.5],[.2,.5],[.2,.39],[.27,.39],[.27,.24],[.34,.24],[.34,.08],[.42,.08],[.42,-.1],[.5,-.1],[.5,-.3],[.57,-.3],[.57,-.48]].forEach(([r,i],o)=>o?t.lineTo(r*e,i):t.moveTo(r*e,i)),t.closePath(),l(t,.15),n(.35*e,-.48,0,.49,.055,.22,2),[[-.31,.4],[-.11,.32],[.07,.24],[.23,.17],[.38,.1]]))for(let t of(n(e*(.13+i/2),r,0,i,.026,.2,1),[-.081,.081]))n(e*(.16+i/2),r+.06,t,Math.max(.025,i-.065),.058,.012,2);for(let t of[-.097,.097]){s([[.151*e,-.4,t],[.151*e,0,t],[.151*e,.45,t]],.007,1);for(let r=0;r<4;r++){let i=-.24+.17*r;u(e*(.41-.075*r),i,.11,.035,-.65*e,1,t)}}}else if("penjor"===e){let e=new p.s0K(new p.Pq0(-.42,-.5,0),new p.Pq0(-.65,.95,-.025),new p.Pq0(.38,.8,.025),new p.Pq0(.4,.08,0));a(new p.j6(e,2*r,.014,i,!1));for(let t=1;t<=10;t++){let r=t/12,o=e.getPoint(r),n=e.getTangent(r),l=new p.Ho_(.018,.018,.009,i);if(l.applyMatrix4(new p.kn4().compose(o,new p.PTz().setFromUnitVectors(new p.Pq0(0,1,0),n),new p.Pq0(1,1,1))),a(l,1),t>=4){let e=-Math.atan2(n.x,n.y);u(o.x,o.y,.105,.025,e-.75,1,.02),u(o.x,o.y,.085,.024,e+.8,2,.025)}}s([[.4,.08,0],[.4,-.05,.01],[.4,-.22,0]],.004,1);for(let e=0;e<4;e++){let t=-.02-.045*e;u(.4,t,.09,.025,-.9,1),u(.4,t,.09,.025,.9,1)}let t=new p.ypk;t.moveTo(.4,-.2),t.lineTo(.455,-.27),t.lineTo(.4,-.34),t.lineTo(.345,-.27),t.closePath(),l(t,.02,1);for(let e=-1;e<=1;e++)s([[.4+.018*e,-.33,0],[.4+.03*e,-.4,.01],[.4+.034*e,-.46,.02]],.003,0===e?2:1)}else if("foliage"===e){let e=new p.ypk;e.moveTo(0,.48),e.bezierCurveTo(-.32,.48,-.47,.18,-.43,-.15),e.bezierCurveTo(-.4,-.43,-.2,-.49,0,-.47),e.bezierCurveTo(.3,-.49,.46,-.25,.43,.05),e.bezierCurveTo(.42,.3,.24,.48,0,.48);let r=new p.wAk;for(let i of(r.absellipse(0,0,.28,.36,0,2*Math.PI,!0),e.holes.push(r),l(e,.075),[-1,1])){s([[.08*i,-.42,.054],[.34*i,-.25,.054],[.35*i,.1,.054],[.15*i,.38,.054],[0,.43,.054]],.009,1);for(let e=0;e<6;e++){let r=-1.16+e/5*2.4,o=i*Math.cos(r)*.34,a=.38*Math.sin(r);u(o,a,.18,.055,i*(-Math.PI/2+.9*r),e%2?0:2,.02,!0),"low"!==t&&u(o,a,.1,.03,i*(-.5+r),1,.063,!0),(1===e||4===e)&&s(Array.from({length:15},(e,t)=>{let r=t/14*Math.PI*2.15,n=.055*(1-t/18);return[o+i*(.025+Math.cos(r)*n),a+Math.sin(r)*n,.073]}),.0045,1)}}u(0,.37,.2,.07,0,0,.04,!0),u(0,-.37,.17,.065,Math.PI,0,.04,!0)}else{a(new p.Gu$(.064,2*i,i).scale(1,1,.35).translate(0,0,-.035),1);let e=Math.max(6,r/2);for(let t=0;t<5;t++){let i=[],o=[],n=[],l=[],s=t*Math.PI*2/5+.2;for(let t=0;t<=r;t++){let a=t/r,l=.045+.49*a,u=.008+.185*Math.pow(Math.sin(Math.PI*a),.8),c=s+.32*a;for(let t=0;t<=e;t++){let r=t/e*2-1,s=r*u;i.push(l*Math.cos(c)-s*Math.sin(c),l*Math.sin(c)+s*Math.cos(c),-.035+.095*Math.sin(a*Math.PI)+r*r*.045+r*a*.035);let v=new p.Q1f("#dfb456").lerp(new p.Q1f("#fff5e4"),(0,g.e1)((a-.02)/.56));o.push(v.r,v.g,v.b),n.push(a,t/e)}}for(let t=0;t<r;t++)for(let r=0;r<e;r++){let i=t*(e+1)+r,o=i+e+1;l.push(i,o,i+1,o,o+1,i+1)}let u=new p.LoY;u.setAttribute("position",new p.qtW(i,3)),u.setAttribute("uv",new p.qtW(n,2)),u.setAttribute("color",new p.qtW(o,3)),u.setIndex(l),u.computeVertexNormals(),a(u,0)}for(let e=0;e<5;e++){let t=e*Math.PI*2/5+.2;s([[.07*Math.cos(t),.07*Math.sin(t),-.04],[.25*Math.cos(t+.15),.25*Math.sin(t+.15),.015],[.43*Math.cos(t+.28),.43*Math.sin(t+.28),.015]],.0025,2)}}let c=o.map(e=>{let t=(0,x.pP)(e,!1);return e.forEach(e=>e.dispose()),t}),v=(0,x.pP)(c,!0);return c.forEach(e=>e.dispose()),v.computeBoundingBox(),v.computeBoundingSphere(),v})(e,t),[e,t]);return(0,o.useEffect)(()=>()=>d.dispose(),[d]),f(e=>{let t=(0,u.Jp)(l,l+.025,e)*(1-(0,u.Jp)(s-.025,s,e));c.current&&(c.current.visible=t>.001),v.current.forEach(e=>{e&&(e.opacity=t,e.depthWrite=t>.98)})}),(0,i.jsx)("group",{ref:c,name:`cultural-${e}`,position:a,rotation:n,scale:r,children:(0,i.jsxs)("mesh",{children:[(0,i.jsx)("primitive",{attach:"geometry",object:d}),w[e].map((t,r)=>(0,i.jsx)("meshStandardMaterial",{ref:e=>{v.current[r]=e},attach:`material-${r}`,color:t,vertexColors:!0,roughness:"jepun"===e?.52:"foliage"===e?.66:.82,metalness:.2*("foliage"===e&&1===r),side:p.$EB,transparent:!0},r))]})})}function y({mobile:e,quality:t}){return(0,i.jsx)(i.Fragment,{children:["gateway","penjor"].map(r=>(0,i.jsx)(b,{...(0,h.R)(r,e),quality:t},r))})}function M({quality:e}){let{scene:t,gl:r}=(0,l.D)(),a=(0,o.useRef)(null),n=(0,o.useRef)(null),s=(0,o.useMemo)(()=>({ivory:new p.Q1f("#f4ebdd"),heritage:new p.Q1f("#e0cab0"),evening:new p.Q1f("#e5d7c5"),current:new p.Q1f}),[]);return f(e=>{let i=(0,u.Jp)(.49,.59,e)*(1-(0,u.Jp)(.66,.77,e)),o=(0,u.Jp)(.66,.77,e)*(1-(0,u.Jp)(.83,.93,e));s.current.copy(s.ivory).lerp(s.heritage,i).lerp(s.evening,o),t.background=s.current,r.toneMappingExposure=1-.025*i,a.current&&(a.current.intensity=1.8-.12*o),n.current&&(n.current.intensity=2.4+.15*i)}),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("ambientLight",{ref:a,intensity:1.8}),(0,i.jsx)("directionalLight",{ref:n,position:[5,8,10],intensity:2.4,color:"#fff3df"}),"high"===e&&(0,i.jsx)("hemisphereLight",{args:["#fff8ed","#b66d4d",.3]})]})}function j({quality:e,ceiling:t,onQuality:r}){let{gl:i,invalidate:a}=(0,l.D)(),n=(0,o.useRef)(!0);(0,o.useRef)(0);let s=(0,o.useRef)(1/60),v=(0,o.useMemo)(()=>new u.BR(t,t),[t]);return(0,o.useEffect)(()=>{let e=i.domElement,t=()=>{v.reset(),!document.hidden&&n.current&&a()},r=new IntersectionObserver(([e])=>{n.current=e.isIntersecting,t()});return r.observe(e),document.addEventListener("visibilitychange",t),()=>{r.disconnect(),document.removeEventListener("visibilitychange",t)}},[i,a,v]),(0,o.useEffect)(()=>{i.domElement.dataset.quality=e},[i,e]),(0,l.F)((t,i)=>{if(document.hidden||!n.current)return void v.reset();c.t5.time+=Math.min(i,.05),i<.2&&(s.current+=(i-s.current)*.05);let o=v.sample(i);o!==e&&r(o),"low"!==e&&(0,u.Bx)(c.t5.progress)&&a()},-2),(0,l.F)((e,t)=>{},2),null}function T(e,t,r,i,o){e.position.copy(t);let a=i&&o<1?51:43;e.fov!==a&&(e.fov=a,e.updateProjectionMatrix()),e.lookAt(r),e.updateMatrixWorld()}function S({mobile:e}){let[t,r]=(0,o.useMemo)(()=>[new p.Pq0,new p.Pq0],[]),i=(0,l.D)(e=>e.size);return(0,l.F)(({camera:o})=>{(0,c.c5)(c.t5.progress,t,r,e),T(o,t,r,e,i.width/i.height)},-1),null}let q=`
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise21(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),f.x),
             mix(hash21(i+vec2(0.,1.)),hash21(i+1.),f.x),f.y);
}
`,P=`
varying vec2 vUv;
void main() { vUv=uv; gl_Position=vec4(position.xy,0.,1.); }
`,C=`
uniform sampler2D uFrom, uTo, uDepthFrom, uDepthTo;
uniform float uProgress, uAspect, uNear, uFar, uQuality, uScroll;
uniform vec2 uCenter;
varying vec2 vUv;
${q}
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
`,E=`
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
`,F=`
uniform sampler2D photo;
uniform vec2 uCover;
uniform float rounded, visibility, uTime, uHeat, uQuality, uWarmth, uScroll, uScene, uTransition;
varying vec2 vUv;
varying float vRelief;
${q}
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
${q}
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
`,R=`
uniform float uTime, uOpacity;
varying float vLife;
varying float vSeed;
${q}
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
`,U=new Map;function D({quality:e,visibility:t}){let r=(0,o.useRef)(null),a=(0,o.useRef)(null),{size:n,gl:s}=(0,l.D)(),v=u.Fx[e].particles,d=(0,o.useMemo)(()=>{let e=new Float32Array(4*v);for(let t=0;t<e.length;t++)e[t]=(16807*t+137)%65521/65521;return e},[v]),h=(0,o.useMemo)(()=>new Float32Array(3*v),[v]),p=(0,o.useMemo)(()=>({uTime:{value:0},uOpacity:{value:0},uPointScale:{value:1},uQuality:{value:2}}),[]);return(f(i=>{let o=t(i)*(0,u.vp)(i)*(0,u.vp)(c.t5.progress)*("high"===e?.105:.075);if(r.current&&(r.current.visible=o>.002&&"low"!==e),!a.current)return;let l=a.current.uniforms;l.uOpacity.value=o,l.uTime.value=c.t5.time,l.uPointScale.value=n.height*s.getPixelRatio()*1.15,l.uQuality.value=u.Fx[e].noise}),v)?(0,i.jsxs)("points",{ref:r,frustumCulled:!1,renderOrder:4,children:[(0,i.jsxs)("bufferGeometry",{children:[(0,i.jsx)("bufferAttribute",{attach:"attributes-position",args:[h,3]}),(0,i.jsx)("bufferAttribute",{attach:"attributes-aSeed",args:[d,4]})]}),(0,i.jsx)("shaderMaterial",{ref:a,uniforms:p,transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:z,fragmentShader:R})]}):null}function k({src:e,position:t,size:r=[6,4.8],rotation:l=[0,0,0],round:s=0,start:v=-1,end:d=2,hot:h=!1,quality:m="high"}){var x;let w=(0,a.zo)((0,n.LY)(e));w.colorSpace=p.er$,x=(0,n.LY)(e),(0,o.useEffect)(()=>(U.set(w,(U.get(w)||0)+1),()=>{U.set(w,(U.get(w)||1)-1),queueMicrotask(()=>{0===U.get(w)&&(U.delete(w),w.dispose(),a.zo.clear(x))})}),[w,x]);let b=(0,o.useRef)(null),y=w.image,M=y.width/y.height,j=r[0]/r[1],T=(0,o.useMemo)(()=>({photo:{value:w},rounded:{value:s},visibility:{value:1},uCover:{value:new p.I9Y(Math.min(1,j/M),Math.min(1,M/j))},uRelief:{value:"low"!==m&&s?.014*r[0]:0},uTime:{value:0},uHeat:{value:0},uQuality:{value:u.Fx[m].noise},uWarmth:{value:1},uScroll:{value:0},uScene:{value:0},uTransition:{value:0}}),[w,s,M,j,m,r[0]]),S=e=>(0,g.Pc)(e,v,d);f(e=>{if(!b.current)return;let t=b.current.uniforms;t.visibility.value=S(e),t.uTime.value=c.t5.time,t.uScroll.value=e,t.uScene.value=6*e%1,t.uTransition.value=1-(0,u.vp)(e),t.uHeat.value=h?(0,u.vp)(e)*(0,u.vp)(c.t5.progress)*("high"===m?1:.55):0,t.uWarmth.value=1+.25*(0,u.Jp)(.5,.7,e)});let q=s?u.Fx[m].segments:1;return(0,i.jsxs)("group",{position:t,rotation:l,children:[!!s&&"low"!==m&&(0,i.jsxs)("mesh",{position:[.04,-.06,-.035],children:[(0,i.jsx)("planeGeometry",{args:[1.06*r[0],1.06*r[1]]}),(0,i.jsx)("shaderMaterial",{uniforms:T,transparent:!0,side:p.$EB,depthWrite:!1,toneMapped:!1,vertexShader:E,fragmentShader:`uniform float visibility; varying vec2 vUv;
              void main() {
                float radius=length((vUv-.5)*2.);
                float alpha=(1.-smoothstep(.72,1.,radius))*.09*visibility;
                if(alpha<.001) discard;
                gl_FragColor=vec4(.055,.032,.022,alpha);
                #include <colorspace_fragment>
              }`})]}),(0,i.jsxs)("mesh",{children:[(0,i.jsx)("planeGeometry",{args:[r[0],r[1],q,q]}),(0,i.jsx)("shaderMaterial",{ref:b,uniforms:T,defines:{EFFECT_QUALITY:u.Fx[m].noise},transparent:!0,side:p.$EB,depthWrite:!1,toneMapped:!1,vertexShader:E,fragmentShader:F},m)]}),h&&"low"!==m&&(0,i.jsx)(D,{quality:m,visibility:S})]})}function A({mobile:e,quality:t}){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(k,{quality:t,hot:!0,src:"sate.webp",position:[e?.9:3.3,e?-.5:-.3,0],size:e?[7.8,6.24]:[10,8],round:1,rotation:[0,-.12,-.12],end:.2}),(0,i.jsxs)(o.Suspense,{fallback:null,children:[(0,i.jsx)(k,{quality:t,hot:!0,src:"rendang.webp",position:[-4,-.7,-5],size:[5.5,4.4],round:1,rotation:[.12,.35,.12],start:.07,end:.3}),(0,i.jsx)(k,{quality:t,src:"vegetables.webp",position:[4.5,.4,-8],size:[5.3,4.2],round:1,rotation:[-.1,-.3,-.18],start:.08,end:.33}),!e&&(0,i.jsx)(k,{quality:t,src:"rice.webp",position:[-3.9,2,-10],size:[4,3.2],round:1,rotation:[.15,.25,-.2],start:.1,end:.35})]})]})}function I({mobile:e,quality:t}){let r=(0,o.useRef)(null);return f(e=>{r.current&&(r.current.rotation.x=(1-p.cj9.smoothstep(e,.34,.47))*Math.PI/2)}),(0,i.jsxs)("group",{ref:r,position:[0,0,-26],children:[(0,i.jsx)(k,{start:.18,end:.57,quality:t,src:"sharing.webp",position:[0,.02,0],size:[7,5.6],rotation:[-Math.PI/2,0,0],round:1}),(0,i.jsx)(k,{start:.18,end:.57,quality:t,hot:!0,src:"sate.webp",position:[-5,.1,1],size:[4,3.2],rotation:[-Math.PI/2,0,-.4],round:1}),(0,i.jsx)(k,{start:.18,end:.57,quality:t,hot:!0,src:"rendang.webp",position:[4.5,.14,-1.8],size:[4,3.2],rotation:[-Math.PI/2,0,.3],round:1}),!e&&(0,i.jsx)(k,{start:.18,end:.57,quality:t,src:"vegetables.webp",position:[1,.12,4.1],size:[3.4,2.7],rotation:[-Math.PI/2,0,-.25],round:1})]})}function L({quality:e,mobile:t}){let{gl:r,size:i,invalidate:a}=(0,l.D)(),n=(0,o.useRef)(!1),s=(0,o.useMemo)(()=>{if("low"===e)return null;let t=()=>{let e=new p.nWS(1,1,{type:p.OUM,depthBuffer:!0,stencilBuffer:!1});return e.depthTexture=new p.VCu(1,1),e.texture.generateMipmaps=!1,e},r=t(),i=t(),o=new p.BKk({uniforms:{uFrom:{value:r.texture},uTo:{value:i.texture},uDepthFrom:{value:r.depthTexture},uDepthTo:{value:i.depthTexture},uProgress:{value:0},uAspect:{value:1},uCenter:{value:new p.I9Y(.5,.5)},uNear:{value:.04},uFar:{value:110},uQuality:{value:u.Fx[e].noise},uScroll:{value:0}},vertexShader:P,fragmentShader:C,depthTest:!1,depthWrite:!1,toneMapped:!1}),a=new p.bdM(2,2),n=new p.Z58;return n.add(new p.eaF(a,o)),{from:r,to:i,material:o,geometry:a,scene:n,screenCamera:new p.qUd(-1,1,1,-1,0,1),viewCamera:new p.ubm(43,1,.04,110),position:new p.Pq0,target:new p.Pq0}},[e]);return(0,o.useLayoutEffect)(()=>{if(!s)return;let t=r.getPixelRatio()*u.Fx[e].targetScale,o=Math.min(1,1600/(i.width*t),Math.sqrt(("high"===e?125e4:72e4)/(i.width*i.height*t*t))),n=Math.max(1,Math.round(i.width*t*o)),l=Math.max(1,Math.round(i.height*t*o));s.from.setSize(n,l),s.to.setSize(n,l),s.material.uniforms.uAspect.value=i.width/i.height,s.viewCamera.aspect=i.width/i.height,s.viewCamera.updateProjectionMatrix(),a()},[s,r,i.width,i.height,e,a]),(0,o.useEffect)(()=>()=>{s&&(s.from.dispose(),s.to.dispose(),s.material.dispose(),s.geometry.dispose(),s.scene.clear())},[s]),(0,l.F)(({scene:e,camera:o})=>{let a=c.t5.progress,l=s&&(0,u.lx)(a),v=l&&"shader"===l.mode?l:void 0;if(!s||!v){d(a),r.setRenderTarget(null),r.render(e,o),n.current&&(s?.from.dispose(),s?.to.dispose()),n.current=!1;return}n.current=!0;let{progress:f,outgoing:h,incoming:p}=(0,u.vD)(a,v),m=(o,a)=>{(0,c.c5)(o,s.position,s.target,t),T(s.viewCamera,s.position,s.target,t,i.width/i.height),d(o),r.setRenderTarget(a),r.clear(),r.render(e,s.viewCamera)},g=r.getRenderTarget();try{m(h,s.from),m(p,s.to);let e=s.material.uniforms;e.uProgress.value=f,e.uScroll.value=a,e.uCenter.value.set(v.center[0],v.center[1]),r.setRenderTarget(null),r.render(s.scene,s.screenCamera)}finally{d(a),r.setRenderTarget(g)}},1),null}function Q({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(k,{quality:e,start:.49,src:"sate.webp",end:.74,position:[t?3.2:7.5,1,-44],size:t?[3.2,4.2]:[5,6.5],rotation:[0,-.22,0]}),(0,i.jsx)(k,{quality:e,start:.49,src:"sharing.webp",end:.74,position:[t?-2.2:-.6,-.6,-47],size:t?[3.6,2.88]:[5,4],rotation:[0,-.35,0]}),["foliage","jepun"].map(r=>(0,i.jsx)(b,{...(0,h.R)(r,t),quality:e},r))]})}function _({quality:e,mobile:t}){return(0,i.jsxs)("group",{children:[(0,i.jsx)(k,{quality:e,src:"sharing.webp",start:.64,position:[t?1.5:4.5,.1,-65],size:t?[7,5.6]:[10,8],round:1,rotation:[0,-.2,.1]}),(0,i.jsx)(k,{quality:e,hot:!0,src:"rice.webp",start:.64,position:[-4,-3,-63],size:[4,3.2],round:1})]})}function B({onReady:e}){let t=(0,l.D)(e=>e.invalidate);return(0,o.useEffect)(()=>(c.t5.invalidate=t,e(),()=>{c.t5.invalidate=void 0}),[t,e]),null}function W({onFailure:e}){let t=(0,l.D)(e=>e.gl);return(0,o.useEffect)(()=>{let r=t.domElement,i=t=>{t.preventDefault(),e()},o=t.debug.onShaderError;return t.debug.onShaderError=(t,r)=>{console.error("Bali Bali shader failed:",t.getProgramInfoLog(r)),queueMicrotask(e)},r.addEventListener("webglcontextlost",i),()=>{r.removeEventListener("webglcontextlost",i),t.debug.onShaderError=o}},[t,e]),null}function N({from:e,to:t,children:r}){let a=(0,o.useRef)(null);return f(r=>{a.current&&(a.current.visible=r>=e&&r<=t)}),(0,i.jsx)("group",{ref:a,children:r})}function O({onReady:e,onFailure:t}){let[r,l]=(0,o.useState)(()=>window.innerWidth<768),v=(0,o.useMemo)(()=>{let e=navigator;return(0,u.oV)({mobile:r,cores:e.hardwareConcurrency,memory:e.deviceMemory,saveData:e.connection?.saveData})},[r]),[d,f]=(0,o.useState)(v);(0,o.useEffect)(()=>f(v),[v]),(0,o.useEffect)(()=>{let e=window.matchMedia("(max-width: 767px)"),t=()=>l(e.matches);return e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]);let[h,p]=(0,o.useState)(0);return(0,o.useEffect)(()=>{c.t5.prepare=e=>p(t=>Math.max(t,e>.58?3:e>.38?2:+(e>.12))),a.zo.preload((0,n.LY)("sharing.webp"));let e=window.setInterval(()=>p(e=>Math.max(e,c.t5.progress>.58?3:c.t5.progress>.38?2:+(c.t5.progress>.12))),250);return()=>{clearInterval(e),c.t5.prepare=void 0}},[]),(0,i.jsxs)(s.Hl,{"aria-hidden":"true",frameloop:"demand",dpr:Math.min(window.devicePixelRatio||1,u.Fx[d].dpr,r?1.2:1.65),camera:{position:[0,1,13],fov:43,near:.04,far:110},gl:{antialias:!r,alpha:!0,powerPreference:"high-performance"},children:[(0,i.jsx)(W,{onFailure:t}),(0,i.jsx)(j,{quality:d,ceiling:v,onQuality:f}),(0,i.jsx)(M,{quality:d}),(0,i.jsx)(S,{mobile:r}),(0,i.jsx)(L,{quality:d,mobile:r}),(0,i.jsxs)(o.Suspense,{fallback:null,children:[(0,i.jsx)(N,{from:0,to:.36,children:(0,i.jsx)(A,{mobile:r,quality:d})}),(0,i.jsx)(N,{from:.085,to:.45,children:(0,i.jsx)(y,{mobile:r,quality:d})}),(0,i.jsx)(B,{onReady:e})]}),h>=1&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(N,{from:.18,to:.58,children:(0,i.jsx)(I,{mobile:r,quality:d})})}),h>=2&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(N,{from:.49,to:.79,children:(0,i.jsx)(Q,{quality:d,mobile:r})})}),h>=3&&(0,i.jsx)(o.Suspense,{fallback:null,children:(0,i.jsx)(N,{from:.62,to:1,children:(0,i.jsx)(_,{quality:d,mobile:r})})})]})}}}]);