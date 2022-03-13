# AzubiViet Online Portal
## An Abiverse for trainees in Germany

[![GitHub latest commit](https://badgen.net/github/last-commit/lehoanghuythanh96/AzubiViet-Client)](https://badgen.net/github/last-commit/lehoanghuythanh96/AzubiViet-Client)

<a href="https://ibb.co/hVhyv8j"><img src="https://i.ibb.co/CQNzF0Z/Screenshot-2022-03-13-at-19-37-11.png" alt="Screenshot-2022-03-13-at-19-37-11" border="0"></a>
<a href="https://ibb.co/zx5YrNn"><img src="https://i.ibb.co/GpJL0Fx/Screenshot-2022-03-13-at-14-58-52.png" alt="Screenshot-2022-03-13-at-14-58-52" border="0"></a>
<a href="https://ibb.co/V3DFdQs"><img src="https://i.ibb.co/cxtWPCj/Screenshot-2022-03-13-at-14-30-37.png" alt="Screenshot-2022-03-13-at-14-30-37" border="0"></a>

AzubiViet Webapp is a place for all trainees making an Ausbildung in Germany to exchange knowledge. Demo: https://play.azubiviet.com/

- Angular
- NestJS
- ✨PostgreSQL✨

## Features

- Get the knowledge database in a handfully, comfortable way with NestJS PostgreSQL
- Talk together in a server chat room
- Answer question and being checked by 5 random anonymous people (NodeJS Socket IO)
- Create Q&A Question with photos
- Enjoy learning and join in competitions!

## Tech

AzubiViet Webapp uses a number of open source projects to work properly:

- [Angular V12] - HTML enhanced for web apps!
- [SwiperJS] - The Most Modern Mobile Touch Slider
- [PostgreSQL] - The world's most advanced open source database
- [NestJS] - great UI boilerplate for modern web apps
- [node.js Typescript] - evented I/O for the backend
- [Socket IO] - Realtime application framework (Node.JS server)
- [Bcrypt] - Top safe password-hashing function
- [JSON Web Token] - Secure communication tool between Front End and Back End
- [GraphQL] - strong type system to define the capabilities of an API.
- [Nodemailer] - a module for Node.js applications to allow easy as cake email sending
- [Rxjs Observable] - A tool for thinking in stream
- [Angular Theming] - Flexible solution for domain driven design
- [Bootstrap 5] - the world’s most popular front-end open source toolkit
- [Font Awesome 6] - Icon library 
- [Angular Material UI] - Corporate Angular Design
- [NestJS Passport JWT] - NestJS authentication interceptor
- [NestJS Cache Manager] - For better database query process
- [Joi Verification] - Strict input solution for back-end
- [TypeORM] - Create connection between GraphQL and PostgreSQL
- [Ngx Quill] - A maintainable Rich text editor
- [Ng2 Chart] - Easy combination for Angular and ChartJS
- [NgRX Store - Effects] - For a faster Angular One-Page-Webapp
- [Gsap Green Sock Motions] - Smooth Object Movement
- [Angular-Animation] - Easy-to-go animation set for Angular
- [Angularx Social Login] - A solution for Google and Facebook login

This project is not for public use.

## Installation

AzubiViet Webapp requires Angular V12 to run

Clone the Socket Server Repository and run
Clone the API Server Repository and run
Create .env file according to sample

Add the src/environments/environment.ts and environment.prod.ts according to the samples with your private information
Install the dependencies and devDependencies and start the server.

```sh
cd ~.../AzubiViet-Client
npm i
ng serve
```

## Plugins

AzubiViet WebApp doesn't use any plugin.

## Problems & Solutions

1. ⚠️ From the beginning, I used MySQL and found it too slow with long query clause -> ✅ Use Typeorm with PostgreSQL, query by JSON Object.
2. ⚠️ Too much query to the database, slow performance -> ✅ Apply NestJS Cache Manager
3. ⚠️ Afraid of Hijacking and XSS -> ✅ Use Validator npm, Sharp and MMMagic, WebpConverter
4. ⚠️ Need a real time communication between users -> ✅ Apply Socket IO
5. ⚠️ Thinking about moving page later on -> ✅ Separate CDN folder for media
6. ⚠️ Need a special corporate design -> ✅ Glassmorphic Design with  Bootstrap and Angular Material
8. ⚠️ Got too many end point -> ✅ Apply GraphQL
9. ⚠️ Need to communicate with 2 separate server -> ✅ Apply JSON  Web Token
10. ⚠️ Want a strict type check for NodeJS -> ✅ Build NodeJS with Typescript
11. ⚠️ Avoid spam -> ✅ Google Captcha.
12. ⚠️ Communication between different components in Angular without refetch API -> ✅ NgRX with Observable
13. ⚠️ Need an automatic bearer authorization -> ✅ Apply Angular interceptor and NestJS JWT Strategy (for both RestAPI and GraphQL)
14. ⚠️ Need to check RESTful API body input and throw exact error message -> ✅ Joi Verification NPM
15. ⚠️ Look for a cleaner HTML coding method -> ✅ Bootstrap 5

## License

UNLICENSED
