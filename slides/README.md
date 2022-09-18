# Slides

## Building on M1

```shell
$ docker buildx create --name amd64builder
$ docker buildx use amd64builder
$ docker buildx inspect --bootstrap
$ docker buildx build --tag kubernetes-traineeship-slides -o type=image --platform=linux/amd64,linux/arm64 .
```

## Pushing to ECR

```shell
$ docker tag kubernetes-traineeship-slides:latest 084518896710.dkr.ecr.eu-west-1.amazonaws.com/kubernetes-traineeship-slides:latest
$ docker push 084518896710.dkr.ecr.eu-west-1.amazonaws.com/kubernetes-traineeship-slides:latest
```

## All in One

```shell
$ docker buildx build --push --tag 084518896710.dkr.ecr.eu-west-1.amazonaws.com/kubernetes-traineeship-slides:amd64 --platform=linux/amd64 .
```