"use client"

import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../contexts/authContext'
import { doSignOut } from "../../../firebase/auth";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom'
import './leg.css'

const exercises = [
    { name: 'Side hop', duration: '30 sec', videoUrl: 'https://www.youtube.com/embed/nYmUEJIBj3c' },
    { name: 'Squats', duration: '12x', videoUrl: 'https://www.youtube.com/embed/42bFodPahBU' },
    { name: 'Squats', duration: '12x', videoUrl: 'https://www.youtube.com/embed/42bFodPahBU' },
    { name: 'Side-lying leg lift left', duration: '12x', videoUrl: 'https://www.youtube.com/embed/VlwBJE1WtOQ' },
    { name: 'Side-lying leg lift right', duration: '12x', videoUrl: 'https://www.youtube.com/embed/VlwBJE1WtOQ' },
    { name: 'Side-lying leg lift left', duration: '12x', videoUrl: 'https://www.youtube.com/embed/VlwBJE1WtOQ' },
    { name: 'Side-lying leg lift right', duration: '12x', videoUrl: 'https://www.youtube.com/embed/VlwBJE1WtOQ' },
    { name: 'Backward lunge', duration: '14x', videoUrl: 'https://www.youtube.com/embed/_LGpDtENZ5U' },
    { name: 'Backward lunge', duration: '14x', videoUrl: 'https://www.youtube.com/embed/_LGpDtENZ5U' },
    { name: 'Donkey kicks left', duration: '16x', videoUrl: 'https://www.youtube.com/embed/4ranVQDqlaU' },
    { name: 'Donkey kicks right', duration: '16x', videoUrl: 'https://www.youtube.com/embed/4ranVQDqlaU' },
    { name: 'Donkey kicks left', duration: '16x', videoUrl: 'https://www.youtube.com/embed/4ranVQDqlaU' },
    { name: 'Donkey kicks right', duration: '16x', videoUrl: 'https://www.youtube.com/embed/4ranVQDqlaU' },
    { name: ' Wall calf raises', duration: '12x', videoUrl: 'https://www.youtube.com/embed/GQa_N7wft7M' },
    { name: ' Wall calf raises', duration: '12x', videoUrl: 'https://www.youtube.com/embed/GQa_N7wft7M' },
];

const Leg = () => {
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

    const handleArmClick = () => {
        navigate('/arm')
    }

    const handleShoulderBackClick = () => {
        navigate('/shoulderback')
    }

    const handleSRGClick=()=>{
        navigate('/srg')
    }

    return (
        <div className="workout-container">
            <h1 className="title">Leg Workout</h1>
            <div className='sidebar'>
                <Sidebar>
                    <Menu>
                        <MenuItem className='item' onClick={handleRecipeClick}> Today's recipe </MenuItem>
                        <MenuItem className='item' onClick={handleBMIClick}> BMI Calculator </MenuItem>
                        <SubMenu label='Workouts' className='item'>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleAbsClick}>Abs</span></MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleChestClick}>Chest</span> </MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleArmClick}>Arm</span> </MenuItem>
                            <MenuItem className='sub-item'> <span className='text'>Leg</span> </MenuItem>
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

export default Leg;