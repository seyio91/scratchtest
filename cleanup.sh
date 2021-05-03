#!/bin/bash
kubectl delete secret scratch-secret
kubectl delete configmap scratch-configmap
kubectl delete deploy scratch-database
kubectl delete service scratch-db-service
kubectl delete job scratch-deployment-job
helm delete scratch
