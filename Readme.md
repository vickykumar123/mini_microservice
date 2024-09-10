## Installation Steps

### 1. Build Docker Images

Navigate to each service directory and run the following command to build the Docker image:

```bash
docker build -t <yourname>/<service> .
```

Replace <yourname> with your Docker Hub username and <service> with the respective service name. 2. Update Kubernetes Deployment Files
After building the Docker images, update the Kubernetes deployment files in the infra/k8s directory.

For example, in the posts-depl.yml file, change the image name from:

```bash
image: vivvk/<service>
to:
image: <yourname>/<service>
```

3. Apply Kubernetes Configurations
   Navigate to the infra/k8s directory and run the following command to generate Kubernetes services and deployments:

`kubectl apply -f .`

4. Update /etc/hosts File
   You need to update the /etc/hosts file to map 127.0.0.1 to posts.com:
   127.0.0.1 posts.com

5. Access the Application
   Now you can access the application by navigating to:
   http://posts.com
