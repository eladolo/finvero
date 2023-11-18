FROM base-image

COPY ./BE ./BE

WORKDIR /BE

RUN npm install