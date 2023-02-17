import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const App = () => {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const pageSize = 12;

    return <div>
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<News apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} />
                <Route exact path="/technology" element={<News apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" />} />
                <Route exact path="/business" element={<News apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" />} />
                <Route exact path="/sports" element={<News apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
                <Route exact path="/entertainment" element={<News apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
                <Route exact path="/science" element={<News apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" />} />
                <Route exact path="/health" element={<News apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" />} />
            </Routes>
        </Router>
    </div>
}

export default App;