from persistence.repositories.product_repository import ProductRepository
from application.dtos.create_product_dto import CreateProductDTO
from application.dtos.update_product_dto import UpdateProductDTO

class ProductService:
    def __init__(self):
        self.product_repository = ProductRepository()

    def create_product(self, product_dto: CreateProductDTO):
        try:
            return self.product_repository.create(product_dto)
        except Exception as e:
            raise e
        
    def get_all_products(self):
        try:
            return self.product_repository.get_all()
        except Exception as e:
            raise e
        
    def update_product(self, product_id: str, product_dto: UpdateProductDTO):
        try:
            return self.product_repository.update(product_id, product_dto)
        except Exception as e:
            raise e