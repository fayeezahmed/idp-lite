import http from 'node:http';
import assert from 'node:assert/strict';
import { describe, it, before, after } from 'node:test';
import { createApp } from '../src/app.js';

let server;
let baseUrl;

const getJson = async (path) => {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.json();

  return {
    status: response.status,
    body,
  };
};

describe('idp-lite-demo-app', () => {
  before(async () => {
    server = http.createServer(createApp());

    await new Promise((resolve) => {
      server.listen(0, () => {
        const { port } = server.address();
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  it('returns health status', async () => {
    const response = await getJson('/health');

    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'ok');
    assert.equal(response.body.service, 'idp-lite-demo-app');
  });

  it('returns readiness status', async () => {
    const response = await getJson('/ready');

    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'ready');
    assert.equal(response.body.service, 'idp-lite-demo-app');
  });

  it('returns hello message', async () => {
    const response = await getJson('/api/hello');

    assert.equal(response.status, 200);
    assert.equal(response.body.message, 'Hello from IDP Lite demo app');
  });

  it('returns 404 for unknown routes', async () => {
    const response = await getJson('/unknown');

    assert.equal(response.status, 404);
    assert.equal(response.body.error, 'Not Found');
  });
});
