import React from 'react'
import { useSelector } from 'react-redux'
import { ArticleCard } from './ArticleCard'

export const Articles = () => {

    const {articles} = useSelector(state => state.articles)

  return (
    <div className='grid grid-cols-4 gap-5 container mx-auto px-5 mt-10'>
        {articles && articles.map(a => (
            <ArticleCard key={a.id} article={a} />
        ))}
    </div>
  )
}
