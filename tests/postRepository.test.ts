import { PrismaClient, Post } from '@prisma/client';
import { createPost, getAllPosts, deleteAllPosts } from '../repositories/postRepository'

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    post: {
      create: jest.fn(),
      findMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('Post Service', () => {
  const mockData = { title: 'Test Title', content: 'Test Content' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new post', async () => {
    const createdPost = { id: 1, ...mockData };
    (prisma.post.create as jest.Mock).mockResolvedValue(createdPost);

    const result = await createPost(mockData);

    expect(prisma.post.create).toHaveBeenCalledWith({ data: mockData });
    expect(result).toEqual(createdPost);
  });

  it('should get all posts', async () => {
    const posts = [
      { id: 1, title: 'Sample', content: 'Sample Content' },
      { id: 2, title: 'Post Two', content: 'Content for Post Two' },
      { id: 3, title: 'Post Three', content: 'Content for Post Three' },
      { id: 4, title: 'Post Four', content: 'Content for Post Four' },
      { id: 5, title: 'Post Five', content: 'Content for Post Five' },
      { id: 6, title: 'Post Six', content: 'Content for Post Six' },
    ];

    (prisma.post.findMany as jest.Mock).mockResolvedValue(posts);

    const result = await getAllPosts();

    expect(prisma.post.findMany).toHaveBeenCalled();
    expect(result).toEqual(posts);
  });

  it('should delete all posts and confirm the count', async () => {
    // Arrange: initial mock data for posts
    const initialPosts = [
      { id: 1, title: 'Post One', content: 'Content for Post One' },
      { id: 2, title: 'Post Two', content: 'Content for Post Two' },
      { id: 3, title: 'Post Three', content: 'Content for Post Three' },
      { id: 4, title: 'Post Four', content: 'Content for Post Four' },
      { id: 5, title: 'Post Five', content: 'Content for Post Five' },
      { id: 6, title: 'Post Six', content: 'Content for Post Six' },
    ];

    // Mock the initial data retrieval
    (prisma.post.findMany as jest.Mock).mockResolvedValue(initialPosts);

    // Act: delete all posts
    const deleteResult = { count: initialPosts.length }; // Expecting all posts to be deleted
    (prisma.post.deleteMany as jest.Mock).mockResolvedValue(deleteResult);

    const result = await deleteAllPosts();

    // Assert
    expect(prisma.post.deleteMany).toHaveBeenCalled();
    expect(result).toEqual(deleteResult); // Should match the count of deleted posts
  });
});
