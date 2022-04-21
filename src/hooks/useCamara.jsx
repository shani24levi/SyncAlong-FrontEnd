import React from 'react';

function useCamara({camara}) {
    useEffect(() => {
        if(camara){
        navigator.mediaDevices.getUserMedia({ video: true })//audio: true
        .then((currentStream) => {
            setStream(currentStream);
        })
        .catch((error) => { console.log(`Error when open camera: ${error}`) });
    }
    }, [camara])
    

    return (
        <div>
            
        </div>
    );
}

export default useCamara;