const psoe_landmarks = [
    'NOSE', 'LEFT_EYE_INNER', 'LEFT_EYE', 'LEFT_EYE_OUTER',
    'RIGHT_EYE_INNER', 'RIGHT_EYE', 'RIGHT_EYE_OUTER',
    'LEFT_EAR', 'RIGHT_EAR',
    'MOUTH_LEFT', 'MOUTH_RIGHT',

    'LEFT_SHOULDER', 'RIGHR_SHOULDER',
    'LEFT_ELBOW', 'RIGHR_ELBOW',
    'LEFT_WRIST', 'RIGHR_WRIST',
    'LEFT_PINKY', 'RIGHR_PINKY',
    'LEFT_INDEX', 'RIGHR_INDEX',
    'LEFT_THUMB', 'RIGHR_THUMB',
    'LEFT_HIP', 'RIGHR_HIP',
    'LEFT_KNEE', 'RIGHR_KNEE',
    'LEFT_ANKLE', 'RIGHR_ANKLE',
    'LEFT_HEEL', 'RIGHR_HEEL',
    'LEFT_FOOT_INDEX', 'RIGHR_FOOT_INDEX'
]

const mediaPipeLandmarks = i => {
    return psoe_landmarks.indexOf(i)
};

export default mediaPipeLandmarks;