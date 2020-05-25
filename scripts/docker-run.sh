#! bash
docker build -t devops .
docker run -d -v /webstatics/blog:/data --name devops -p 3000:3000 -d devops
