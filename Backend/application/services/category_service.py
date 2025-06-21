from persistence.repositories.category_repository import CategoryRepository
from application.dtos.create_category_dto import CreateCategoryDTO

class CategoryService:
    def __init__(self):
        self.category_repository = CategoryRepository()

    def create_category(self, category_dto: CreateCategoryDTO):
        try:
            return self.category_repository.create(category_dto)
        except Exception as e:
            raise e
        
    def get_all_categories(self):
        try:
            return self.category_repository.get_all()
        except Exception as e:
            raise e