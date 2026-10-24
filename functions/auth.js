// GitHub OAuth — படி 1: GitHub உள்நுழைவுப் பக்கத்துக்கு அனுப்புகிறது
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${url.origin}/callback`,
    scope: 'repo,user',
    state,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params}`,
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; Path=/; Max-Age=600; SameSite=Lax`,
    },
  });
}
