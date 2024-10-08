"use client"

import React from 'react'
import { useAuth } from '../../../contexts/authContext'
import { doSignOut } from "../../../firebase/auth";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom'
import './chest.css'

const exercises=[
    { name:'Jumping Jacks', duration:'30 sec', videoUrl:'https://www.youtube.com/embed/2W4ZNSwoW_4'},
    { name:'Incline Push-ups', duration:'6x', videoUrl:'https://www.youtube.com/embed/3WUUeM07i_Q'},
    { name:'Push-ups', duration:'4x', videoUrl: 'https://www.youtube.com/embed/R08gYyypGto'},
    { name: 'Wide Arm Push-ups', duration: '4x', videoUrl: 'https://www.youtube.com/embed/pQUsUHvyoI0'},
    { name: 'Triceps Dips', duration: '6x', videoUrl: 'https://www.youtube.com/embed/JhX1nBnirNw'},
    { name: 'Wide Arm Push-ups', duration: '4x', videoUrl: 'https://www.youtube.com/embed/pQUsUHvyoI0'},
    { name:'Incline Push-ups', duration:'4x', videoUrl:'https://www.youtube.com/embed/3WUUeM07i_Q'},
    { name: 'Triceps Dips', duration: '4x', videoUrl: 'https://www.youtube.com/embed/JhX1nBnirNw'},
    { name: 'Knee Push-ups', duration: '4x', videoUrl: 'https://www.youtube.com/embed/jWxvty2KROs'},
    { name: 'Cobra Stretch', duration: '20 sec', videoUrl: 'https://www.youtube.com/embed/z21McHHOpAg'},
    { name: 'Chest Stretch', duration: '20 sec', videoUrl: 'https://www.youtube.com/embed/NS64IgKUyeY'}
]

const Chest = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleRecipeClick = () => {
        navigate('/home')
    }

    const handleBMIClick = () => {
        navigate('/bmi')
    }

    const handleAbsClick = () => {
        navigate('/abs')
    }

    const handleArmClick = () => {
        navigate('/arm')
    }

    const handleLegClick = () => {
        navigate('/leg')
    }

    const handleShoulderBackClick = () => {
        navigate('/shoulderback')
    }

    const handleSRGClick=()=>{
        navigate('/srg')
    }

    return (
        <div className="workout-container">
            <h1 className="title">Chest Workout</h1>
            <div className='sidebar'>
                <Sidebar>
                    <Menu>
                        <MenuItem className='item' onClick={handleRecipeClick}> Today's recipe </MenuItem>
                        <MenuItem className='item' onClick={handleBMIClick}> BMI Calculator </MenuItem>
                        <SubMenu label='Workouts' className='item'>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleAbsClick}>Abs</span></MenuItem>
                            <MenuItem className='sub-item'> <span className='text'>Chest</span> </MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleArmClick}>Arm</span> </MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleLegClick}>Leg</span> </MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleShoulderBackClick}>Shoulder&Back</span>
                            </MenuItem>
                        </SubMenu>
                        <MenuItem className='item' onClick={handleSRGClick}> ChatSRG</MenuItem>
                        <MenuItem className='item' onClick={
                            () => {
                                doSignOut().then(() => {
                                    navigate('/login')
                                })
                            }}
                        > Sign out </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            <div className='exercise-list'>
                {exercises.map((exercise, index)=>(
                    <div key={index} className='exercise-card'>
                        <div className="exercise-info">
                            <h2 className="exercise-name">{exercise.name}</h2>
                            <p className="exercise-duration">{exercise.duration}</p>
                        </div>
                        <div className='exercise-video'></div>
                        <iframe
                            width='300'
                            height='170'
                            src={`${exercise.videoUrl}?autoplay=1&mute=1&cc_load_policy=0&controls=0&loop=1&playlist=${exercise.videoUrl.split('/').pop()}`}
                            title={exercise.name}
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chest;