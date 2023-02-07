import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class FileName extends Component {
    render() {
        return <div>

            <Navbar />
            <News />
        </div>
    }
}