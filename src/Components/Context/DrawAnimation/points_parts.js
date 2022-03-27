{/*  using by filter func
    Based on MediaPipe's library: 
    https://google.github.io/mediapipe/images/mobile/pose_tracking_full_body_landmarks.png
*/}


const upper_part = {
    right_hand: [11, 13, 15],
    left_hand: [12, 14, 16]
}

const bottom_part = {
    right_leg: [23, 25, 27],
    left_leg: [24, 26, 28]
}

//add activitys as gos.....
const upper_activities = [
    'hands-x', 'hands-y', 'swim-hands', 'swing-hands',
    "left-hand-up", "right-hand-up", 'crazy',

    //all of the body - must be in both upper&lower
    'poshup', 'baly-run', 'baly-legs',
    'back-down', 'toch-flor',
    'claping', 'all-up-1',
    'gamp', 'legs-gumping', 'open-close',
    'kicks', 'pray', 'right-all', 'up-dwon-both',
    'gump-sides', 'zomba'
]
const bottom_activities = [
    'left-leg-up', 'right-leg-up', 'legs-both-up',
    '90leging-right', '90leging-left',

    //all of the body - must be in both upper&lower
    'poshup', 'baly-run', 'baly-legs',
    'back-down', 'toch-flor',
    'claping', 'all-up-1',
    'gamp', 'legs-gumping', 'open-close',
    'kicks', 'pray', 'right-all', 'up-dwon-both',
    'gump-sides', 'zomba'
]

const center_part = [11, 12, 23, 24];
const joints_keys = [13, 14, 25, 26]; //13:right-hand, 14:left-hand, 25:right-leg, 26:left-leg

module.exports = {
    upper_part, bottom_part,
    upper_activities, bottom_activities,
    center_part, joints_keys
};
