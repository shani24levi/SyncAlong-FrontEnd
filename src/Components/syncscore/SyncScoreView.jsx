import React, { useContext, useState, useEffect, useRef } from 'react';
import { SocketContext } from '../Context/ContextProvider';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import commponents
import { delay } from '../../helpers';
function SyncScoreView(props) {
  let allSync = useSelector((state) => state.syncs);
  let me = useSelector((state) => state.auth?.user);
  let myprofile = useSelector((state) => state.profile);
  let [syncbyAct, setSyncByAct] = useState([]);
  let namePeer = null;
  let time = null;
  let avg = 0; let count = 0;
  useEffect(() => {
    allSync.meeting && allSync.meeting.activities.map((activity) => {
        let sync = allSync.all_syncs.filter((sync) => sync.activity === activity);
        sync.sort((a,b)=> a.result < b.result ? 1 : -1);
        setSyncByAct((syncbyAct) => [...syncbyAct, sync]);
      });
  }, []);
  return (
    <div style={{ 
        "text-align": "center"
    }}>
        <div style={{fontSize:"50px"}}>Meeting Report</div><br/>
        <div style={{fontSize:"40px"}}>title: {allSync.meeting?.title}</div><br/>
        {/* {
            me.role == "trainer"?
                namePeer = myprofile?.trainees_profiles.filter(element=> element.user._id === allSync.meeting?.trainee)?.user?.name
                :
                namePeer = 'none'
        } */}
        {
            me.role == "trainer"?
                <div style={{fontSize:"35px"}}>
                    <span style={{"margin-left": "0px"}}>me: {props.my_name}</span> 
                    <span style={{"margin-left": "200px"}}>my trainee: {props.your_name}</span>
                </div>
                :
                <div style={{fontSize:"35px"}}>
                    <span style={{"margin-left": "0px"}}>me: {props.my_name}</span> 
                    <span style={{"margin-left": "200px"}}>my trainer: {props.your_name}</span>
                </div>
        }
        <br/>
      {/* <h1>{new Date(allSync?.meeting?.date).getDate}</h1> */}
      {
        syncbyAct.map((elements) => {
            return(<>
                <div style={{fontSize: "30px",   "border-style": "ridge", "border-radius": '50px'}}>{elements[0]?.activity}</div>
                <span hidden={true}>{ avg = 0} { count = 0}</span>
                    {
                        elements.map((sync) => {
                            const arr = sync.time.split(', ');const date = arr[0].split('/');
                            count++; avg += Number.parseInt(sync.result * 100);
                            return( 
                               count % 5 == 0 ? 
                                                <br/> 
                                                :
                                                Number.parseInt(sync.result * 100) < 75 ? 
                                                        count == elements.length ?
                                                                <span style={{fontSize:"25px"}}><span style={{color: 'red'}}>{Number.parseInt(sync.result * 100) + "%"}   {"=>"}   {arr[1]}  </span></span>
                                                                :
                                                                <span style={{fontSize:"25px"}}><span style={{color: 'red'}}>{Number.parseInt(sync.result * 100) + "%"}   {"=>"}   {arr[1]}  </span>  {"  |  "} </span>
                                                        :
                                                        count == elements.length ? 
                                                                <span style={{fontSize:"25px"}}><span style={{color: 'green'}} >{Number.parseInt(sync.result * 100) + "%"}   {"=>"}   {arr[1]}  </span></span>
                                                                :
                                                                <span style={{fontSize:"25px"}}><span style={{color: 'green'}} >{Number.parseInt(sync.result * 100) + "%"}   {"=>"}   {arr[1]}  </span> {"  |  "} </span>
                                )
                            })       
                    }
                <span hidden={true}>{ count > 0 ? avg = avg / count : 0}</span>
                {count > 0  ? <div style={{color: 'yellow', fontSize:"28px"}}>avg sync: {Number.parseInt(avg) + "%"}</div> : <></>}
            </>)
        })
      }
    </div>
  );
}

export default SyncScoreView;
