import React, {useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import '../News.css'

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState([true])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a9857f4efc184f3cabf25d67b58715e6&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(50);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        document.title = `${(props.category).charAt(0).toUpperCase() + props.category.slice(1)} - NewsLetter`;
        // eslint-disable-next-line
    }, [] )

    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a9857f4efc184f3cabf25d67b58715e6&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };

    return (
        <div className="container my-3">
            <h1 className="my-2 text-center">Newsletter - Read Top Headlines</h1>
            <h2 className="my-2 text-center">{props.category.charAt(0).toUpperCase() + props.category.slice(1)}</h2>
            {loading && <Spinner />} 

            <InfiniteScroll style={{height: "none", overflow: "none"}}
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((element)=>{
                            return <div className="col-md-3 my-3" key={element.url}>
                                    <Newsitem title={element.title?element.title.slice(0, 30):""} description={element.description?element.title.slice(0, 80):""} author={element.author} date={element.publishedAt} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>   
            </InfiniteScroll>
        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageNo: PropTypes.number,
    category: PropTypes.string
}

export default News