# pick-up-games
A pick-up soccer game manager to help you organize your own games with your friends.

## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Installing

A step by step series of examples that tell you how to get a development env running


If you're on Linux

```
# Install anaconda following the instructions in the following link
https://conda.io/docs/user-guide/install/linux.html

# Install python 3.6
conda create -n <your_virtual_env> python=3.6 anaconda

# Enable the virtual env
source activate

# Clone and open the repo with
git clone https://github.com/brenopoggiali/pick-up-games
cd pick-up-games

# Setting variables up
export FLASK_APP=backend
export FLASK_ENV=development
```

If you're on a Mac

```
# Install anaconda following the instructions in the following link
https://conda.io/docs/user-guide/install/macos.html

# Install python 3.6
conda create -n <your_virtual_env> python=3.6 anaconda

# Enable the virtual env
source activate

# Clone and open the repo with
git clone https://github.com/brenopoggiali/pick-up-games
cd pick-up-games

# Setting variables up
export FLASK_APP=backend
export FLASK_ENV=development
```

If you're on Windows

```
# You shouldn't be ;)

# To make it simple:
https://www.wikihow.com/Move-from-Windows-to-Linux

```


## Running

```
flask run
```
