pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = credentials('docker-hub-credentials') 
        DOCKER_HUB_REPO = "kaveesha4890"
        KUBECONFIG = credentials('kubeconfig')
    }

    stages {
        stage('Checkout Code') {
            steps {
                retry(3) {  // Ensure retrying Git clone in case of failure
                    git branch: 'main', url: 'https://github.com/kaveesha4890/Trackonomy.git'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat "docker build -t kaveesha4890/mern-frontend:latest ./frontend"
                bat "docker build -t kaveesha4890/mern-backend:latest ./backend"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    bat "docker push kaveesha4890/mern-frontend:latest"
                    bat "docker push kaveesha4890/mern-backend:latest"
                }
            }
        }

        stage('Terraform Initialize and Deploy') {
            steps {
                bat '''
                cd terraform
                terraform init
                terraform apply -auto-approve
                '''
            }
        }
    }
}
