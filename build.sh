#!/usr/bin/env bash

# exit on error

set -o errexit

npm run build
npm run typeorm migration:run -- -d ./src/data-source
