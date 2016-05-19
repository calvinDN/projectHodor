FROM frolvlad/alpine-oraclejdk8:slim

ADD build/libs/hodor-0.1.0.jar /opt/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/opt/app.jar"]