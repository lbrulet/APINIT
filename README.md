# APINIT

APINIT is a setup of an apiREST using nodeJS with a mongo database and Docker.

There is a simple model of user implemented with these methods (GET/POST/PUT/DELETE), and an authentification service using LocalPassport and JWT.


## Installation

Use [curl](https://curl.haxx.se/) to install [Docker Compose](https://docs.docker.com/compose/install/#install-compose).

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
Then apply executable permissions to the binary:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

## Usage

To start the container
```bash
sudo docker-compose up
```
or use if you modified something into the nodeJS app
```bash
sudo docker-compose up --build
```

## API CALLS

[GET/POST/PUT/DELETE] localhost:8080/user

Mind always to use the "user" object into your request
```json
{
	"user": {
		"username": "sankamille",
		"password": "password123"
	}
}
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
