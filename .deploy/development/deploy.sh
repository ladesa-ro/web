#!/usr/bin/env bash

set -xeo pipefail;

K8S_NAMESPACE=ladesa-ro-development
K8S_DEPLOYMENT=ladesa-ro-web

kubectl apply \
  --namespace ${K8S_NAMESPACE} \
  -f ./deployments/web.yaml;

kubectl apply \
  --namespace ${K8S_NAMESPACE} \
  -f ./services/web.yaml;

kubectl apply \
  --namespace ${K8S_NAMESPACE} \
  -f ./ingress/web.yaml;

kubectl rollout restart \
  deployment.apps/${K8S_DEPLOYMENT} \
  --namespace ${K8S_NAMESPACE};

kubectl rollout status \
  deployment.apps/${K8S_DEPLOYMENT} \
  --namespace ${K8S_NAMESPACE} \
  --timeout=720s;