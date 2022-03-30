import React from 'react';
import './style.css'

function UserCard(props) {
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-6">
                    <div class="our-team">
                        <div class="pic">
                            <img src="img/erik.jpg" alt="" />
                        </div>
                        <div class="team-contenT">
                            <h3 class="title">Erik</h3>
                            <span class="post">Web Developer</span>
                        </div>
                        <ul class="social">
                            <li><a href="" class="fa fa-facebook"></a></li>
                            <li><a href="" class="fa fa-twitter" ></a></li>
                            <li><a href="" class="fa fa-google-plus "></a></li>
                            <li><a href="" class="fa fa-linkedin"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;