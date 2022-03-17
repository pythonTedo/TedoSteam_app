kubectl apply -f feed-deployment.yaml
kubectl apply -f user-deployment.yaml
kubectl apply -f frontend-deployment.yaml

kubectl apply -f reverseproxy-deployment.yaml