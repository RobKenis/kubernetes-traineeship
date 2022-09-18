# Kubernetes Infrastrcuture

## Setting up the cluster

Deploy [the CloudFormation template for EKS](cloudformation/eks.yaml).

## Deploying ArgoCD

```shell
$ kubectl create namespace argocd
$ kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

```shell
$ kubectl apply -f infrastructure/argocd.yaml
```