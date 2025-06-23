-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2025 at 08:09 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interaction_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `name`, `comment`) VALUES
(1, 'John', 'I\'m thrilled to hear that Goffle is reopening! Can\'t wait to taste their delicious waffles.'),
(2, 'Jane Smith', 'Alhamdulillah, Goffle buka semula! Dah lama teringin nak makan waffle mereka.'),
(3, 'Ahmad Ibrahim', 'The QR code delivery service is a great idea! I\'ll definitely order some waffles.'),
(4, 'Siti Aisyah', 'Goffle memang terbaik! Waffle mereka memang sedap gila!'),
(5, 'Michael Lee', 'I\'ve been craving Goffle\'s waffles for weeks! So happy they are reopening.'),
(6, 'Nurul Azizah', 'Suka sangat dengan waffle Goffle! Dah lama tak rasa, teruja nak cuba lagi.'),
(7, 'Jessica Wong', 'The Raya holidays were great, but I missed Goffle\'s waffles! Can\'t wait for the reopening.'),
(8, 'Mohd Zainal', 'Goffle kembali beroperasi! Servis penghantaran waffle memudahkan.'),
(9, 'Emily Tan', 'I\'m so excited! Goffle\'s waffles are the highlight of my week.'),
(10, 'Ali bin Rahman', 'Syukur Goffle buka semula. Terbaiklah waffle mereka!'),
(11, 'CC123556', 'I love the customer service of goffle team so much!');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
