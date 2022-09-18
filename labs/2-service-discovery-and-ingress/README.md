# Service Discovery and Ingress

We have now created multiple pods running an application. The application is running on the cluster,
but is not accessible from the outside.
The pod has been assigned an IP address withing the cluster. It is possible to reach your
application on that IP from within the cluster. When your pods are replaced, you will get assigned
new IP addresses. This doesn't seem very scalable. We'll solve that issue first with some
service discovery.

## Creating a Service

A service has 3 important parts:

- The name in the metadata. This name is used to identify the Service
- The `spec.selector` object. This object contains labels that are set on the pods you want to discover.
Describe your pod to find out which labels are set. Normally each pod should have a `name=test` label, which
you can use in the service.
- The `spec.ports` object. Each entry in this list is a port mapping, with port being the port which will
be exposed by the service and `targetPort` being the port on which the application is running inside the Pod.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

Create a service using 

```shell
$ kubectl apply -f service.yaml
```

## Validating the Service

You can start an interactive Pod inside the cluster. This means that a Pod is created and you will
have an interactive shell within the pod. When you exit the shell, the Pod is terminated.

```shell
$ kubectl run my-test-container --rm -i --tty --image ubuntu -- bash
```

Test your service with `curl http://my-service/`. It should return a response from your application.

## Creating an Ingress

## Viewing the Ingress

## Validating the Ingress