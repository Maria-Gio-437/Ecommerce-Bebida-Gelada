from sqlalchemy import Column, String, Date, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from config.database import Base

class User(Base):
    __tablename__ = 'usuarios'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome = Column(Text, nullable=False)
    cpf = Column(String(14), nullable=False, unique=True)
    email = Column(Text, nullable=False, unique=True)
    telefone = Column(Text, nullable=True)
    endereco = Column(Text, nullable=False)
    senha = Column(Text, nullable=False)
    data_nascimento = Column(Date, nullable=False)
    tipo_usuario = Column(Text, nullable=False)