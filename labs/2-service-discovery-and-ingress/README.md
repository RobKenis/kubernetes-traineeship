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

### Extra

Add a `ReadinessProbe` to your Deployment. A LivenessProbe is used to determine when a Pod needs to
be restarted, a ReadinessProbe is used to determine when a Pod is ready to accept traffic.

## Creating an Ingress

The Service is reachable from within the cluster, but this is not very useful when you want
to expose an application on the internet. The Service we've created has type `ClusterIP`, this means
the IP address is known within the cluster. When you have a known set of servers, you can use
type `NodePort`, so the Service creates a port on your server on which you can reach your application.
When you have a more scalable set of servers, it's more commons to use type `LoadBalancer`, this will
create some sort of load balancer for your Service. When running in the cloud, this is typically
a managed load balancer.

We will not look into creating separate load balancers, instead we will use an `Ingress` to route
traffic from outside the cluster over [Traefik](https://traefik.io/) to our internal Services.

Creating an Ingress via the CLI is rather tedious, it's easier to apply a manifest like the one below.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  ingressClassName: traefik
  rules:
    - host: hello.traineeship-2022.axxes.cloud
      http:
        paths:
          - backend:
              service:
                name: my-service
                port:
                  number: 80
            path: /
            pathType: Prefix
```

## Viewing the Ingress

The Traefik dashboard is available at http://traefik.traineeship-2022.axxes.cloud/dashboard/#/.
There are 2 important parts to an Ingress route:

- HTTP Router: This config defines where Traefik will send your request. It can be based on host,
path, headers etc.
- HTTP Service: This is where Traefik will route your requests to. When an Ingress is created,
the backend service will show up under HTTP Services.

## Validating the Ingress

After the ingress is created, your application should be available at `http://<spec.rules.host>`. Only HTTP works
on this cluster, HTTPS is out of scope.