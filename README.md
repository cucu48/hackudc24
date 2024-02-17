# hackudc24

*ProgName* is a Dynamic Forms Webpage written with the Next.js framework presented to the DisaShop challenge at HackUDC 2024. We'll use and mention their resources, wich can be found [here](https://github.com/Disashop/hackudc24).


## Installation

The first step is to clone this repository by runing the following command in the terminal.

```bash 
git clone https://github.com/cucu48/hackudc24/
```

// git clone 

Next, for the sake of convenience, we used a mock-up tool like Postman. To install it, check the documentation [here](https://www.postman.com/downloads/). To set up a mock-up tool check [here](https://www.postman.com/downloads/).

To install Node.js (in Debian) run this comand: 

```bash 
sudo apt update
sudo apt install node
```

Then install Node Package Manager (NPM) by running (in Debian) this comand: 

```bash 
sudo apt install npm
```

Then we must install all the project dependecies. To do that, in a terminal, go to the repository folder and run the following command: 
```bash
npm install
``` 

Our sponsor provided us a self-hosted mockup API made with Postman. You can self-host your [here](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/setting-up-mock/) by importing our exported files, as well as enviroment preferences. 

Then, we are ready to run the web. To do that run the following command:
```bash 
npm run dev
```

## Functionality 
The application consists of a Next.js application that is listening for http web requests; when a request is made, it requests the forms API which tells the application which form needs to render. Our software is cappable of rendering any type of input, including Font Awesome icons, range color, inputs, The callback URL, as well as the method to transfer the input data can be customized. We've implemented a terms and conditions page so you can customize it, as well as being legal :D.

### Locla deplo

## License 

[GPL](https://choosealicense.com/licenses/gpl-3.0/) 