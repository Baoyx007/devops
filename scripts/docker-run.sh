#! bash
docker build -t devops .
docker run --rm -d -v /webstatics/blog:/data --name devops -p 8070:8070 -d devops
