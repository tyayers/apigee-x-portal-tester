# This script builds the container either locally or with cloud build, and then pushes the updated version to cloud run.

# Build and deploy client to cloud run (run script with your GCP Project Id as parameter)
gcloud config set project $1

# gcloud builds submit --tag eu.gcr.io/$1/apigee-portal
docker build -t local/apigee-x-portal-tester .
docker tag local/apigee-x-portal-tester eu.gcr.io/$1/apigee-x-portal-tester
docker push eu.gcr.io/$1/apigee-x-portal-tester

gcloud run deploy apigee-x-portal-tester --image eu.gcr.io/$1/apigee-x-portal-tester --platform managed --project $1 \
  --region europe-west1 --service-account tyservice@bruno-1407a.iam.gserviceaccount.com \
  --update-env-vars APIGEE_ORG=$1 --allow-unauthenticated
