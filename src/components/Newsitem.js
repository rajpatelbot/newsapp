import React from 'react'

const Newsitem = (props) => {

    let {title, description, imageUrl, newsUrl, author, date, source} = props;  // destructuring.. 
    return (
        <div>
            <div className="card" style={{height: "30rem"}}>
                <span class="position-absolute top-10 badge bg-warning text-dark">
                    <span class="visually-hidden"></span>{source}
                </span>
                <img src={!imageUrl?"https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_960_720.jpg":imageUrl} className="card-img-top" style={{height: "12rem"}} alt="eslint-disable-next-line"/>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{!description?"Please click on read news button to read full news on its main source and it is trusted":description}...</p>
                    <span class="badge bg-dark">{!author?"unknown":author}</span>
                    <p className="card-text"><small className="text-muted"> on {new Date(date).toGMTString()}</small></p>
                    <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-danger">Read News</a>
                </div>
            </div>
        </div>
    )
}

export default Newsitem