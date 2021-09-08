# Learning Kubernetes
https://kubernetes.io/docs/reference/kubectl/cheatsheet/

## Setting up a cluster
Follow the instructions in the [installation guide](https://minikube.sigs.k8s.io/docs/start/) to install Minikube on 
your local machine. After installing, start the cluster using `minikube start`

## Deploying an application
```shell
kubectl create deployment --image nginx nginx
```

## Making this reproducible
```shell
kubectl get deployment nginx -o yaml
```
This outputs a lot of yaml that is used to describe resources on Kubernetes.
```shell
kubectl apply -f deployment.yaml
```

## Exposing the application
```shell
kubectl expose deployment nginx --port=80 --type=NodePort
```
And access it from your local machine
```shell
minikube service --url nginx
```


# Deploying on AWS EKS

# TODO
- [x] EKS cluster
- [x] autoscaler
- [x] external dns
- [ ] ingress controller
- [x] wildcard certificate
