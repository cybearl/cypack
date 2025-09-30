/**
 * A fully permissive Content Security Policy header that can be used for development purposes,
 * no need to say that this should **NEVER** be used in production...
 */
export const fullyPermissiveCspHeader = `
    default-src * data: mediastream: blob: filesystem: about: ws: wss: 'unsafe-eval' 'wasm-unsafe-eval' 'unsafe-inline';
    script-src * data: blob: 'unsafe-inline' 'unsafe-eval';
    script-src-elem * data: blob: 'unsafe-inline';
    connect-src * data: blob: 'unsafe-inline';
    img-src * data: blob: 'unsafe-inline';
    media-src * data: blob: 'unsafe-inline';
    frame-src * data: blob: ;
    style-src * data: blob: 'unsafe-inline';
    font-src * data: blob: 'unsafe-inline';
    frame-ancestors * data: blob:;
`
    .replace(/\s{2,}/g, " ")
    .trim()
