# Deployment

## Creating a deployment

To start a production-ready application in Kubernetes, one of the options is the use of a 
`Deployment`. A deployment holds the configuration for the docker image, environment variables,
port mapping etc.

Create a test deployment using

```shell
$ kubectl create deployment test -n rob --image nginx
```

## Viewing your deployment

### The Deployment

To view the configuration of the deployment, retrieve it using following command. The response
also contains the events and status of the Deployment, these can be useful for debugging.

```shell
$ kubectl describe deployment test -n rob
```

### The ReplicaSet

Behind the scenes, a `Deployment` creates a `ReplicaSet`. A ReplicaSet is responsible for launching
containers with a specific configuration defined in the `Deployment`. When you update the Deployment,
a new ReplicaSet will be created to replace the old one.

Following command returns all ReplicaSets in a namespace. Describe your most recent one. 

```shell
$ kubectl get replicasets -n rob
```

### The Pods

After a ReplicaSet has been created, the actual Pods will be launched. Depending on how many replicas
are defined in the ReplicaSet, more or less Pods will be created.

```shell
# List all pods in your namespace
$ kubectl get pods -n rob
# Describe the most recent pod
$ kubectl describe pod test-sdfsdf -n rob
```

### Viewing the logs

When an application logs to stdout and stderr, the output can be viewed using `kubectl`.

Following command will tail the logs of a single pod from a Deployment.

```shell
$ kubectl log test-sdfsdf -n rob -f
```

### Getting local access

To get local access to an application, we can setup port forwarding. This is useful in multiple
ways, for example to attach a debugger or connect to your application locally.

Following command will setup port forwarding from a remote pod on port 80 to your local machine
on port 8080.

```shell
$ kubectl port-forward test-sdfsdf -n rob 8080:80
```

You can now view the application in your browser on http://localhost:8080/

### Scaling your Deployment

Using a Deployment instead of directly creating a Pod allows for scaling to multiple pods with
the same configuration. This is used when running high available application or to handle more
requests than a single instance can handle.

```shell
$ kubectl scale deployment test -n rob --replicas 10
```

This will scale the Deployment to 10 replicas. You will see that new pods are stuck in pending
for a while. Describe them to see the reason in recent events.

Spoiler alert: There aren't enough nodes to start all pods. The cluster autoscaler will now
start more nodes. After they have become available, the new pods will start on the new nodes.

## Health checks

Kubernetes has a built-in way to verify that a Pod is healthy and ready to accept requests.
This is doing through [Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/).

Configure a LivenessProbe so Kubernetes knows when to restart the Pod when it is no longer healthy.

```yaml
    livenessProbe:
      httpGet:
        path: /actuator/health
        port: 8080
      initialDelaySeconds: 3
      periodSeconds: 3
```
