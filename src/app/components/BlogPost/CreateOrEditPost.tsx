'use client'
import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor/TextEditor';
import Input from '../Input/Input';
import { getCategories } from '@/lib/blogApi';
import { Switch } from '@nextui-org/switch';
import InputFile from '../InputFile/InputFile';
import CategorySelect from '../CategorySelect/CategorySelect';

interface CreateOrEditPostProps {
  blog?: CreatePostProps ;
  onSubmit: (formData: FormData) => Promise<void>;
}

interface CreatePostProps {
  title: string;
  content: string;
  imageUrl: string;
  published: boolean;
  categories: string[];
}

const PostForm: CreatePostProps = {
  title: '',
  content: '',
  imageUrl: '',
  published: false,
  categories: [],
};

const CreateOrEditPost: React.FC<CreateOrEditPostProps> = ({ blog, onSubmit }) => {
  const [postContent, setPostContent] = useState(blog?.content || '');
  const [postForm, setPostForm] = useState(PostForm);
  const [isPublished, setIsPublished] = useState(blog?.published || false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    content?: string;
    categories?: string;
    imageUrl?: string;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: any = await getCategories();
        if (data && data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (blog) {
      setPostForm({
        title: blog.title,
        content: blog.content,
        imageUrl: blog.imageUrl,
        published: blog.published,
        categories: blog.categories || [],
      });
      setIsPublished(blog.published);
      setPostContent(blog.content);
      setSelectedCategories(blog.categories || []);
    }
  }, []);

  const addNewCategory = () => {
    if (newCategory && !selectedCategories.includes(newCategory)) {
      setSelectedCategories((prevSelected) => [...prevSelected, newCategory]);
      setNewCategory('');
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.filter((category) => category !== categoryToRemove)
    );
  };

  const handleCategoryChange = (selected: string[]) => {
    setSelectedCategories(selected);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const updateContent = (newContent: string) => {
    setPostContent(newContent);
  };

  const setCustomValue = (id: any, value: any) => {
    setPostForm((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks
    const errors: { title?: string; content?: string; categories?: string; imageUrl?: string; } = {};

    if (!postForm.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!postContent.trim()) {
      errors.content = 'Content is required';
    }

    if (selectedCategories.length === 0) {
      errors.categories = 'Select at least one category';
    }

    if (!postForm.imageUrl) {
      errors.imageUrl = "Upload an image";
    }

    setValidationErrors(errors);

    const formData = new FormData();
    formData.append('title', postForm.title);
    formData.append('content', postContent);
    formData.append('published', isPublished.toString());
    formData.append('imageUrl', postForm.imageUrl);
    selectedCategories.forEach((category) => {
      formData.append('categories[]', category);
    });

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <form onSubmit={submitForm} className="flex flex-col py-4 px-12 m-auto">
      <Switch
        className="gap-2 pb-4"
        defaultSelected={isPublished}
        onChange={() => setIsPublished(!isPublished)}
      >
        Publish
      </Switch>
      <Input
        placeholder="Title of Post"
        id="name"
        type="text"
        onChange={handleChange}
        value={postForm.title}
        name="title"
      />
      <div className="text-red-500">
        {validationErrors.title && <p>{validationErrors.title}</p>}
      </div>
      <div>
        <TextEditor initialValue={blog?.content || ''} updateContent={updateContent} />
      </div>
      <CategorySelect
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      <div className="text-red-500">
        {validationErrors.content && <p>{validationErrors.content}</p>}
      </div>

      <div className="mt-4">
        <label>Selected Categories:</label>
        <div className="flex flex-wrap items-center">
          {selectedCategories.map((category) => (
            <div key={category} className="flex items-center bg-gray-200 rounded-md m-1 p-2">
              <span>{category}</span>
              <button type="button" onClick={() => removeCategory(category)} className="ml-2">
                &#10006;
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2">
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className="bg-green-500 text-white px-2 ml-4 rounded-md" type="button" onClick={addNewCategory}>
            Add Category
          </button>
      </div>
      <div className="text-red-500">
        {validationErrors.categories && <p>{validationErrors.categories}</p>}
      </div>
      <div className="mt-8">
        <InputFile
          value={postForm.imageUrl}
          onChange={(value) => setCustomValue('imageUrl', value)}
        />
      </div>
      <div className="text-red-500">
        {validationErrors.imageUrl && <p>{validationErrors.imageUrl}</p>}
      </div>
      <button
        type="submit"
        className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateOrEditPost;