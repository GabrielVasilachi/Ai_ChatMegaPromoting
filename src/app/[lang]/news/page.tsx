'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import roLocale from '@/locales/ro.json'
import enLocale from '@/locales/en.json'
import ruLocale from '@/locales/ru.json'
import newsData from '@/data/news.json'

// Types for the news article structure
interface NewsArticle {
  id: string
  title: string
  content?: string
  htmlContent?: string
  authorName?: string
  sourceDomain?: string
  publishDate?: string
  imageUrl?: string
  category?: string
  tags?: string[]
  seoMetadata?: {
    keywords?: string
    metaDescription?: string
    metaTitle?: string
  }
}

type SortKey = 'newest' | 'oldest' | 'title'

export default function NewsPage() {
  const pathname = typeof usePathname === 'function' ? usePathname() : '';
  const langMatch = pathname ? pathname.match(/^\/([a-z]{2})/) : null;
  const lang = langMatch ? langMatch[1].toLowerCase() : 'ro';
  const basePath = `/${lang}`;
  const locales: Record<string, any> = { ro: roLocale, en: enLocale, ru: ruLocale };
  const t = locales[lang] || locales['ro'];
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  // Filters state
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortKey>('newest')

  useEffect(() => {
    const loadArticles = () => {
      try {
        const data = newsData as any
        const raw = (data.articles || []) as NewsArticle[]
        // Normalize: ensure tags, category, and content preview
        const normalized = raw.map((a) => {
          let tags: string[] | undefined = a.tags
          if (!tags && a.seoMetadata?.keywords) {
            tags = a.seoMetadata.keywords
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          }
          return {
            ...a,
            tags,
          }
        })
        setArticles(normalized)
      } catch (error) {
        console.error('Error loading news articles:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    articles.forEach((a) => a.tags?.forEach((t) => set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [articles])

  const allCategories = useMemo(() => {
    const set = new Set<string>()
    articles.forEach((a) => a.category && set.add(a.category))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [articles])

  const allSources = useMemo(() => {
    const set = new Set<string>()
    articles.forEach((a) => a.sourceDomain && set.add(a.sourceDomain))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [articles])

  const filtered = useMemo(() => {
    let list = [...articles]
    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((a) => {
        const text = (
          (a.title || '') + ' ' +
          (a.content || '') + ' ' +
          (a.htmlContent || '')
        ).toLowerCase()
        return text.includes(q)
      })
    }
    // Tags
    if (selectedTags.length > 0) {
      list = list.filter((a) => {
        const tags = a.tags || []
        return selectedTags.every((t) => tags.includes(t))
      })
    }
    // Categories
    if (selectedCategories.length > 0) {
      list = list.filter((a) => a.category && selectedCategories.includes(a.category))
    }
    // Sources
    if (selectedSources.length > 0) {
      list = list.filter((a) => a.sourceDomain && selectedSources.includes(a.sourceDomain))
    }
    // Sort
    list.sort((a, b) => {
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '')
      const da = a.publishDate ? new Date(a.publishDate).getTime() : 0
      const db = b.publishDate ? new Date(b.publishDate).getTime() : 0
      return sortBy === 'newest' ? db - da : da - db
    })
    return list
  }, [articles, search, selectedTags, selectedCategories, selectedSources, sortBy])

  const toggleValue = (value: string, list: string[], setter: (v: string[]) => void) => {
    if (list.includes(value)) setter(list.filter((v) => v !== value))
    else setter([...list, value])
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedTags([])
    setSelectedCategories([])
    setSelectedSources([])
    setSortBy('newest')
  }

  const truncateContent = (content: string, maxLength: number = 160) => {
    if (!content) return ''
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength).trim() + '…'
  }

  const extractPlainText = (htmlContent: string) => {
    return htmlContent.replace(/<[^>]*>/g, '').replace(/\n/g, ' ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black mx-auto mb-4" />
          <p className="text-gray-600">{t?.NewsPage?.loading || 'Loading news…'}</p>
        </div>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-white mt-20">
      {/* Header */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black">{t?.NewsPage?.title || 'News'}</h1>
              <p className="text-gray-600 mt-2">{t?.NewsPage?.subtitle || 'Curated articles without the visual noise. Filter and find what matters quickly.'}</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <label className="text-sm text-gray-600">{t?.NewsPage?.sortLabel || 'Sort'}</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="h-9 border border-gray-300 rounded-md px-2 text-sm bg-white text-gray-900"
              >
                <option value="newest">{t?.NewsPage?.sortOptions?.newest || 'Newest'}</option>
                <option value="oldest">{t?.NewsPage?.sortOptions?.oldest || 'Oldest'}</option>
                <option value="title">{t?.NewsPage?.sortOptions?.title || 'Title A–Z'}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-8">
          {/* Filters panel */}
          <aside className="md:sticky md:top-20 h-max border border-gray-200 rounded-xl p-4">
            <div className="space-y-5">
              {/* Search */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">{t?.NewsPage?.search?.label || 'Search'}</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t?.NewsPage?.search?.placeholder || 'Search by title or content…'}
                  className="w-full h-9 border border-gray-300 rounded-md px-2 text-sm bg-white text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Categories */}
              {allCategories.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-gray-600">{t?.NewsPage?.categories || 'Categories'}</label>
                    {selectedCategories.length > 0 && (
                      <button onClick={() => setSelectedCategories([])} className="text-xs text-gray-500 hover:underline">{t?.NewsPage?.reset || 'Reset'}</button>
                    )}
                  </div>
                  <div className="max-h-36 overflow-auto pr-1 space-y-1">
                    {allCategories.map((c) => (
                      <label key={c} className="flex items-center gap-2 text-sm text-gray-800">
                        <input
                          type="checkbox"
                          className="h-4 w-4 border-gray-400 rounded"
                          checked={selectedCategories.includes(c)}
                          onChange={() => toggleValue(c, selectedCategories, setSelectedCategories)}
                        />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {allTags.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-gray-600">{t?.NewsPage?.tags || 'Tags'}</label>
                    {selectedTags.length > 0 && (
                      <button onClick={() => setSelectedTags([])} className="text-xs text-gray-500 hover:underline">{t?.NewsPage?.reset || 'Reset'}</button>
                    )}
                  </div>
                  <div className="max-h-40 overflow-auto pr-1 space-y-1">
                    {allTags.map((t) => (
                      <label key={t} className="flex items-center gap-2 text-sm text-gray-800">
                        <input
                          type="checkbox"
                          className="h-4 w-4 border-gray-400 rounded"
                          checked={selectedTags.includes(t)}
                          onChange={() => toggleValue(t, selectedTags, setSelectedTags)}
                        />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {/* Sort (mobile) */}
              <div className="md:hidden">
                <label className="block text-xs font-medium text-gray-600 mb-1">{t?.NewsPage?.sortLabel || 'Sort'}</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="w-full h-9 border border-gray-300 rounded-md px-2 text-sm bg-white text-gray-900"
                >
                  <option value="newest">{t?.NewsPage?.sortOptions?.newest || 'Newest'}</option>
                  <option value="oldest">{t?.NewsPage?.sortOptions?.oldest || 'Oldest'}</option>
                  <option value="title">{t?.NewsPage?.sortOptions?.title || 'Title A–Z'}</option>
                </select>
              </div>

              {/* Clear */}
              <button
                onClick={clearFilters}
                className="w-full h-9 border border-gray-300 rounded-md text-sm text-gray-800 hover:bg-gray-50"
              >
                Șterge filtrele
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                {filtered.length} {t?.NewsPage?.itemsLabel || 'news'}
                {(selectedTags.length + selectedCategories.length + selectedSources.length > 0 || search) && (
                  <span className="ml-2 text-gray-400">
                    {t?.NewsPage?.filtered || '(filtered)'}
                  </span>
                )}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
                <p className="text-gray-800 font-medium">{t?.NewsPage?.noMatchesTitle || 'No matches found.'}</p>
                <p className="text-gray-500 text-sm mt-1">{t?.NewsPage?.noMatchesSubtitle || 'Try adjusting filters or clearing the search.'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((article) => {
                  const previewText = article.htmlContent
                    ? extractPlainText(article.htmlContent)
                    : (article.content || '')

                  const date = article.publishDate ? new Date(article.publishDate) : null
                  const dateStr = date ? date.toLocaleDateString('ro-RO', { year: 'numeric', month: 'short', day: '2-digit' }) : undefined

                  return (
                    <Link
                      key={article.id}
                      href={`/news/${article.id}`}
                      className="group block focus:outline-none h-full"
                      tabIndex={0}
                      aria-label={`Deschide articolul: ${article.title}`}
                    >
                      <article className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow cursor-pointer group-hover:shadow-lg group-focus:shadow-lg flex flex-col h-full">
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            {dateStr && <span>{dateStr}</span>}
                            {(article.authorName || article.sourceDomain) && <span>•</span>}
                            {article.authorName && <span>{article.authorName}</span>}
                            {article.sourceDomain && (
                              <>
                                <span>•</span>
                                <span>{article.sourceDomain}</span>
                              </>
                            )}
                          </div>
                          <h2 className="text-lg font-semibold text-black leading-snug mb-2 line-clamp-2 group-hover:underline group-focus:underline">{article.title}</h2>
                          <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 mb-3 flex-1">
                            {truncateContent(previewText)}
                          </p>
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {article.tags.slice(0, 4).map((t) => (
                                <span key={t} className="text-xs text-gray-700 border border-gray-300 rounded-full px-2 py-0.5">{t}</span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-auto">
                            {article.category && (
                              <span className="text-xs text-gray-600 border border-gray-300 rounded-md px-1.5 py-0.5">{article.category}</span>
                            )}
                            <span className="ml-auto inline-flex items-center text-sm text-black hover:underline">
                              {t?.NewsPage?.readMore || 'Read more'}
                              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
