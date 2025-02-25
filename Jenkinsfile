pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = credentials('docker-hub-credentials') // Use the ID you created in Jenkins
        DOCKER_HUB_REPO = "kaveesha4890"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/kaveesha4890/Trackonomy.git'
            }
        }
        /*
        stage('Login to Docker Hub') {
            steps {
                sh "echo owdkmw1234 | docker login -u kaveesha4890 --password-stdin"
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t kaveesha4890/mern-frontend:latest ./frontend"
                sh "docker build -t kaveesha4890/mern-backend:latest ./backend"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    bat "docker push kaveesha4890/mern-frontend:latest"
                    bat "docker push kaveesha4890/mern-backend:latest"
                }
            }
        }*/

        stage('Build & Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.build("kaveesha4890/mern-frontend:latest", "./frontend").push()
                        docker.build("kaveesha4890/mern-backend:latest", "./backend").push()
                    }
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
