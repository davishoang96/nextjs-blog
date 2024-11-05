// lib/postRepository.test.js
import { createPost, getAllPosts } from '../../repositories/postRepository';
import { mockPrisma } from '../mock_prisma/mockPrismaClient';

// Mock the Prisma Client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

describe('postRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      // Arrange
      const postData = { title: 'Test Post', content: 'This is a test post.' };
      const mockResponse = { id: 1, ...postData };
      mockPrisma.post.create.mockResolvedValue(mockResponse);

      // Act
      const result = await createPost(postData);

      // Assert
      expect(mockPrisma.post.create).toHaveBeenCalledWith({ data: postData });
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if creation fails', async () => {
      mockPrisma.post.create.mockRejectedValue(new Error('Database error'));

      await expect(createPost({ title: 'Test', content: 'Error case' })).rejects.toThrow('Database error');
    });
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1', content: 'Content 1' },
        { id: 2, title: 'Post 2', content: 'Content 2' },
      ];
      mockPrisma.post.findMany.mockResolvedValue(mockPosts);

      const result = await getAllPosts();

      expect(mockPrisma.post.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockPosts);
    });

    it('should throw an error if fetching fails', async () => {
      mockPrisma.post.findMany.mockRejectedValue(new Error('Database error'));

      await expect(getAllPosts()).rejects.toThrow('Database error');
    });
  });
});
