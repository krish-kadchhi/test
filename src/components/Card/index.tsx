'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment, SetStateAction, useState } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { useCart } from '@/providers/CartThings'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'price'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  // const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, price } = doc || {}
  const { description, image: metaImage, } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  const { addItem } = useCart()

  function calculate(title: string | null | undefined, price: number | null | undefined) {
    addItem(title || 'Untitled', price || 0)
  }

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}

    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                        <button key={index}>Add to cart</button>
                      </Fragment>

                    )
                  }

                  return null
                })}

              </div>
            )}
          </div>
        )}
        <button onClick={() => calculate(title, price)}>Add to cart</button>
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
        {price && <p>{price}</p>}
      </div>
    </article>
  )
}
