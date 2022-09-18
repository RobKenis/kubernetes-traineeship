# Getting started

To interact with a Kubernetes cluster, we will use `kubectl`. Instructions on how to install 
*kubectl* can be found [here](https://kubernetes.io/docs/tasks/tools/). It has instructions
for both Linux and Windows.

## Verifying kubectl

To verify that the CLI has installed properly, runt the following command. It will return
the version of the client. When removing the `--client`, it will also try to return the version
of the server, which will fail because we have not configured a server yet.

```shell
$ kubectl version --client
```

## Retrieving credentials

To get access to a Kubernetes cluster, you must have a valid *kubeconfig* file. This file contains
information about the cluster endpoint and user you will authenticate with.

To generate a kubeconfig for *AWS EKS*, use the following command. If you have not yet installed
the `awscli`, find the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

```shell
$ aws eks update-kubeconfig --region eu-west-1 --name kubernetes-traineeship
```

## Validating the credentials

Run a *kubectl* command to verify that you can connect to the cluster. Following command
shows all pods on the cluster.

```shell
# Get the version of the cluster
$ kubectl version
# List all pods running on the cluster
$ kubectl get pods --all-namespaces
```

### Setting up your namespace

To avoid conflicts, we will run our applications in our own namespace.

Create your namespace using

```shell
$ kubectl create namespace <your-name>
```

To use the namespace later on, pass the `--namespace <your-name>` option to all `kubectl` commands.