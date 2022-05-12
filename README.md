# SyncAlong-FrontEnd
React Hooks with Redux using Material UI libary for ui-design.
1. WebRTC audio&video meetings app with user authentication using ReactJS.
2. 

## Links

- [SyncAlong-client](https://sync-along-app-2022.netlify.app)
- [SyncAlong-API-Postman-Docs](https://documenter.getpostman.com/view/9310231/UVJkBYim/)

## Peers Connection Logic and Implementations
To connect two users over WebRTC, we exchange information to allow browsers to talk to each other. This process is called signaling and it is facilitated by using NodeJS and socket server chained to the express .0 engine to provide the plumbing. Other than signaling, no data has to be sent through a server. When a connection is successfully established and authentication and authorization are complete, stream data exchanged between peers is directed to a React component for rendering.

## Technologies used:
- [WebRTC](https://sync-along-app-2022.netlify.app) - facilitates real time data communication between two peers.
- [simple-peer](https://sync-along-app-2022.netlify.app)- Simple-peer library acts as a wrapper over WebRTC and makes it simpler.
- [socket-io](https://sync-along-app-2022.netlify.app) as a wrapper over web sockets.

## Features

The app has the following features:

- [x] Video chat room with real-time audio and video
- [x] Real-time motion synchronization analysis and synchronization index view
- [x] Voice recognition while meeting with command control:
- Start 
- Stop 
- Continue 
- Move on to the next 
- Move to the previous
- [x] CRUD Meeting : Name, Participant, Time and date
- [x] CRUD Profile user of Trainers and Trainees type 
- [x] CRUD User : Authentication and validation
- [x] Enable/disable camera

