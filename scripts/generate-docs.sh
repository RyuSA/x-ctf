#!/bin/bash

mkdir -p docs
cp README.md docs/

for challenge in 301-redirect operational-error prompting welcome-cookie; do
  mkdir -p "docs/$challenge"
  cp "$challenge/README.md" "docs/$challenge/"
done
