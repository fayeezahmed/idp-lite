const jsonResponse = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(payload));
};

export const createApp = () => {
  return (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'GET' && url.pathname === '/health') {
      return jsonResponse(res, 200, {
        status: 'ok',
        service: 'idp-lite-demo-app',
      });
    }

    if (req.method === 'GET' && url.pathname === '/ready') {
      return jsonResponse(res, 200, {
        status: 'ready',
        service: 'idp-lite-demo-app',
      });
    }

    if (req.method === 'GET' && url.pathname === '/api/hello') {
      return jsonResponse(res, 200, {
        message: 'Hello from IDP Lite demo app',
      });
    }

    return jsonResponse(res, 404, {
      error: 'Not Found',
    });
  };
};
