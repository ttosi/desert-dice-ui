FROM node:18-alpine
WORKDIR /app
RUN mkdir -p /app/node_modules && chown -R 1000:1000 /app/node_modules
COPY . .
RUN npm install && npm run build
CMD cp -r dist/* /output/