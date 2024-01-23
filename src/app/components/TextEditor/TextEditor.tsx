'use client'

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

interface TextEditorProps {
  updateContent: (newContent: string) => void;
  initialValue: string;
}

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 40vh;
  align-items: center;
  justify-content: center;
`;

const TextEditor: React.FC<TextEditorProps> = ({ initialValue, updateContent }) => {
  const [content, setContent] = useState('');
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    updateContent(newContent);
  };

  return (
      <QuillEditor
        defaultValue={initialValue}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        className="w-full min-h-[30vh] mt-10 bg-white"
      />
  );
};

export default TextEditor;