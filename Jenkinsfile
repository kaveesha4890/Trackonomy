pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = credentials('docker-hub-credentials') // Use the ID you created in Jenkins
        DOCKER_HUB_REPO = "kaveesha4890"
    }

    stages {
        stage('Checkout Code') {
            steps {
                retry(3){
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
        
        stage('Login to Docker Hub') {
            steps {
                bat "echo owdkmw1234 | docker login -u kaveesha4890 --password-stdin"
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

        

        stage('Deploy') {
            steps {
                bat "docker-compose down"
                bat "docker-compose up -d"
            }
        }
    }
}
