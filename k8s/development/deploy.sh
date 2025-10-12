#!/usr/bin/env bash

set -xeo pipefail;

kubectl apply -f ./deployments/web.yaml;
kubectl apply -f ./ingress/web.yaml;
kubectl apply -f ./services/web.yaml;

kubectl rollout restart \
  deployment.apps/ladesa-ro-web \
  --namespace ladesa-ro-development \
;
