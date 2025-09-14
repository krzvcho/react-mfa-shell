# React MFA Shell Monorepo

This repository contains two separate Vite + React applications configured for module federation:

- **host-app**: The main application that loads remote components.
- **remote-app**: The remote application exposing components to the host.

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

## Install Dependencies

Install dependencies for both apps:

```sh
cd host-app
npm install

cd ../remote-app
npm install
```

## Running the Applications

### 1. Start the Remote App

The remote app must be running first so the host can load its federated modules.

```sh
cd remote-app
npm run dev
```

This will start the remote app on [http://localhost:5001](http://localhost:5001).

### 2. Start the Host App

In a separate terminal, start the host app:

```sh
cd host-app
npm run dev
```

This will start the host app on [http://localhost:5000](http://localhost:5000).

## Usage

- Open [http://localhost:5000](http://localhost:5000) in your browser.
- The host app will dynamically load components from the remote app.

## Build & Preview

To build and preview each app:

```sh
# Build remote app
cd remote-app
npm run serve


# Build host app
cd ../host-app
npm run serve

## Troubleshooting

- Ensure the remote app is running before starting the host app.
- If ports are busy, update the `vite.config.ts` files for each app.

## Project Structure

```
react-mfa-shell/
  host-app/
    ...
  remote-app/
    ...
```

## License