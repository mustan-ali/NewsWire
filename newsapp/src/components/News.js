import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    render() {
        return (
            <div className="container my-3">
                <h3>Top Headlines</h3>
                <div className="row">
                    <div className="col-md-4">
                        <NewsItem title="Title" description="desc" />
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="Title" description="desc" />
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="Title" description="desc" />
                    </div>
                </div>
            </div>
        )
    }
}

export default News