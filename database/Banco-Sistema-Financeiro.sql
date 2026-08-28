CREATE DATABASE IF NOT EXISTS db_financeiro 
COLLATE utf8mb4_general_ci
CHARSET utf8mb4;

USE db_financeiro;

CREATE TABLE IF NOT EXISTS tb_local_compra(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_despesa (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(150) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_despesa DATE NOT NULL,
    local_compra_id BIGINT NOT NULL,

    CONSTRAINT fk_despesa_local_compra FOREIGN KEY (local_compra_id) REFERENCES tb_local_compra(id)
);

INSERT INTO tb_local_compra (nome) VALUES
('Carrefour'),
('Amazon'),
('Shopee'),
('Cinemark'),
('Posto Ipiranga');


INSERT INTO tb_despesa
    (descricao, valor, data_despesa, local_compra_id)
VALUES
    ('Compra do supermercado', 350.00, '2026-08-05', 1),
    ('Produtos para casa', 120.50, '2026-08-08', 1),
    ('Fone de ouvido', 199.90, '2026-08-10', 2),
    ('Cabo USB', 35.90, '2026-08-12', 2),
    ('Camiseta', 89.90, '2026-08-14', 3),
    ('Ingresso de cinema', 45.00, '2026-08-16', 4),
    ('Combustível', 200.00, '2026-08-18', 5);
    
    
    SELECT
    d.id,
    d.descricao,
    d.valor,
    d.data_despesa,
    l.nome AS local_compra
FROM tb_despesa d
INNER JOIN tb_local_compra l
    ON d.local_compra_id = l.id;