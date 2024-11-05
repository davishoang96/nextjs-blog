import { PrismaClient } from '@prisma/client';
import { 
  createPost, getAllPosts, 
  deleteAllPosts, getPostById, 
  deletePostById } from '../repositories/postRepository'

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    post: {
      create: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      deleteMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const mockPosts = [
  { id: 1, title: 'Sample', content: 'Sample Content' },
  { id: 2, title: 'Post Two', content: 'Content for Post Two' },
  { id: 3, title: 'Post Three', content: 'Content for Post Three' },
  { id: 4, title: 'Post Four', content: 'Content for Post Four' },
  { id: 5, title: 'Post Five', content: 'Content for Post Five' },
  { id: 6, title: 'Post Six', content: 'Content for Post Six' },
];

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

  it('should return a post when a valid ID is provided', async () => {
    // Arrange
    (prisma.post.findUnique as jest.Mock).mockResolvedValue(mockData);

    // Act
    const result = await getPostById(1);

    // Assert
    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockData);
  });

  it('should return null when not found in database', async () => {
    // Arrange
    (prisma.post.findUnique as jest.Mock).mockResolvedValue(null);

    // Act
    const result = await getPostById(5);

    // Assert
    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: { id: 5 },
    });
    expect(result).toBeNull();
  });

  it('should get all posts', async () => {
    // Arrange
    (prisma.post.findMany as jest.Mock).mockResolvedValue(mockPosts);

    // Act
    const result = await getAllPosts();

    // Assert
    expect(prisma.post.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockPosts);
  });

  it('should delete all posts and confirm the count', async () => {
    // Mock the initial data retrieval
    (prisma.post.findMany as jest.Mock).mockResolvedValue(mockPosts);

    // Act: delete all posts
    const deleteResult = { count: mockPosts.length }; // Expecting all posts to be deleted
    (prisma.post.deleteMany as jest.Mock).mockResolvedValue(deleteResult);

    const result = await deleteAllPosts();

    // Assert
    expect(prisma.post.deleteMany).toHaveBeenCalled();
    expect(result).toEqual(deleteResult); // Should match the count of deleted posts
  });

  it('should delete a post by ID and return the ID of the deleted post', async () => {
    // Arrange
    const mockDeletedPost = { id: 1, title: 'Test Post', content: 'This is a test post.' };
    (prisma.post.delete as jest.Mock).mockResolvedValue(mockDeletedPost);  // Mock deletion
    (prisma.post.findMany as jest.Mock).mockResolvedValue([{ id: 2 }, { id: 3 }]); // Mock remaining posts

    // Act
    const result = await deletePostById(1);
    const remainingPosts = await prisma.post.findMany(); // Get remaining posts

    // Assert
    expect(prisma.post.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockDeletedPost.id); // Check returned ID
    expect(remainingPosts.length).toBe(2); // Check remaining posts
  });

  it('should return null when not found in database', async () => {
    // Arrange
    (prisma.post.delete as jest.Mock).mockRejectedValue(new Error('Post not found')); // Mock rejection

    // Act
    try {
      await deletePostById(5);
    } catch (error) {
      // Assert
      expect(prisma.post.delete).toHaveBeenCalledWith({
        where: { id: 5 },
      });
      const typedError = error as Error; 
      expect(typedError.message).toBe('Post not found');
    }
  });
});
