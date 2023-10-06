import { Grow, Grid, Typography } from '@mui/material'
import React from 'react'
import NewsCard from '../NewsCard/NewsCard'

const infoCards = [
    { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

const NewsCards = ({ articles, activeArticle }) => {

    if (!articles.length) {
        return (
            <Grow in>
                <Grid style={{
                    padding: '0 5%',
                    width: '100%',
                    margin: 0,
                }} container alignItems='stretch' spacing={3}>
                    {infoCards.map((infoCard, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'center',
                        }} key={i}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                height: '45vh',
                                padding: '10%',
                                borderRadius: 10,
                                color: 'white',
                                backgroundColor: infoCard.color
                            }}>
                                <Typography variant='h5'>{infoCard.title}</Typography>
                                {
                                    infoCard.info ?
                                        (<Typography variant='h6'>
                                            <strong>
                                                {infoCard.title.split(' ')[2]}:
                                            </strong>
                                            <br />
                                            {infoCard.info}
                                        </Typography>) : null
                                }
                                <Typography variant='h6'><strong>Try Saying:</strong> <br /><i>{infoCard.text}</i></Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        )
    }

    return (
        <Grow in>
            <Grid style={{
                padding: '0 5%',
                width: '100%',
                height:'100%',
                margin: 0,
            }} container alignItems='stretch' spacing={3}>
                {articles.map((article, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} style={{ display: 'flex' }} key={i}>
                        <NewsCard article={article} i={i} activeArticle={activeArticle} />
                    </Grid>
                ))}
            </Grid>
        </Grow>
    )
}

export default NewsCards