# Monitoring and Debugging

## Centralizing logs with Loki

When you have a centralized way of logging, you can automatically setup log collection for
all new Pods. For example, Pods log to STDOUT and a Promtail instance is listening for all new
logs by Pods on STDOUT. This centralizes all logs for the cluster.

Find your logs on http://grafana.traineeship-2022.axxes.cloud/explore

## Centralizing metrics with Prometheus

The same goes for metrics. A Prometheus server is running on the cluster and can scrape the
Services. When a services is annotated with following config, Prometheus can automatically scrape
your application metrics, so you can view them in Grafana.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/path: "/metrics/prometheus"
spec: ...
```