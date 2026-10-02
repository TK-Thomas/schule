const C='sp-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET'||r.url.includes('supabase.co'))return;
e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{});return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))))});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={title:'Schulplaner',body:e.data?e.data.text():''}}
e.waitUntil(self.registration.showNotification(d.title||'Schulplaner',{body:d.body||'',icon:'./icon-192.png',badge:'./icon-192.png',tag:d.tag||'sp',renotify:true}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus'in c)return c.focus()}return clients.openWindow('./index.html')}))});
