from persistence.repositories.product_repository import ProductRepository
from application.dtos.create_product_dto import CreateProductDTO

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