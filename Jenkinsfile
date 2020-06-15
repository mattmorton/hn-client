pipeline {
  agent any
  stages {
    stage('configure') {
      steps {
        nodejs 'node-angular'
      }
    }
        stage('install') {
      steps {
        sh 'npm install'
      }
    }

  }
}