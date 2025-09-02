import { Test, TestingModule } from '@nestjs/testing';
import { GetArticleListHandler } from './get-article-list.handler';
import { ArticleListService } from '../../../providers/article-list.service';

describe('GetArticleListHandler', () => {
  let handler: GetArticleListHandler;
  let service: jest.Mocked<ArticleListService>;

  beforeEach(async () => {
    const mockService = {
      getArticleList: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetArticleListHandler, { provide: ArticleListService, useValue: mockService }],
    }).compile();

    handler = module.get<GetArticleListHandler>(GetArticleListHandler);
    service = module.get(ArticleListService);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should handle GetArticleListQuery', async () => {
    const mockResult = {
      articleList: [
        {
          id: 'public-id-1',
          title: 'Test Article',
          tags: ['tag1', 'tag2'],
          createdAt: new Date('2024-01-01'),
        },
      ],
    };

    service.getArticleList.mockResolvedValue(mockResult);

    const result = await handler.execute();

    expect(result).toEqual(mockResult);
    expect(service.getArticleList).toHaveBeenCalled();
  });
});
