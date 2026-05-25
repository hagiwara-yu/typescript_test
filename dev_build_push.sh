#!/usr/bin/env bash

set -e

AWS_REGION="ap-northeast-1"
REPOSITORY_NAME="development-sec-cloud-asset-inventory-frontend-ecr"
CLUSTER_NAME="development-sec-cloud-asset-inventory-ecs-cluster"
SERVICE_NAME="development-sec-cloud-asset-inventory-ecs-frontend-serivce"

# タグ情報（Gitのハッシュ + タイムスタンプ）
IMAGE_TAG="$(git rev-parse HEAD | cut -c 1-7)-$(date '+%Y%m%d-%H%M')"

# アカウント & URI
AWS_ACCOUNT_ID="$(aws sts get-caller-identity --query 'Account' --output text)"
CONTAINER_REGISTRY_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
IMAGE_URI_LATEST="${CONTAINER_REGISTRY_URI}/${REPOSITORY_NAME}:latest"
IMAGE_URI_TAGGED="${CONTAINER_REGISTRY_URI}/${REPOSITORY_NAME}:${IMAGE_TAG}"

# ECR ログイン
aws ecr get-login-password --region "${AWS_REGION}" \
  | docker login --username AWS --password-stdin "${CONTAINER_REGISTRY_URI}"

# Docker build & push（--no-cache は必要に応じて削除）
docker build -t "${IMAGE_URI_LATEST}" -t "${IMAGE_URI_TAGGED}" --platform linux/amd64 .
docker push "${IMAGE_URI_LATEST}"
docker push "${IMAGE_URI_TAGGED}"

# ECS サービス更新（latest を pull させる）
aws ecs update-service \
  --cluster "${CLUSTER_NAME}" \
  --service "${SERVICE_NAME}" \
  --force-new-deployment \
  --region "${AWS_REGION}"
