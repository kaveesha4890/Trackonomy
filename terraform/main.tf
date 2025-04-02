terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "kubernetes" {
  config_path = "C:\\Users\\ccs\\.kube\\config" 
}

# Create a namespace
resource "kubernetes_namespace" "mern_namespace" {
  metadata {
    name = "mern-app"
  }
}

# Deploy Frontend
resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "mern-frontend"
    namespace = kubernetes_namespace.mern_namespace.metadata[0].name
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "mern-frontend"
      }
    }
    template {
      metadata {
        labels = {
          app = "mern-frontend"
        }
      }
      spec {
        container {
          image = "kaveesha4890/mern-frontend:latest"
          name  = "mern-frontend"
          port {
            container_port = 3000
          }
          env {
            name = "REACT_APP_API_URL"
            value = "http://mern-backend-service:5000"
          }
        }
      }
    }
  }
}

# Frontend Service
resource "kubernetes_service" "frontend_service" {
  metadata {
    name      = "mern-frontend-service"
    namespace = kubernetes_namespace.mern_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = "mern-frontend"
    }

    port {
      protocol    = "TCP"
      port        = 3000
      target_port = 3000
      node_port   = 32000
    }

    type = "NodePort"  
  }
}

# Deploy Backend
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "mern-backend"
    namespace = kubernetes_namespace.mern_namespace.metadata[0].name
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "mern-backend"
      }
    }
    template {
      metadata {
        labels = {
          app = "mern-backend"
        }
      }
      spec {
        container {
          image = "kaveesha4890/mern-backend:latest"
          name  = "mern-backend"
          port {
            container_port = 5000
          }
          env {
            name = "MONGO_URI"
            value = "mongodb+srv://kaveeshwijeguru:owdkmw1234@trackonomy.un8lm.mongodb.net/Trackonomy?retryWrites=true&w=majority&appName=trackonomy"
          }
        }
      }
    }
  }
}

# Backend Service
resource "kubernetes_service" "backend_service" {
  metadata {
    name      = "mern-backend-service"
    namespace = kubernetes_namespace.mern_namespace.metadata[0].name
  }

  spec {
    selector = {
      app = "mern-backend"
    }

    port {
      protocol    = "TCP"
      port        = 5000
      target_port = 5000
      node_port   = 32001
    }

    type = "NodePort"  
  }
}
