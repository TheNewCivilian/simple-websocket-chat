<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo, twitter_handle, email
-->





<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo">
    <img src="img/simple_chat.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">SIMPLE WEBSOCKET CHAT</h3>

  <p align="center">
    A very simple javascript websocket based chat system to support customer support agents to fast react on customer requests.
    <!-- <br />
    <a href="https://github.com/github_username/repo"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="https://chat.xatellite.io/">View Client Demo</a>
    ·
    <a href="https://chat.xatellite.io/admin">View Admin Demo</a>
    ·
    <a href="https://github.com/TheNewCivilian/simple-websocket-chat/issues">Report Bug</a>
    ·
    <a href="https://github.com/TheNewCivilian/simple-websocket-chat/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

The idea of Simple Websocket Chat is too give developers a fast and simple starting point for a customer support chat implementation.
It aims to give insides into a very simple websocket implementation.


[![A chat window of a client][product-screenshot1]]()
A chat window of a client

[![A chat window of an admin][product-screenshot2]]()
A chat window of an admin


### Built With

* [Vue.js](https://vuejs.org/)
* [Node.js](https://nodejs.org/en/)
* [Webpack](https://webpack.js.org/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.


### Installation
 
1. Clone the repo
```sh
git clone https://github.com/TheNewCivilian/simple-websocket-chat
```

2. Test run client by running
```sh
./startServer.sh
```
```sh
./startClient.sh
```

3. Run Build Script
```sh
./build.sh
```

4. Serve Build via Webserver
You will find a bundled nodejs app in `/backend/build`. This represents the server. It can be run with node bundle.js and served via a reverse proxy.
In `frontend/simplechat/dist` you will find static web content which represents the client. This needs to be served by a standard webserver.


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/TheNewCivilian/simple-websocket-chat/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact & Contributors

Project Link: [https://github.com/TheNewCivilian/simple-websocket-chat](https://github.com/TheNewCivilian/simple-websocket-chat)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/TheNewCivilian/simple-websocket-chat.svg?style=flat-square
[contributors-url]: https://github.com/TheNewCivilian/simple-websocket-chat/contributors
[forks-shield]: https://img.shields.io/github/forks/TheNewCivilian/simple-websocket-chat.svg?style=flat-square
[forks-url]: https://github.com/TheNewCivilian/simple-websocket-chat/network/members
[stars-shield]: https://img.shields.io/github/stars/TheNewCivilian/simple-websocket-chat.svg?style=flat-square
[stars-url]: https://github.com/TheNewCivilian/simple-websocket-chat/stargazers
[issues-shield]: https://img.shields.io/github/issues/TheNewCivilian/simple-websocket-chat.svg?style=flat-square
[issues-url]: https://github.com/TheNewCivilian/simple-websocket-chat/issues
[product-screenshot1]: img/Screenshot1.png
[product-screenshot2]: img/Screenshot2.png