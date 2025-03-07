import { UserRole } from '@/common/constants/user-roles';
import { Roles } from '@/common/decorators/roles/roles.decorator';
import { CommonAuthGuard } from '@/common/guards/common-auth/common-auth.guard';
import { RolesGuard } from '@/common/guards/roles/roles.guard';
import { CreateCategoryDto } from '@/products/dto/create-category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@UseGuards(CommonAuthGuard, RolesGuard)
@Roles(UserRole.EMPLOYEE)
@Controller('category')
export class CategoryController {
  @Inject()
  private readonly categoryService: CategoryService;

  @Get()
  listCategories(@Request() req) {
    return this.categoryService.getCategories(req.user.customer_id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCategory(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    return this.categoryService.createCategory(
      createCategoryDto,
      req.user.customer_id,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
