# SCRATCH TEST

## URL

- Swagger Page: /api-docs to view swagger page
- Get all Users: GET /api/v1/users
- Create a User: POST /api/v1/users { name: somename }
- Get a User: GET /api/v1/users/:id

Configuration File: `helm_manifests/value.yaml`

### Running the Application.

1.  Building the Image Image

        cd api && docker build -t <yourimagename> .

2.  Pushing the Image to a Registry

        docker push <imagename>

3.  Running the Application Locally using Docker Compose

        cd api
        docker-compose up -d

        # access application locally on localhost:3000

4.  Running the Helm Charts.

- Option1: Using the commandline to pass in values

        helm install scratch-test ./helm_manifests \
        --set backend.image.repository=<yourimagename> \
        --set backend.image.tag=latest \
        --set backend.image.repository=postgres

  If using a Private registry, Remember to create a image pullsecret and set image pull secrets

  --set imagePullSecrets[0].name=<pullsecretname>

  Secrets Management- Due to time restriction. This was defined in the Values File. This can be removed and passed in on the command line

  --set secretMap.db_username=<dbuser> \
   --set secretMap.db_password=<dbpassword>
  <br>
  <br>

  **Final helm command:**

        helm install scratch-test ./helm_manifests \
            --set backend.image.repository=<yourimagename> \
            --set backend.image.tag=latest \
            --set backend.image.repository=postgres \
            --set secretMap.db_username=<dbuser> \
            --set secretMap.db_password=<dbpassword>

- Option 2. Create a YAML values file and Pass in the Values. Useful for version control and config management
  can use a copy of the default values.yml

      cp helm_manifests/values.yaml myval.yaml

      note to remove secrets and pass in on the command line
      helm install scratch-test -f myval.yaml ./helm_manifests \
          --set secretMap.db_username=<dbuser> \
          --set secretMap.db_password=<dbpassword>

## Accessing the service:

        kubectl port-forward svc/scratch-service 8080:80

### Security:

- The Docker file is not run as root user
- Security Contexts are used in manifest to enforce non-privilege escalation

### Data Loading Strategy.

- Place CSV File with name data.csv in /helm_manifests root dir
- The Helm manifest loads the File into the configmap, which is used in the Kubernetes Job that populates the database.
- The Helm template uses Hooks to ensure Populating the Database only Happens once.
- This is done to avoid the DB being populated everytime the application is restarted
