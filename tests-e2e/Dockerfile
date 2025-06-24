FROM cypress/included:12.17.4

WORKDIR /e2e

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npx", "cypress", "run"]
