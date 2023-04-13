# SyncAlong-FrontEnd
React Hooks with Redux using Material UI libary for ui-design.

## Demo Videos
- [SyncAlong overView](https://www.youtube.com/watch?v=lzavS42n3_8) 
- [SyncAlong CRUD system](https://www.youtube.com/watch?v=e4UP5bghs6c) 

<p align="center">
<video width="320" height="240" controls>
  <source src="https://www.youtube.com/embed/e4UP5bghs6" type="video/mp4">
</video>
</p>


## Links

- [SyncAlong-client](https://sync-along.netlify.app/home) 
- [SyncAlong-server-github](https://github.com/Aymanw1998/SyncAlong)
- [SyncAlong-API-Postman-Docs](https://documenter.getpostman.com/view/9310231/UVJkBYim/)

## Peers Connection Logic and Implementations
To connect two users over WebRTC, we exchange information to allow browsers to talk to each other. This process is called signaling and it is facilitated by using NodeJS and socket server chained to the express .0 engine to provide the plumbing. Other than signaling, no data has to be sent through a server. When a connection is successfully established and authentication and authorization are complete, stream data exchanged between peers is directed to a React component for rendering.

## Technologies used:
- [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) - facilitates real time data communication between two peers.
- [simple-peer](https://www.npmjs.com/package/simple-peer)- Simple-peer library acts as a wrapper over WebRTC and makes it simpler.
- [socket-io](https://socket.io/) as a wrapper over web sockets.
- [MediaPipe](https://google.github.io/mediapipe/) Google Ai Human pose estimation model.

## OverAll system architecture
![חדש22](https://user-images.githubusercontent.com/48565585/178983484-adec8e87-e11f-44e1-9f76-14e8f6280496.PNG)


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


## Our Web System
![234](https://user-images.githubusercontent.com/48565585/178980116-6fcd23e8-13ad-45bb-bb8b-4897aba6de5f.PNG)
![עמוד פגישה2](https://user-images.githubusercontent.com/48565585/178980251-986e52d6-fc75-4b84-a141-06574c15e64b.PNG)
![‏‏לכידה](https://user-images.githubusercontent.com/48565585/178980333-4ad705a4-f880-43f0-be28-69964d81e1d6.PNG)

