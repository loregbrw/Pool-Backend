#!/usr/bin/env bash

# exit on error

set -o errexit

npm
npm build
npm typeorm migration:run -d ./src/data-source