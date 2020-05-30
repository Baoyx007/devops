FROM node:lts AS builder
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . .
RUN yarn build


FROM node:lts-alpine
WORKDIR /app
VOLUME /data
ENV BLOG_LOCATION /data
ENV PORT 8070
COPY --from=builder /app ./
CMD ["yarn", "start:prod"]
