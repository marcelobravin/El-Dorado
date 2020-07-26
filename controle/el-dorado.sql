-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2020 at 10:05 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `el-dorado`
--

-- --------------------------------------------------------

--
-- Table structure for table `pontuacoes`
--

CREATE TABLE `pontuacoes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `fase1` tinyint(2) NOT NULL,
  `fase2` tinyint(2) NOT NULL,
  `fase3` tinyint(2) NOT NULL,
  `fase4` tinyint(2) NOT NULL,
  `fase5` tinyint(2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pontuacoes`
--

INSERT INTO `pontuacoes` (`id`, `nome`, `fase1`, `fase2`, `fase3`, `fase4`, `fase5`, `created_at`, `updated_at`) VALUES
(28, 'bondia', 10, 6, 0, 0, 0, '2020-07-26 13:31:40', NULL),
(30, 'p1', 1, 1, 0, 0, 0, '2020-07-26 18:45:37', '2020-07-26 19:22:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pontuacoes`
--
ALTER TABLE `pontuacoes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pontuacoes`
--
ALTER TABLE `pontuacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
