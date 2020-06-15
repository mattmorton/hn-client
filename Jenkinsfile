pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        echo 'Starting Build!'
        sh 'npm install'
        sh 'ng build'
      }
    }

  }
}