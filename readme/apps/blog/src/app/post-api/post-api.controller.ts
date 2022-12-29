import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@readme/core';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostApiService } from './post-api.service';
import { PostInfoRDO } from './rdo/post-info.rdo';
import { PostListRDO } from './rdo/post-list.rdo';

@ApiTags('blog')
@Controller('blog')
export class PostApiController {

  constructor(private readonly postAPIService: PostApiService) { }

  @Post()
  @ApiResponse({
    // todo - update type: UserInfoRDO,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  public async create(@Body() dto: CreatePostDTO) {
    Logger.log('accept request blog/ for create blog post');
    const result = await this.postAPIService.create(dto);

    return fillObject(PostInfoRDO, result)

  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Posts list presented.'
  })
  public async index() {
    Logger.log('accept request blog/ for post list');

    const result = await this.postAPIService.index();
    return fillObject(PostListRDO, result)
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post information has been presented.'
  })
  public async getPost(@Param('id') id: string) {
    Logger.log(`post.controller: accept request blog/${id} for read`);
    const postId = parseInt(id, 10);
    const result = await this.postAPIService.getItem(postId);
    // todo - если null, то 404
    return fillObject(PostInfoRDO, result)

  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been updated.'
  })
  public async updatePost(@Param('id') id: string, @Body() dto: UpdatePostDTO) {
    Logger.log(`accept request blog/${id} for update`);
    const postId = parseInt(id, 10);
    const result = await this.postAPIService.updateItem(postId, dto);
    return fillObject(PostInfoRDO, result)

  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The post has been deleted.'
  })
  public async deletePost(@Param('id') id: string) {
    Logger.log(`accept request blog/${id} for delete`);
    const postId = parseInt(id, 10);

    await this.postAPIService.deleteItem(postId);
  }

  @Post('like/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Like is switched.'
  })
  public async switchLike(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    Logger.log('accept request blog/:id for repost');
    const userId = 'bla-1234567890-bla-4';

    const result = await this.postAPIService.switchLike(postId, userId)

    return result;
  }

  @Post('repost/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The repost has been created.'
  })
  public async repost(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    Logger.log('accept request blog/:id for repost');
    const userId = 'bla-1234567890-bla-2';

    const result = await this.postAPIService.repost(postId, userId)

    if (result instanceof Number) {
      return result;
    }

    return fillObject(PostInfoRDO, result);

  }
}
