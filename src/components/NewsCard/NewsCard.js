import React, { useState, useEffect, createRef } from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Typography, Button } from '@mui/material'

const NewsCard = ({ article: { url, urlToImage, publishedAt, source, title, description }, i, activeArticle }) => {

    // for scrolling 
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);

    useEffect(() => {
        if (i === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle]);
        }
    }, [i, activeArticle, elRefs])

    return (
        <Card ref={elRefs[i]} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderBottom: '10px solid white',
            ...(activeArticle === i ? { borderBottom: '10px solid #22289a', } : {}),
        }}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia style={{ height: 300, }} image={urlToImage || 'https://images.unsplash.com/photo-1504711331083-9c895941bf81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'} component='img' />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '20px',
                }}>
                    <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
                </div>
                <Typography style={{ padding: '0 16px', }} gutterBottom variant='h5'>{title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{
                padding: '0 16px 8px 16px',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Button size='small' color='primary'>Learn More</Button>
                <Typography variant='h5' color='textSecondary'>{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard