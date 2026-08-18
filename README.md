# IDP Lite Demo App

A minimal Node.js API for the IDP-lite project.

This is intentionally small. Its job is to act as the workload that later IDP phases will containerise, deploy to Kubernetes, connect to CI, and eventually manage through GitOps.

## Requirements

- Node.js 20 or later
- npm

## Endpoints

| Method | Endpoint     | Purpose                      |
| ------ | ------------ | ---------------------------- |
| GET    | `/health`    | Liveness-style health check  |
| GET    | `/ready`     | Readiness-style check        |
| GET    | `/api/hello` | Example application endpoint |

## Install

No third-party dependencies are required.

```bash
npm install
```

## Run locally

```bash
npm start
```

The app starts on port `3000` by default.

To use a different port:

```bash
PORT=4000 npm start
```

## Test the endpoints

In another terminal:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/ready
curl http://localhost:3000/api/hello
```

Expected responses:

```json
{ "status": "ok", "service": "idp-lite-demo-app" }
```

```json
{ "status": "ready", "service": "idp-lite-demo-app" }
```

```json
{ "message": "Hello from IDP Lite demo app" }
```

## Run tests

```bash
npm test
```

The tests use Node's built-in test runner and do not need Jest, Supertest, or Express.

## Project structure

```text
idp-lite-demo-app/
├── package.json
├── README.md
├── src/
│   ├── app.js
│   └── server.js
└── test/
    └── app.test.js
```

## Execute with Minikube

Pre-requisite:

- VirtualBox
- Minikube
- kubectl

### Steps

#### Deploy application

1. Get minikube started with virtualbox:
   `minikube start --driver=virtualbox`
2. Deploy application:

```
kubectl apply -f ./k8s/idp-lite-replicaset.yaml
kubectl apply -f ./k8s/idp-lite-svc.yaml
```

#### Execute

1. Get URL:
   `minikube service idp-lite-service --url`
2. Test with curl:

```
curl http://192.168.59.102:30080/health
curl http://192.168.59.102:30080/ready
curl http://192.168.59.102:30080/api/hello
```
