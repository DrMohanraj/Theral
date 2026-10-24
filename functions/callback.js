// GitHub OAuth — படி 2: code-ஐ token ஆக மாற்றி Decap CMS-க்குத் தருகிறது
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('Cookie') || '';
  const savedState = (cookie.match(/(?:^|;\s*)oauth_state=([^;]+)/) || [])[1];

  if (!code || !state || state !== savedState) {
    return page('error', { message: 'உள்நுழைவு சரிபார்ப்பு தோல்வி. மீண்டும் முயற்சிக்கவும்.' });
  }

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'User-Agent': 'koovel-cms' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
    }),
  });
  const data = await res.json();

  if (!data.access_token) {
    return page('error', { message: data.error_description || 'Token பெற முடியவில்லை.' });
  }
  return page('success', { token: data.access_token, provider: 'github' });
}

function page(status, content) {
  const msg = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><html><body><script>
(function () {
  function receive(e) {
    window.opener.postMessage(${JSON.stringify(msg)}, e.origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': 'oauth_state=; HttpOnly; Secure; Path=/; Max-Age=0',
    },
  });
}
