"use client"

import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../contexts/authContext'
import { doSignOut } from "../../../firebase/auth";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom'
import './shoulderback.css'

const exercises = [
    { name: 'Jumping jacks', duration: '30 sec', videoUrl: 'https://www.youtube.com/embed/2W4ZNSwoW_4' },
    { name: 'Arm raises', duration: '16 sec', videoUrl: 'https://www.youtube.com/embed/Bqvmyni_sKQ' },
    { name: 'Rhomboid pulls', duration: '14x', videoUrl: 'https://www.youtube.com/embed/DEyDbzSudEU' },
    { name: 'Side arm raise', duration: '16 sec', videoUrl: 'https://www.youtube.com/embed/YslHgg2E-Ro' },
    { name: 'Knee push-ups', duration: '14x', videoUrl: 'https://www.youtube.com/embed/jWxvty2KROs' },
    { name: 'Arm scissors', duration: '30 sec', videoUrl: 'https://www.youtube.com/embed/pFrJQ-MyL10' },
    { name: 'Rhomboid pulls', duration: '12x', videoUrl: 'https://www.youtube.com/embed/DEyDbzSudEU' },
    { name: 'Side arm raise', duration: '14 sec', videoUrl: 'https://www.youtube.com/embed/YslHgg2E-Ro' },
    { name: 'Knee push-ups', duration: '12x', videoUrl: 'https://www.youtube.com/embed/jWxvty2KROs' },
    { name: 'Cat cow pose', duration: '30 sec', videoUrl: 'https://www.youtube.com/embed/w_UKcI1Ftn8' },
    { name: 'Prone triceps push-ups', duration: '14x', videoUrl: 'https://www.youtube.com/embed/Rr43jMaoJ9g' },
    { name: 'Reclined rhomboid squeezes', duration: '12x', videoUrl: 'https://www.youtube.com/embed/olv2Sv9DwmA' },
    { name: 'Prone triceps push-ups', duration: '14x', videoUrl: 'https://www.youtube.com/embed/Rr43jMaoJ9g' },
    { name: 'Reclined rhomboid squeezes', duration: '12x', videoUrl: 'https://www.youtube.com/embed/olv2Sv9DwmA' },
];

const ShoulderBack = () => {
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

    const handleChestClick = () => {
        navigate('/chest')
    }

    const handleLegClick = () => {
        navigate('/leg')
    }

    const handleArmClick = () => {
        navigate('/arm')
    }

    const handleSRGClick=()=>{
        navigate('/srg')
    }

    return (
        <div className="workout-container">
            <h1 className="title">Shoulder&Back Workout</h1>
            <div className='sidebar'>
                <Sidebar>
                    <Menu>
                        <MenuItem className='item' onClick={handleRecipeClick}> Today's recipe </MenuItem>
                        <MenuItem className='item' onClick={handleBMIClick}> BMI Calculator </MenuItem>
                        <SubMenu label='Workouts' className='item'>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleAbsClick}>Abs</span></MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleChestClick}>Chest</span> </MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleArmClick}>Arm</span> </MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleLegClick}>Leg</span> </MenuItem>
                            <MenuItem className='sub-item'> <span className='text'>Shoulder&Back</span>
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

export default ShoulderBack;