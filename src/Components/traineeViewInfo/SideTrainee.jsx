import React from 'react';
import "./style.css";

function SideTrainee(props) {
    return (
        <div class="col-md-4">
            <div class="panel">
                <div class="panel-heading">
                    <span class="panel-icon">
                        <i class="fa fa-star"></i>
                    </span>
                    <span class="panel-title"> User Popularity</span>
                </div>
                <div class="panel-body pn">
                    <table class="table mbn tc-icon-1 tc-med-2 tc-bold-last">
                        <thead>
                            <tr class="hidden">
                                <th class="mw30">#</th>
                                <th>First Name</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span class="fa fa-desktop text-warning"></span>
                                </td>
                                <td>Television</td>
                                <td>
                                    <i class="fa fa-caret-up text-info pr10"></i>$855,913</td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="fa fa-microphone text-primary"></span>
                                </td>
                                <td>Radio</td>
                                <td>
                                    <i class="fa fa-caret-down text-danger pr10"></i>$349,712</td>
                            </tr>
                            <tr>
                                <td>
                                    <span class="fa fa-newspaper-o text-info"></span>
                                </td>
                                <td>Newspaper</td>
                                <td>
                                    <i class="fa fa-caret-up text-info pr10"></i>$1,259,742</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <span class="panel-icon">
                        <i class="fa fa-trophy"></i>
                    </span>
                    <span class="panel-title"> My Skills</span>
                </div>
                <div class="panel-body pb5">
                    <span class="label label-warning mr5 mb10 ib lh15">Default</span>
                    <span class="label label-primary mr5 mb10 ib lh15">Primary</span>
                    <span class="label label-info mr5 mb10 ib lh15">Success</span>
                    <span class="label label-success mr5 mb10 ib lh15">Info</span>
                    <span class="label label-alert mr5 mb10 ib lh15">Warning</span>
                    <span class="label label-system mr5 mb10 ib lh15">Danger</span>
                    <span class="label label-info mr5 mb10 ib lh15">Success</span>
                    <span class="label label-success mr5 mb10 ib lh15">Ui Design</span>
                    <span class="label label-primary mr5 mb10 ib lh15">Primary</span>

                </div>
            </div>
            <div class="panel">
                <div class="panel-heading">
                    <span class="panel-icon">
                        <i class="fa fa-pencil"></i>
                    </span>
                    <span class="panel-title">About Me</span>
                </div>
                <div class="panel-body pb5">
                    <h6>Experience</h6>

                    <h4>Facebook Internship</h4>
                    <p class="text-muted"> University of Missouri, Columbia
                    </p>

                    <h6>Education</h6>

                    <h4>Bachelor of Science, PhD</h4>
                    <p class="text-muted"> University of Missouri, Columbia
                    </p>

                    <h6>Accomplishments</h6>

                    <h4>Successful Business</h4>
                    <p class="text-muted pb10"> University of Missouri, Columbia
                    </p>
                </div>
            </div>
        </div>

    );
}

export default SideTrainee;