import React from 'react';
import "./style.css";


function HeaderTrainee({ trainee }) {
    return (
        <div class="page-heading">
            <div class="media clearfix">
                <div class="media-left pr30">
                    <a href="#">
                        <img class="media-object mw150" src={trainee.user.avatar} alt="..." />
                    </a>
                </div>
                <div class="media-body va-m">
                    <h2 class="media-heading">{trainee.user.user}
                        <small> - Profile</small>
                    </h2>
                    <p class="lead">{trainee.user.email}</p>
                </div>
            </div>
        </div>
    );
}

export default HeaderTrainee;