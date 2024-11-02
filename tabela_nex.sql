-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02/11/2024 às 15:03
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tabela_nex`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `fk_status_sale`
--

CREATE TABLE `fk_status_sale` (
  `_id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `fk_status_sale`
--

INSERT INTO `fk_status_sale` (`_id`, `status`) VALUES
(1, 'Em análise'),
(2, 'Aprovado'),
(3, 'Recusado');

-- --------------------------------------------------------

--
-- Estrutura para tabela `fk_users_function`
--

CREATE TABLE `fk_users_function` (
  `_id` int(11) NOT NULL,
  `function` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `fk_users_function`
--

INSERT INTO `fk_users_function` (`_id`, `function`) VALUES
(1, 'Admin'),
(2, 'Usuário Comum');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios_nex`
--

CREATE TABLE `usuarios_nex` (
  `_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `cpf` varchar(100) NOT NULL,
  `balance` int(11) NOT NULL,
  `points_balance` int(11) NOT NULL,
  `function` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios_nex`
--

INSERT INTO `usuarios_nex` (`_id`, `name`, `email`, `password`, `cpf`, `balance`, `points_balance`, `function`) VALUES
(1, 'Gustavo Ranieli Lemes', 'gustavo_raniele@hotmail.com', '$2b$08$KwaRwtRshXJ2da3UaH/lwOv6fdRCHWNRN5MrToiZkqezz8KmBFY1m', '548.655.455-55', 0, 0, 1),
(2, 'Usuário comum', 'test_user@gmail.com', '$2b$08$7mDl16ZSv3wRnDXF7RAdWOutAoPWQJZBEtTFVczOHT.ewU.7Q4SQS', '282.279.300-00', 0, 0, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendas_nex`
--

CREATE TABLE `vendas_nex` (
  `_id` int(11) NOT NULL,
  `fk_user_cpf` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `points` int(11) NOT NULL,
  `product_value` int(11) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `vendas_nex`
--

INSERT INTO `vendas_nex` (`_id`, `fk_user_cpf`, `product_name`, `date`, `points`, `product_value`, `status`) VALUES
(58, '282.279.300-00', 'Venda do produto X', '2022-10-10', 10, 10000, 'Aprovado'),
(59, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(60, '282.279.300-00', 'Venda do produto Z', '2022-10-10', 10, 10000, 'Em avaliação'),
(61, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(62, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(63, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10525, 'Reprovado'),
(64, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(65, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(66, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10525, 'Reprovado'),
(67, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(68, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(69, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10525, 'Reprovado'),
(70, '282.279.300-00', 'Venda do produto X', '2022-10-10', 10, 10000, 'Aprovado'),
(71, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(72, '282.279.300-00', 'Venda do produto Z', '2022-10-10', 10, 10000, 'Em avaliação'),
(73, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(74, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10000, 'Reprovado'),
(75, '548.655.455-55', 'Venda do produto Y', '2022-10-10', 10, 10525, 'Reprovado');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `fk_status_sale`
--
ALTER TABLE `fk_status_sale`
  ADD PRIMARY KEY (`_id`);

--
-- Índices de tabela `fk_users_function`
--
ALTER TABLE `fk_users_function`
  ADD PRIMARY KEY (`_id`);

--
-- Índices de tabela `usuarios_nex`
--
ALTER TABLE `usuarios_nex`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `FK_USER_FUNCTION` (`function`);

--
-- Índices de tabela `vendas_nex`
--
ALTER TABLE `vendas_nex`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `FK_SALE_STATUS` (`status`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `fk_status_sale`
--
ALTER TABLE `fk_status_sale`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `fk_users_function`
--
ALTER TABLE `fk_users_function`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `usuarios_nex`
--
ALTER TABLE `usuarios_nex`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `vendas_nex`
--
ALTER TABLE `vendas_nex`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `usuarios_nex`
--
ALTER TABLE `usuarios_nex`
  ADD CONSTRAINT `FK_USER_FUNCTION` FOREIGN KEY (`function`) REFERENCES `fk_users_function` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
