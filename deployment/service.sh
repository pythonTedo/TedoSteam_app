kubectl apply -f feed-service.yaml
kubectl apply -f user-service.yaml
kubectl apply -f frontend-service.yaml

kubectl apply -f reverseproxy-service.yaml