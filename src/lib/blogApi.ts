import axiosInstance from './axiosInstance';
import getCurrentUser from '@/app/actions/getCurrentUser';

export const createBlog = async (blogData: FormData) => {
  try {
    const response = await axiosInstance.post('/post', blogData);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || error.message;
  }
};

export const getAllBlogs = async (categoryFilter:string, currentPage:string) => {
  console.log("here");
  try {
    // Prepare query parameters
    const queryParams = new URLSearchParams();
    if (categoryFilter) {
      queryParams.append('category', categoryFilter);
    }
    if (currentPage) {
      queryParams.append('page', currentPage.toString());
    }

    // Append query parameters to the URL
    const url = `/post${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    // Make the GET request
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error:any) {
    throw error.response?.data || error.message;
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/category');
    return response.data;
  } catch {
    return null;
  }
}

export async function getBlogBySlug(slug: string) {
  const title = slug.replace(/-/g, ' ');
  console.log(title);
  const request = {
    title,
  };
  
  try {
    const response = await axiosInstance.post(`/post`, { request });
    return response.data.data;
  } catch {
    return null;
  }
}

export async function getMyPosts() {
  const request = {
    authorId: "author"
  };

  const response = await axiosInstance.post('/post', { request })
  return response.data;
}

export async function deletePost(id: string) {
  const response = await axiosInstance.delete(`/post/${id}`);
  return response;
}

export async function getBlogById(id: string) {
  const response = await axiosInstance.get(`/post/${id}`);
  return response.data;
}

export async function updateBlog(blogData: FormData, id:string) {
  const response = await axiosInstance.put(`/post/${id}`, blogData);
  return response.data;
}