import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import type {Props} from '@theme/BlogPostItem';

function formatCompactDate(date: string): string {
  return date.slice(0, 10);
}

function formatAuthors(authors: {name?: string}[]): string {
  const names = authors.map((author) => author.name).filter(Boolean);
  return names.length > 0 ? names.join(', ') : '-';
}

export default function BlogPostItem({children, className}: Props): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();

  if (!isBlogPostPage) {
    const {date, title, permalink, authors} = metadata;
    const authorText = formatAuthors(authors);
    return (
      <BlogPostItemContainer className={clsx('blog-list-row-item', className)}>
        <div className="blog-list-row">
          <time className="blog-list-col-date" dateTime={date}>
            {formatCompactDate(date)}
          </time>
          <h2 className="blog-list-col-title">
            <Link to={permalink}>{title}</Link>
          </h2>
          <div className="blog-list-col-author" title={authorText}>
            {authorText}
          </div>
        </div>
      </BlogPostItemContainer>
    );
  }

  return (
    <BlogPostItemContainer className={className}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
