class Camara{
    constructor(){
        console.log('craete stream');
        this.localStream = null;

    }
    init(setStream){
        navigator.mediaDevices.getUserMedia({ video: true })//audio: true
        .then((currentStream) => {
            console.log('currentStream', currentStream);
            setStream(currentStream);
            this.localStream = currentStream;
        })
        .catch((error) => { this.localStream = 'error';console.log(`Error when open camera: ${error}`) });
    }
    getStream(){
        console.log('get stream');
        return this.localStream;
    }
    distroy(){
        console.log('distroy stream');
        this.localStream.getTracks.forEach(track => {
            track.stop();
        });
        this.localStream = null;
        return null;
    }

}
 
export default Camara;