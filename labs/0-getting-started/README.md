# Getting started

## Verifying kubectl

```shell
$ kubectl version
```

## Retrieving credentials

To get access to a Kubernetes cluster, you must have a valid *kubeconfig* file. This file contains
information about the cluster endpoint and user you will authenticate with.

To generate a kubeconfig for *AWS EKS*, use the following command

```shell
$ aws eks update-kubeconfig --region eu-west-1 --name kubernetes-traineeship
```

## Validating the credentials

Run a *kubectl* command to verify that you can connect to the cluster. Following command
shows all pods on the cluster.

```shell
$ kubectl get pods --all-namespaces
```