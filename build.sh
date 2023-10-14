#!/bin/bash
docker buildx build --platform linux/amd64 -f frontend.dockerfile -t ghcr.io/bkode-vn/ccp-frontend:latest --push .
