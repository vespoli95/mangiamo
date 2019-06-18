-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 18, 2019 at 04:23 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mangiamo`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(200) CHARACTER SET utf8 NOT NULL,
  `password` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `date_joined` datetime DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `password`, `date_joined`, `first_name`, `last_name`, `age`, `country`) VALUES
('antvespoli@gmail.com', '$5$rounds=535000$3G7uQqIt6TP0VJP6$kdqg8eMums1nFbK9GSonl2OSxskwUTuvxTlwcA.HafC', '2019-06-09 20:07:12', 'Anthony', 'Vespoli', 23, 'CAN'),
('test@gmail.com', '$5$rounds=535000$HW7hEn/b6m5tUUTr$TKkn3uMPtLCyBABs6BzigFIjPGXem2ErWwKbs0Sabi6', '2019-06-09 20:17:08', 'anthony', 'vespoli', 27, 'QAT');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
