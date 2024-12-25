import React from 'react'
import { Link } from 'react-router-dom'

export const ArticleCard = ({article}) => {
  return (
    

<div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link to={`/article/${article.id}`} className='h-[300px] w-full block '>
        <img className="rounded-t-lg h-full w-full object-cover " src={article.image ? `https://mustafocoder.pythonanywhere.com/api${article.image}` : "https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"} alt="" />
    </Link>
    <div className="p-5">
        <Link to={`/article/${article.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">{article.title}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-5">{article.content}</p>
        <Link to={`/article/${article.id}`} className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4  dark:hover:bg-blue-700">
            Read more
             <i className='fa fa-arrow-right-long'></i>
        </Link>
    </div>
</div>

  )
}
