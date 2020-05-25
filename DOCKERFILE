FROM node:lts AS builder
WORKDIR /app
COPY ./package.json ./
RUN yarn
COPY . .
RUN yarn build


FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["yarn", "start:prod"]
