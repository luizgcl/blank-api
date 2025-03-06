import { CreateCategoryDto } from '@/products/dto/create-category.dto';
import { Category } from '@/products/entities/category.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  categoryRepository: Repository<Category>;

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    customerId: string,
  ) {
    const slug = slugify(createCategoryDto.name, {
      lower: true,
      locale: 'pt',
    });

    const hasCategoryWithSameSlug = await this.categoryRepository.findOne({
      where: { slug, customer: { id: customerId } },
    });

    if (hasCategoryWithSameSlug) {
      throw new ConflictException('Categoria já foi registrada no sistema');
    }

    const category = this.categoryRepository.create({
      name: createCategoryDto.name,
      slug,
      color: createCategoryDto.color,
      orderFrequency: createCategoryDto.frequency,
      customer: {
        id: customerId,
      },
    });

    await this.categoryRepository.save(category);
  }

  async getCategories(customerId: string) {
    const categories = await this.categoryRepository.find({
      where: {
        customer: {
          id: customerId,
        },
      },
    });

    return { data: categories };
  }

  // async updateCategory(categoryId: number) {}
  // async deleteCategory(categoryId: number) {}
}
