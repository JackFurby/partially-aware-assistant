# partially-aware-assistant
A personal AI assistant with memory

## AI Assistance Disclosure

This project is developed with AI-powered coding assistants used as supplementary tools to enhance productivity. The maintainer designs, architects, and writes the code, using AI assistants (such as Claude and GitHub Copilot) for suggestions to code snippets and functions. All AI-generated suggestions are reviewed, tested, and modified as needed before being committed. The maintainer maintains full creative and technical control over the codebase and takes complete responsibility for all code.

Note: The initial RAG feature implementation was generated with more extensive AI assistance and subsequently modified by the maintainer in order to explore AI code generation capabilities. This code still underwent review and testing before being committed.

## Setup instructions

```sh
conda create -n partially-aware-assistant python=3.11
conda activate partially-aware-assistant
pip install -r requirements.txt
npm install tailwindcss @tailwindcss/cli
```

Run tailwind watch in headless
```sh
tmux new -s tailwind
npx @tailwindcss/cli -i ./partially_aware_app/static/src/main.css -o ./partially_aware_app/static/src/output.css --watch
```

`Ctrl+b` then `d` to exit tmux
`tmux attach -t tailwind` to reattach   

```sh
flask db init
flask db migrate -m "message here"
flask db upgrade
```

```sh
export FLASK_APP=partially_aware.py
export FLASK_ENV=development
export FLASK_DEBUG=1
flask run
```

```sh
flask seed
```


## Deploying the application

It is assumed you have a server setup.

connect to server:

1. Update server and install software

  ```sh
  suso apt-get update
  sudo apt-get upgrade
  sudo apt install gunicorn libsm6 libxext6 libgl1 ffmpeg libxrender-dev python3-pymysql python3-pip
  ```

2. Clone repository to your server

  ```sh
  git clone https://github.com/JackFurby/partially-aware-assistant.git
  cd partially-aware-assistant
  ```

3. Install pip packages

  ```sh
  pip3 install -r requirements.txt
  pip3 install pymysql
  ```
4. Set environmental variables

  ```sh
  nano ~/.bashrc
  ```

  add `export DATABASE_URL='mysql+pymysql://<USER_NAME>:<PASSWORD>@<DB_URL>:3306/<DB_NAME>'` to the end of the file.

  ```sh
  source ~/.bash_profile
  ```

6. Start app

  *Note: this should be started such that it will run when you exit the terminal e.g. with tmux*

  gunicorn -b 0.0.0.0:8080 partially-aware:app
