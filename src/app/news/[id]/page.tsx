'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import newsData from '@/data/news.json'

// Types for the news article structure
interface NewsArticle {
  id: string
  title: string
  content: string
  htmlContent?: string
  authorName: string
  sourceDomain: string
  seoMetadata: {
    keywords: string
    metaDescription: string
    metaTitle: string
  }
}

export default function NewsArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        // Load the articles and find the specific one
        const data = newsData as any
        const articles = data.articles || []
        
        const foundArticle = articles.find((a: NewsArticle) => a.id === params.id)
        
        if (foundArticle) {
          setArticle(foundArticle)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error loading news article:', error)
        setNotFound(true)
        setLoading(false)
      }
    }

    if (params.id) {
      loadArticle()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă articolul...</p>
        </div>
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Articolul nu a fost găsit</h2>
            <p className="text-gray-600 mb-8">
              Ne pare rău, dar articolul pe care îl căutați nu există sau a fost mutat.
            </p>
          </div>
          <Link 
            href="/news" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            ← Înapoi la Noutăți
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/news" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors duration-200"
          >
            ← Înapoi la Noutăți
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <span>De {article.authorName}</span>
            <span>•</span>
            <span>{article.sourceDomain}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="prose prose-lg max-w-none">
          {article.htmlContent ? (
            <div 
              dangerouslySetInnerHTML={{ __html: article.htmlContent }}
              className="text-gray-800 leading-relaxed"
            />
          ) : (
            <div className="text-gray-800 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          )}
        </article>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600 mb-4 sm:mb-0">
              <p>Autor: <span className="font-medium text-gray-900">{article.authorName}</span></p>
              <p>Sursă: <span className="font-medium text-gray-900">{article.sourceDomain}</span></p>
            </div>
            <Link 
              href="/news" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Vezi toate noutatile
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
