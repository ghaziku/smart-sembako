const C='sembako-v1',A=['./','./index.html','./css/style.css','./js/config.js','./js/app.js','./icon.svg','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.hostname.includes('google.com')&&u.pathname.includes('/macros/'))return;
e.respondWith(caches.match(e.request).then(m=>{const f=fetch(e.request).then(r=>{if(r.ok&&u.origin===location.origin)caches.open(C).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>m);return m||f;}));}); // stale-while-revalidate
