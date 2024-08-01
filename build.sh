#!/bin/sh

echo "Starting build"

npm ci --omit=dev

cd client
npm ci
npm run build
cd ../

echo "Build complete"