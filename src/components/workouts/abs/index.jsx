"use client"

import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../contexts/authContext'
import { doSignOut } from "../../../firebase/auth";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom'
import './abs.css'

const exercises = [
    { name: "Jumping Jacks", duration: "20 sec", videoUrl: "https://www.youtube.com/embed/2W4ZNSwoW_4" },
    { name: "Abdominal Crunches", duration: "16x", videoUrl: "https://www.youtube.com/embed/RUNrHkbP4Pc" },
    { name: "Russian Twist", duration: "20x", videoUrl: "https://www.youtube.com/embed/DJQGX2J4IVw" },
    { name: "Mountain Climber", duration: "16x", videoUrl: "https://www.youtube.com/embed/wQq3ybaLZeA" },
    { name: "Heel Touch", duration: "20x", videoUrl: "https://www.youtube.com/embed/9bR-elyolBQ" },
    { name: "Leg Raises", duration: "16x", videoUrl: "https://www.youtube.com/embed/dGKbTKLnym4" },
    { name: "Plank", duration: "20 sec", videoUrl: "https://www.youtube.com/embed/Fcbw82ykBvY" },
    { name: "Abdominal Crunches", duration: "12x", videoUrl: "https://www.youtube.com/embed/RUNrHkbP4Pc" },
    { name: "Russian Twist", duration: "32x", videoUrl: "https://www.youtube.com/embed/DJQGX2J4IVw" },
    { name: "Mountain Climber", duration: "12x", videoUrl: "https://www.youtube.com/embed/wQq3ybaLZeA" },
    { name: "Heel Touch", duration: "20x", videoUrl: "https://www.youtube.com/embed/9bR-elyolBQ" },
    { name: "Leg Raises", duration: "14x", videoUrl: "https://www.youtube.com/embed/dGKbTKLnym4" },
    { name: "Plank", duration: "30 sec", videoUrl: "https://www.youtube.com/embed/Fcbw82ykBvY" },
    { name: "Cobra Stretch", duration: "30 sec", videoUrl: "https://www.youtube.com/embed/z21McHHOpAg" },
];

const Abs = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleRecipeClick = () => {
        navigate('/home')
    }

    const handleBMIClick = () => {
        navigate('/bmi')
    }

    const handleChestClick = () => {
        navigate('/chest')
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
            <h1 className="title">Abs Workout</h1>
            <div className='sidebar'>
                <Sidebar>
                    <Menu>
                        <MenuItem className='item' onClick={handleRecipeClick}> Today's recipe </MenuItem>
                        <MenuItem className='item' onClick={handleBMIClick}> BMI Calculator </MenuItem>
                        <SubMenu label='Workouts' className='item'>
                            <MenuItem className='sub-item'> <span className='text'>Abs</span></MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleChestClick}>Chest</span> </MenuItem>
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

export default Abs;