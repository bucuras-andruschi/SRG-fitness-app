"use client"

import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../../contexts/authContext'
import { doSignOut } from "../../../firebase/auth";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom'
import './arm.css'

const exercises=[
    { name: 'Arm raises', duration:'30 sec', videoUrl:'https://www.youtube.com/embed/Bqvmyni_sKQ'},
    { name: 'Side arm raise', duration: '30 sec', videoUrl: 'https://www.youtube.com/embed/YslHgg2E-Ro'},
    { name: 'Triceps dips', duration: '10x', videoUrl: 'https://www.youtube.com/embed/JhX1nBnirNw'},
    { name : 'Arm circles clockwise', duration: '30 sec', videoUrl: 'https://www.youtube.com/embed/Lha66p0ZXUc'},
    { name: 'Arm circles counterclockwise', duration: '30 sec', videoUrl: 'https://www.youtube.com/embed/Lha66p0ZXUc'},
    { name: 'Diamond push-ups', duration: '6x', videoUrl: 'https://www.youtube.com/embed/UCmqw3kKZ38'},
    { name: 'Jumping jacks', duration: '30 sec', videoUrl: 'https://www.youtube.com/embed/2W4ZNSwoW_4'},
    { name: 'Chest press pulse', duration: '16 sec', videoUrl: 'https://www.youtube.com/embed/Fz4oo1vFo9M'},
    { name: 'Leg barbell curl left', duration: '8x', videoUrl: 'https://www.youtube.com/embed/3kZS8HVFquk'},
    { name: 'Leg barbell curl right', duration: '8x', videoUrl: 'https://www.youtube.com/embed/3kZS8HVFquk'},
    { name: 'Diagonal plank', duration: '10x', videoUrl: 'https://www.youtube.com/embed/OGfFtF-dhrk'},
    {name: 'Punches', duration: '30 sec', videoUrl: 'https://www.youtube.com/embed/reeBHtZJ1ts'},
    { name: 'Push-ups', duration: '10x', videoUrl: 'https://www.youtube.com/embed/R08gYyypGto'},
    { name: 'Inchworms', duration: '8x', videoUrl: 'https://www.youtube.com/embed/ZY2ji_Ho0dA'},
    { name: 'Wall push-ups', duration: '12x', videoUrl: 'https://www.youtube.com/embed/EOf3cGIQpA4'},
]

const Arm = () => {
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

    const handleShoulderBackClick = () => {
        navigate('/shoulderback')
    }

    const handleSRGClick=()=>{
        navigate('/srg')
    }

    return (
        <div className="workout-container">
            <h1 className="title">Arm Workout</h1>
            <div className='sidebar'>
                <Sidebar>
                    <Menu>
                        <MenuItem className='item' onClick={handleRecipeClick}> Today's recipe </MenuItem>
                        <MenuItem className='item' onClick={handleBMIClick}> BMI Calculator </MenuItem>
                        <SubMenu label='Workouts' className='item'>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleAbsClick}>Abs</span></MenuItem>
                            <MenuItem className='sub-item'> <span className='text' onClick={handleChestClick}>Chest</span> </MenuItem>
                            <MenuItem className='sub-item'> <span className='text'>Arm</span> </MenuItem>
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

export default Arm;