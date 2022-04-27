class Camera{
    constructor(){
        console.log('craete stream');
        this.localStream = null;

    }
    init = async() => {
        await navigator.mediaDevices.getUserMedia({ video: true })//audio: true
        .then((stream) => {
            this.localStream = new MediaStream(stream);
        })
        .catch((error) => { 
            this.localStream = 'error';
            console.log(`Error when open camera: ${error}`) 
        });
    }
    getStream = () => {
        console.log('get stream');
        return this.localStream;
    }
    distroy = async() => {
        console.log('distroy stream');
        if(this.localStream){
            await this.localStream.getTracks().forEach(async(track) => {
                await track.stop();
            });
        }
        this.localStream = null;
    }

}
 
export default Camera;