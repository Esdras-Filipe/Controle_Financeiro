CREATE DATABASE IF NOT EXISTS ControleFinanceiro;

USE ControleFinanceiro;

CREATE TABLE IF NOT EXISTS Categoria(
	Id_Categoria INT AUTO_INCREMENT,
    Nome_Categoria VARCHAR(50) NOT NULL,
    PRIMARY KEY (Id_Categoria)
);

CREATE TABLE IF NOT EXISTS Metodo_Pagamento(
	Id_Metodo INT AUTO_INCREMENT,
    Nome_Metodo VARCHAR(50) NOT NULL,
    Numero_Cartao INT NULL,
    PRIMARY KEY (Id_Metodo)
);

CREATE TABLE IF NOT EXISTS Despesas (
	Id_Despesa INT AUTO_INCREMENT,
    Valor_Despesa DOUBLE NOT NULL DEFAULT 0.00,
    Id_Categoria_Despesa INT ,
    Descricao_Despesa VARCHAR(80),
    Id_Metodo_Pagamento INT ,
    Data_Despesa DATETIME DEFAULT NOW(),
    PRIMARY KEY (Id_Despesa),
    CONSTRAINT Metodo_Pagamento FOREIGN KEY (Id_Metodo_Pagamento) REFERENCES Metodo_Pagamento(Id_Metodo) ON DELETE SET NULL,
    CONSTRAINT Categoria_Despesa FOREIGN KEY (Id_Categoria_Despesa) REFERENCES Categoria(Id_Categoria) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Proventos(
    Id_Provento INT AUTO_INCREMENT,
    Valor_Provento DOUBLE NOT NULL DEFAULT 0.00,
    Data_Provento DATETIME DEFAULT NOW(),
    Evento_Fixo CHAR(1) DEFAULT 'N',
    Descricao_Provento VARCHAR(80),
    PRIMARY KEY (Id_Provento)
);

CREATE TABLE IF NOT EXISTS Investimentos(
	Id_Investimento INT AUTO_INCREMENT,
    Codigo_Investimentos VARCHAR(10) NOT NULL,
    Data_Investimento DATETIME DEFAULT NOW(),
    Quantidade_Investimento INT DEFAULT 0,
    Valor_Investimento DOUBLE DEFAULT 0.00,
    Categoria INT NOT NULL,
    PRIMARY KEY  (Id_Investimento)
);

CREATE TABLE IF NOT EXISTS Rendimentos(
	Id_Rendimento INT AUTO_INCREMENT,
    Codigo_Rendimento VARCHAR(10) NOT NULL,
    Data_Rendimento DATETIME DEFAULT NOW(),
    Valor_Rendimento DOUBLE DEFAULT 0.00,
	PRIMARY KEY (Id_Rendimento)    
);