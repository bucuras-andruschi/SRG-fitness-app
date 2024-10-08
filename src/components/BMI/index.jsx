"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from "../../firebase/auth";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom'
import './bmi.css'


const BMI = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [unit, setUnit] = useState("metric")
    const [height, setHeight] = useState({ cm: "", ft: "", in: "" })
    const [weight, setWeight] = useState({ kg: "", lbs: "" })
    const [bmi, setBmi] = useState(null)

    const handleRecipeClick = () => {
        navigate('/home');
    };

    const handleAbsClick = () => {
        navigate('/abs');
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

    const handleSRGClick = () => {
        navigate('/srg')
    }

    const calculateBMI = () => {
        let bmiValue
        if (unit === "metric") {
            const heightInMeters = parseFloat(height.cm) / 100
            bmiValue = parseFloat(weight.kg) / (heightInMeters * heightInMeters)
        } else {
            const heightInInches = parseInt(height.ft) * 12 + parseInt(height.in)
            bmiValue = (parseFloat(weight.lbs) / (heightInInches * heightInInches)) * 703
        }
        setBmi(bmiValue.toFixed(1))
    }

    useEffect(() => {
        if (
            (unit === "metric" && height.cm && weight.kg) ||
            (unit === "imperial" && height.ft && height.in && weight.lbs)
        ) {
            calculateBMI()
        } else {
            setBmi(null)
        }
    }, [unit, height, weight])

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return "Underweight"
        if (bmi < 25) return "Normal weight"
        if (bmi < 30) return "Overweight"
        return "Obese"
    }

    return(
        <div className='container'>
            <div className='sidebar'>
                <Sidebar>
                    <Menu>
                        <MenuItem className='item' onClick={handleRecipeClick}> Today's recipe </MenuItem>
                        <MenuItem className='item' > BMI Calculator </MenuItem>
                        <SubMenu label='Workouts' className='item'>
                                <MenuItem className='sub-item' onClick={handleAbsClick}> <span className='text'>Abs</span> </MenuItem>
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
            <div className='bmiCalculator'>
                <h1>BMI Calculator</h1>
                <p>Calculate your Body Mass Index</p>
                <div className='unitToggle'>
                    <label>
                        <input
                            type="radio"
                            value="metric"
                            checked={unit === "metric"}
                            onChange={(e) => setUnit(e.target.value)}
                        />
                        Metric
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="imperial"
                            checked={unit === "imperial"}
                            onChange={(e) => setUnit(e.target.value)}
                        />
                        Imperial
                    </label>
                </div>

                {unit === "metric" ? (
                    <>
                        <div className='inputGroup'>
                            <label htmlFor="height-cm">Height (cm)</label>
                            <input
                                className='my-input'
                                id="height-cm"
                                type="number"
                                placeholder="Height in cm"
                                value={height.cm}
                                onChange={(e) => setHeight({ ...height, cm: e.target.value })}
                                autoComplete='off'
                            />
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor="weight-kg">Weight (kg)</label>
                            <input
                                className='my-input'
                                id="weight-kg"
                                type="number"
                                placeholder="Weight in kg"
                                value={weight.kg}
                                onChange={(e) => setWeight({ ...weight, kg: e.target.value })}
                                autoComplete='off'
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className='inputGroup'>
                            <label htmlFor="height-ft">Height (ft)</label>
                            <input
                                className='my-input'
                                id="height-ft"
                                type="number"
                                placeholder="Feet"
                                value={height.ft}
                                onChange={(e) => setHeight({ ...height, ft: e.target.value })}
                                autoComplete='off'
                            />
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor="height-in">Height (in)</label>
                            <input
                                className='my-input'
                                id="height-in"
                                type="number"
                                placeholder="Inches"
                                value={height.in}
                                onChange={(e) => setHeight({ ...height, in: e.target.value })}
                                autoComplete='off'
                            />
                        </div>
                        <div className='inputGroup'>
                            <label htmlFor="weight-lbs">Weight (lbs)</label>
                            <input
                                className='my-input'
                                id="weight-lbs"
                                type="number"
                                placeholder="Weight in lbs"
                                value={weight.lbs}
                                onChange={(e) => setWeight({ ...weight, lbs: e.target.value })}
                                autoComplete='off'
                            />
                        </div>
                    </>
                )}

                {bmi !== null && (
                    <div className='result'>
                        <p className='bmiValue'>{bmi}</p>
                        <p className='bmiCategory'>{getBMICategory(bmi)}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
export default BMI;