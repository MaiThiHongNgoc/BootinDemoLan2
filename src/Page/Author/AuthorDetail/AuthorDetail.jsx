import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAuthorById } from '../../../Backend/Service (1)/authorService';

const AuthorDetail = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthorById(authorId);
        setAuthor(data);
      } catch (error) {
        console.error('Failed to fetch author details', error);
      }
    };
    fetchAuthor();
  }, [authorId]);

  if (!author) {
    return <p>Loading author details...</p>;
  }

  return (
    <div>
      <h1>{author.author_name}</h1>
      <img src={author.url_img} alt={author.author_name} />
      <p>Published Books: {author.published_book}</p>
      <p>Bio: {author.bio}</p>
      {/* Hiển thị thêm thông tin nếu cần */}
    </div>
  );
};

export default AuthorDetail;
