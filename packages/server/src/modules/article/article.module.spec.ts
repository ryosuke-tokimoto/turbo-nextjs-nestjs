import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaAdapterModule } from '@adapters/prisma/prisma.adapter.module';
import { SupabaseStorageAdapter } from '@adapters/supabase/supabase.storage.adapter';
import { ArticleModule } from './article.module';
import { ArticleController } from './controllers/article.controller';
import { GetArticleHandler } from './controllers/queries/handlers/get-article.handler';
import { ArticleService } from './providers/article.service';
import { ArticleRepository } from './providers/article.repository';

describe('ArticleModule', () => {
  let module: TestingModule;

  const mockSupabaseStorageAdapter = {
    getArticleContent: jest.fn(),
    deleteArticle: jest.fn(),
    getDownloadUrl: jest.fn(),
    generateFilePath: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ArticleModule],
    })
      .overrideProvider(SupabaseStorageAdapter)
      .useValue(mockSupabaseStorageAdapter)
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have ArticleController', () => {
    const controller = module.get<ArticleController>(ArticleController);
    expect(controller).toBeDefined();
  });

  it('should have ArticleService', () => {
    const service = module.get<ArticleService>(ArticleService);
    expect(service).toBeDefined();
  });

  it('should have ArticleRepository', () => {
    const repository = module.get<ArticleRepository>(ArticleRepository);
    expect(repository).toBeDefined();
  });

  it('should have GetArticleHandler', () => {
    const handler = module.get<GetArticleHandler>(GetArticleHandler);
    expect(handler).toBeDefined();
  });

  it('should import required modules', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ArticleModule],
    })
      .overrideProvider(SupabaseStorageAdapter)
      .useValue(mockSupabaseStorageAdapter)
      .compile();

    const cqrsModule = moduleRef.get(CqrsModule, { strict: false });
    const prismaModule = moduleRef.get(PrismaAdapterModule, { strict: false });

    expect(cqrsModule).toBeDefined();
    expect(prismaModule).toBeDefined();
  });
});
